import React from "react";

function DataTable({ data }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-300">
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">
              Age
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">
              Blood Pressure (mmHg)
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr
              key={record.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-4 py-3 text-gray-800">{record.age}</td>
              <td className="px-4 py-3 text-gray-800">
                {record.tension.toFixed(1)}
              </td>
              <td className="px-4 py-3 text-gray-600 text-sm">
                {formatDate(record.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
