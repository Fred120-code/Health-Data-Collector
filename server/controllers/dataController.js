import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create health data
export const createHealthData = async (req, res) => {
  try {
    const { age, tension } = req.body;

    // Validation
    if (typeof age !== "number" || typeof tension !== "number") {
      return res.status(400).json({
        error: "Invalid input. Age and tension must be numbers.",
      });
    }

    if (age <= 0) {
      return res.status(400).json({
        error: "Age must be greater than 0.",
      });
    }

    if (tension < 0) {
      return res.status(400).json({
        error: "Tension cannot be negative.",
      });
    }

    const data = await prisma.healthData.create({
      data: {
        age: Math.floor(age),
        tension: parseFloat(tension),
      },
    });

    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({ error: "Failed to create data." });
  }
};

// Get all health data
export const getAllHealthData = async (req, res) => {
  try {
    const data = await prisma.healthData.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data." });
  }
};

// Calculate regression
export const calculateRegression = async (req, res) => {
  try {
    const data = await prisma.healthData.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (data.length < 2) {
      return res.status(400).json({
        error: "At least 2 data points are required to calculate regression.",
      });
    }

    // Extract x (age) and y (tension) values
    const points = data.map((d) => ({ x: d.age, y: d.tension }));

    const n = data.length;
    const sumX = data.reduce((sum, d) => sum + d.age, 0);
    const sumY = data.reduce((sum, d) => sum + d.tension, 0);
    const sumXY = data.reduce((sum, d) => sum + d.age * d.tension, 0);
    const sumX2 = data.reduce((sum, d) => sum + d.age * d.age, 0);
    const sumY2 = data.reduce((sum, d) => sum + d.tension * d.tension, 0);

    const meanX = sumX / n;
    const meanY = sumY / n;

    // Calculate slope (b1) and intercept (b0)
    const denominator = sumX2 - (sumX * sumX) / n;

    if (denominator === 0) {
      return res.status(400).json({
        error: "Cannot calculate regression: all X values are identical.",
      });
    }

    const b1 = (sumXY - (sumX * sumY) / n) / denominator;
    const b0 = meanY - b1 * meanX;

    // Calculate Pearson correlation coefficient (r)
    const numerator = n * sumXY - sumX * sumY;
    const denominatorR =
      Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)) || 1;
    const r = numerator / denominatorR;
    const rSquared = r * r; // Coefficient of determination (R²)

    res.json({
      b0: parseFloat(b0.toFixed(4)),
      b1: parseFloat(b1.toFixed(4)),
      r: parseFloat(r.toFixed(4)),
      rSquared: parseFloat(rSquared.toFixed(4)),
      points,
    });
  } catch (error) {
    console.error("Error calculating regression:", error);
    res.status(500).json({ error: "Failed to calculate regression." });
  }
};
