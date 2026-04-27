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
    const Y = validData.map((row) => row[target]);

    // Calculate multiple linear regression
    const regression = new MLR(X, Y);

    // Get coefficients
    const coefficients = regression.weights || [];
    const intercept = regression.intercept || 0;

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
      points = validData.map((row, idx) => ({
        x: idx,
        actual: row[target],
        predicted: regression.predict(X[idx]),
      }));
    }

    // Calculate R-squared
    const meanY = Y.reduce((a, b) => a + b, 0) / Y.length;
    const totalSS = Y.reduce((sum, y) => sum + Math.pow(y - meanY, 2), 0);
    const predictions = X.map((row) => regression.predict(row));
    const residualSS = Y.reduce(
      (sum, y, idx) => sum + Math.pow(y - predictions[idx], 2),
      0,
    );
    const rSquared = 1 - residualSS / totalSS;

    res.json({
      type,
      features,
      target,
      coefficients: coefficients.map((c) => parseFloat(c.toFixed(4))),
      intercept: parseFloat(intercept.toFixed(4)),
      rSquared: parseFloat(rSquared.toFixed(4)),
      pointsUsed: validData.length,
      points,
    });
  } catch (error) {
    console.error("Error analyzing data:", error);
    res.status(500).json({ error: "Failed to analyze data: " + error.message });
  }
};
