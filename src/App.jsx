import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const mockChartData = [
  { meal: "Breakfast", calories: 300 },
  { meal: "Lunch", calories: 600 },
  { meal: "Dinner", calories: 700 },
  { meal: "Snacks", calories: 150 },
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [manualEntry, setManualEntry] = useState({ food: "", calories: "" });
  const [mealLog, setMealLog] = useState([]);
  const [detectedFood, setDetectedFood] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    // Example: Use a dummy fetch to simulate food recognition API
    const fakeApiResponse = {
      food: "Grilled Chicken",
      calories: 400
    };

    setTimeout(() => {
      setDetectedFood(fakeApiResponse);
      setMealLog([...mealLog, fakeApiResponse]);
    }, 1000);
  };

  const handleManualSubmit = () => {
    setMealLog([...mealLog, manualEntry]);
    setManualEntry({ food: "", calories: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🍽️ Calorie Tracker App</h1>

      {/* Image Upload Section */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Upload Food Image</h2>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {selectedImage && (
          <img src={selectedImage} alt="Preview" className="mt-4 w-48 rounded-lg" />
        )}
        {detectedFood && (
          <p className="mt-2 text-green-600">
            Detected: {detectedFood.food} - {detectedFood.calories} cal
          </p>
        )}
      </div>

      {/* Manual Entry Section */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow space-y-2">
        <h2 className="text-xl font-semibold">Manual Entry</h2>
        <input
          placeholder="Food name"
          value={manualEntry.food}
          onChange={(e) => setManualEntry({ ...manualEntry, food: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Calories"
          value={manualEntry.calories}
          onChange={(e) => setManualEntry({ ...manualEntry, calories: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button 
          onClick={handleManualSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Meal
        </button>
      </div>

      {/* Meal Log */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Meal Log</h2>
        <ul className="list-disc list-inside">
          {mealLog.map((meal, idx) => (
            <li key={idx}>
              {meal.food}: {meal.calories} cal
            </li>
          ))}
        </ul>
      </div>

      {/* Chart */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Daily Calorie Breakdown</h2>
        <BarChart width={400} height={250} data={mockChartData}>
          <XAxis dataKey="meal" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="calories" fill="#38bdf8" />
        </BarChart>
      </div>
    </div>
  );
}
