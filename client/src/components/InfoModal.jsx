import React from "react";
import { X, Info } from "lucide-react";

function InfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Info className="size-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">About</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition"
            aria-label="Close"
          >
            <X className="size-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Health Data Collector
            </h3>
            <p className="text-sm leading-relaxed">
              This application allows you to collect and analyze your patient's
              health data. It specializes in analyzing how patient
              characteristics such as <strong>age, weight, and height</strong>
              impact <strong>blood pressure</strong> readings using statistical
              regression analysis.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">
              What You Can Do:
            </h4>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>
                Record patient health metrics (age, weight, height, blood
                pressure)
              </li>
              <li>View all recorded data in an organized table</li>
              <li>Analyze correlations between factors and blood pressure</li>
              <li>Visualize trends with interactive charts</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Analysis Types:
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                <strong>Simple Analysis:</strong> Shows how age specifically
                affects blood pressure
              </li>
              <li>
                <strong>Advanced Analysis:</strong> Shows how age, weight, and
                height together influence and predict blood pressure values
              </li>
            </ul>
          </div>

          <div className="text-xs text-gray-600 pt-3 border-t border-gray-200 bg-blue-50 p-3 rounded">
            <p className="font-semibold mb-1">💡 Use Case:</p>
            <p>
              Understand which factors most influence your patient's blood
              pressure and identify patterns.
            </p>
          </div>

          <div className="text-xs text-gray-500">
            <p>
              Click the Info button at the top to reopen this window anytime.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
