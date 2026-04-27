import React, { useState } from "react";

function DataForm({ onSubmit, isLoading }) {
  const [age, setAge] = useState("");
  const [tension, setTension] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    // Validation
    if (!age || !tension) {
      setValidationError("Please fill in all fields");
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

    if (tensionNum < 0) {
      setValidationError("Tension cannot be negative");
      return;
    }

    onSubmit({ age: ageNum, tension: tensionNum });
    setAge("");
    setTension("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {validationError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
          {validationError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Age (years)
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
          Blood Pressure (mmHg)
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

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isLoading ? "Adding..." : " Add Data"}
      </button>
    </form>
  );
}

export default DataForm;
