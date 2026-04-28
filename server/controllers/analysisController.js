import { PrismaClient } from "@prisma/client";
import MLR from "ml-regression-multivariate-linear";

const prisma = new PrismaClient();

// Analyze data with multiple regression
export const analyzeData = async (req, res) => {
  try {
    const { type, features, target } = req.body;

    // Validation
    if (!type || !features || !target) {
      return res.status(400).json({
        error: "Missing required fields: type, features, target",
      });
    }

    if (type !== "simple" && type !== "multiple") {
      return res.status(400).json({
        error: 'Type must be "simple" or "multiple"',
      });
    }

    if (!Array.isArray(features) || features.length === 0) {
      return res.status(400).json({
        error: "Features must be a non-empty array",
      });
    }

    // Get all data
    const allData = await prisma.healthData.findMany({
      orderBy: { createdAt: "asc" },
    });

    if (allData.length < 2) {
      return res.status(400).json({
        error: "At least 2 data points are required for analysis",
      });
    }

    // Filter data with valid values for all required features + target
    const validData = allData.filter((row) => {
      // Check if target exists
      if (row[target] === null || row[target] === undefined) return false;

      // Check if all features exist
      return features.every(
        (feature) => row[feature] !== null && row[feature] !== undefined,
      );
    });

    if (validData.length < 2) {
      return res.status(400).json({
        error: `Not enough valid data points. Need at least 2, but only ${validData.length} have all required fields.`,
      });
    }

    // Prepare data for regression
    const X = validData.map((row) => features.map((feature) => row[feature]));
    const Y = validData.map((row) => [row[target]]); // MLR needs 2D array

    // Calculate multiple linear regression
    const regression = new MLR(X, Y);

    // Get coefficients - convert from Matrix to array if needed
    let coefficients = regression.weights || [];
    if (coefficients.data) {
      // It's a Matrix object, extract the data
      coefficients = coefficients.data[0] || [];
    }
    if (!Array.isArray(coefficients)) {
      coefficients = Array.from(coefficients);
    }

    let intercept = regression.intercept || 0;
    if (typeof intercept === "object" && intercept.data) {
      intercept = intercept.data[0] || 0;
    }

    // Create points for visualization (only for 2D cases)
    let points = [];
    if (features.length === 1) {
      // Simple case: plot x vs predicted y
      points = validData.map((row) => ({
        x: row[features[0]],
        y: row[target],
      }));
    } else {
      // Multiple case: plot real vs predicted
      points = validData.map((row, idx) => {
        const prediction = regression.predict(X[idx]);
        return {
          x: idx,
          actual: row[target],
          predicted: Array.isArray(prediction) ? prediction[0] : prediction,
        };
      });
    }

    // Calculate R-squared using raw Y values
    const yValues = validData.map((row) => row[target]);
    const meanY = yValues.reduce((a, b) => a + b, 0) / yValues.length;
    const totalSS = yValues.reduce((sum, y) => sum + Math.pow(y - meanY, 2), 0);
    const predictions = X.map((row) => {
      const pred = regression.predict(row);
      return Array.isArray(pred) ? pred[0] : pred;
    });
    const residualSS = yValues.reduce(
      (sum, y, idx) => sum + Math.pow(y - predictions[idx], 2),
      0,
    );
    const rSquared = 1 - residualSS / totalSS;

    res.json({
      type,
      features,
      target,
      coefficients: coefficients.map((c) => {
        const num = Number(c);
        return isNaN(num) ? null : parseFloat(num.toFixed(4));
      }),
      intercept:
        typeof intercept === "number" ? parseFloat(intercept.toFixed(4)) : 0,
      rSquared: parseFloat(rSquared.toFixed(4)),
      pointsUsed: validData.length,
      points,
    });
  } catch (error) {
    console.error("Error analyzing data:", error);
    res.status(500).json({ error: "Failed to analyze data: " + error.message });
  }
};
