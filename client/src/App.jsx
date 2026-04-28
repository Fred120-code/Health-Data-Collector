import React, { useState, useEffect } from "react";
import DataForm from "./components/DataForm";
import DataTable from "./components/DataTable";
import RegressionChart from "./components/RegressionChart";
import {
  ChartNoAxesColumn,
  ChartScatter,
  Database,
  Plus,
  RotateCcw,
  SquareActivity,
} from "lucide-react";

const API_BASE_URL = "https://health-data-collector-pi.vercel.app";

function App() {
  const [data, setData] = useState([]);
  const [regression, setRegression] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/data`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Error loading data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch regression data
  const handleCalculateRegression = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/regression`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to calculate regression");
      }
      const result = await response.json();
      setRegression(result);
    } catch (err) {
      setError("Error calculating regression: " + err.message);
      setRegression(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleAddData = async (formData) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(`${API_BASE_URL}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add data");
      }

      await response.json();
      setSuccess("✅ Data added successfully!");
      await fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error adding data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex justify-center items-center">
            <SquareActivity className="size-10 text-blue-500" />
            Health Data Collector
          </h1>
          <p className="text-gray-600">
            Monitor health metrics and analyze trends
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Form Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Plus className="size-7 font-extrabold text-blue-500" />
                Add Data
              </h2>
              <DataForm onSubmit={handleAddData} isLoading={loading} />
            </div>

            {/* Data Table Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-1">
                  <Database className="size-8 text-blue-500" />
                  Data Records
                </h2>
                <button
                  onClick={fetchData}
                  disabled={loading}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1"
                >
                  <RotateCcw className="size-4 text-white" />
                  Refresh
                </button>
              </div>
              {data.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No data yet. Add some records!
                </p>
              ) : (
                <DataTable data={data} />
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Regression Button Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-1">
                <ChartScatter className="size-6 text-blue-500" />
                Regression Analysis
              </h2>
              <button
                onClick={handleCalculateRegression}
                disabled={loading || data.length < 2}
                className="w-full px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? "Calculating..." : "Calculate Regression"}
              </button>
              {data.length < 2 && (
                <p className="text-gray-500 text-sm mt-2">
                  Need at least 2 data points
                </p>
              )}
            </div>

            {/* Chart Card */}
            {regression && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-1">
                  <ChartNoAxesColumn className="size-7 text-blue-500" />
                  Chart
                </h2>
                <RegressionChart regression={regression} />
                <div className="mt-4 space-y-2 p-4 bg-blue-50 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Formula:</strong> tension ={" "}
                    {regression.b0.toFixed(2)} + {regression.b1.toFixed(4)} ×
                    age
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Correlation (r):</strong> {regression.r}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>R² (Coefficient of Determination):</strong>{" "}
                    {regression.rSquared}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
