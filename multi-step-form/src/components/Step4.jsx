import React from "react";
import "../styles/App.css"; 

const Step4 = ({ formData }) => {
  const { monthlyBill, sunlight, rate } = formData;

  if (!monthlyBill || !sunlight || !rate) {
    return <h2 style={{ textAlign: "center" }}>Missing Data for Calculation</h2>;
  }

  const monthlyConsumption = monthlyBill / rate; // kWh
  const dailyConsumption = monthlyConsumption / 30; // kWh/day
  const requiredCapacity = dailyConsumption / sunlight; // kW
  const numberOfPanels = Math.ceil((requiredCapacity * 1000) / 300); // 300W panels
  const systemCost = requiredCapacity * 60000; // ₹60,000 per kW
  const roofAreaRequired = numberOfPanels * 1.7; // 1.7 m² per panel
  const treesSaved = requiredCapacity * 0.03; // 0.03 trees per kW per year
  const co2Saved = requiredCapacity * 1.2; // 1.2 tons of CO2 per kW per year
  const subsidyCentral = systemCost * 0.30; // 30% subsidy
  const subsidyState = systemCost * 0.20; // 20% subsidy

  const savingsPerDay = dailyConsumption * rate;
  const savingsPerMonth = savingsPerDay * 30;
  const totalSavings25Years = savingsPerMonth * 12 * 25;
  const roi = ((totalSavings25Years - systemCost) / systemCost) * 100;

  const treesSavedIn25Years = treesSaved * 25;
  const co2SavedIn25Years = co2Saved * 25;

  return (
    <div className="form-container">
      <h2>Solar Panel Calculation Results</h2>
      <div className="result-container">
        <div className="result-card">
          <h3>Energy Estimates</h3>
          <p>Monthly Energy: {monthlyConsumption.toFixed(2)} kWh</p>
          <p>Daily Energy: {dailyConsumption.toFixed(2)} kWh</p>
          <p>Required Capacity: {requiredCapacity.toFixed(2)} kW</p>
          <p>Panels (300W each): {numberOfPanels}</p>
          <p>System Cost: ₹{systemCost.toFixed(2)}</p>
          <p>Roof Area: {roofAreaRequired.toFixed(2)} m²</p>
        </div>

        <div className="result-card">
          <h3>Environmental Benefits</h3>
          <p>Trees Saved (25 yrs): {treesSavedIn25Years.toFixed(2)}</p>
          <p>CO2 Saved (25 yrs): {co2SavedIn25Years.toFixed(2)} tons</p>
        </div>

        <div className="result-card">
          <h3>Financial Estimates</h3>
          <p>Savings per Day: ₹{savingsPerDay.toFixed(2)}</p>
          <p>Savings per Month: ₹{savingsPerMonth.toFixed(2)}</p>
          <p>Total Savings (25 yrs): ₹{totalSavings25Years.toFixed(2)}</p>
          <p>ROI (25 yrs): {roi.toFixed(2)}%</p>
        </div>

        <div className="result-card">
          <h3>Subsidy Information</h3>
          <p>Central Subsidy: ₹{subsidyCentral.toFixed(2)}</p>
          <p>State Subsidy: ₹{subsidyState.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Step4;
