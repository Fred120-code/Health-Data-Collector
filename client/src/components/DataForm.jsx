import React, { useState } from "react";

function DataForm({ onSubmit, isLoading }) {
  const [age, setAge] = useState("");
  const [tension, setTension] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    // Validation
    if (!age || !tension) {
      setValidationError("Age and tension are required");
      return;
    }

    const ageNum = parseFloat(age);
    const tensionNum = parseFloat(tension);

    if (isNaN(ageNum) || isNaN(tensionNum)) {
      setValidationError("Age and tension must be valid numbers");
      return;
    }

    if (ageNum <= 0) {
      setValidationError("Age must be greater than 0");
      return;
    }

    if (tensionNum <= 0) {
      setValidationError("Tension must be greater than 0");
      return;
    }

    // Validate optional fields
    let weightNum = null;
    let heightNum = null;

    if (weight) {
      weightNum = parseFloat(weight);
      if (isNaN(weightNum) || weightNum <= 0) {
        setValidationError("Weight must be a valid number greater than 0");
        return;
      }
    }

    if (height) {
      heightNum = parseFloat(height);
      if (isNaN(heightNum) || heightNum <= 0) {
        setValidationError("Height must be a valid number greater than 0");
        return;
      }
    }

    const formData = {
      age: ageNum,
      tension: tensionNum,
    };

    if (weightNum !== null) formData.weight = weightNum;
    if (heightNum !== null) formData.height = heightNum;

    onSubmit(formData);
    setAge("");
    setTension("");
    setWeight("");
    setHeight("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {validationError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
          {validationError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age (years) *
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tension (mmHg) *
          </label>
          <input
            type="number"
            value={tension}
            onChange={(e) => setTension(e.target.value)}
            placeholder="Enter blood pressure"
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Optional"
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height (m)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Optional"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isLoading ? "Adding..." : " Add Data"}
      </button>

      <p className="text-xs text-gray-500">* Required fields</p>
    </form>
  );
}

export default DataForm;
