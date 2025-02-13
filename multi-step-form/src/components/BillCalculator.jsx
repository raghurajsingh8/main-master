import React, { useState } from "react";

const BillCalculator = () => {
  const [appliances, setAppliances] = useState([]);
  const [selectedAppliance, setSelectedAppliance] = useState("Air Conditioner");
  const [customApplianceName, setCustomApplianceName] = useState("");
  const [power, setPower] = useState(1500);
  const [quantity, setQuantity] = useState(1);
  const [usage, setUsage] = useState(0);
  const [puc, setPuc] = useState(6);

  const applianceOptions = [
    { value: "Air Conditioner", watt: 1500 },
    { value: "Blender", watt: 300 },
    { value: "Ceiling Fan", watt: 70 },
    { value: "Clothes Dryer", watt: 2000 },
    { value: "Coffee Maker", watt: 800 },
    { value: "Computer", watt: 150 },
    { value: "Cooler", watt: 150 },
    { value: "Dishwasher", watt: 1800 },
    { value: "Electric Heater", watt: 2000 },
    { value: "Electric Kettle", watt: 1500 },
    { value: "Electric Iron", watt: 1000 },
    { value: "Electric Stove", watt: 1500 },
    { value: "Exhaust Fan", watt: 50 },
    { value: "Freezer", watt: 100 },
    { value: "Hair Dryer", watt: 1500 },
    { value: "Induction Cooktop", watt: 2000 },
    { value: "Laptop", watt: 50 },
    { value: "Light Bulb (CFL)", watt: 15 },
    { value: "Light Bulb (LED)", watt: 10 },
    { value: "Light Bulb (Incandescent)", watt: 60 },
    { value: "Microwave", watt: 1200 },
    { value: "Mixer", watt: 500 },
    { value: "Mobile Charger", watt: 5 },
    { value: "Oven", watt: 1000 },
    { value: "Printer", watt: 50 },
    { value: "Projector", watt: 200 },
    { value: "Refrigerator", watt: 150 },
    { value: "Rice Cooker", watt: 700 },
    { value: "Room Heater", watt: 1500 },
    { value: "Router", watt: 10 },
    { value: "Slow Cooker", watt: 250 },
    { value: "Solar Panel", watt: 0 },
    { value: "Space Heater", watt: 1500 },
    { value: "Speakers", watt: 20 },
    { value: "Subwoofer", watt: 150 },
    { value: "Table Fan", watt: 50 },
    { value: "Television", watt: 120 },
    { value: "Toaster", watt: 800 },
    { value: "Tubelight", watt: 40 },
    { value: "Vacuum Cleaner", watt: 700 },
    { value: "Washing Machine", watt: 500 },
    { value: "Water Dispenser", watt: 100 },
    { value: "Water Heater", watt: 4000 },
    { value: "Water Pump", watt: 750 },
    { value: "Wi-Fi Router", watt: 10 },
    { value: "Other", watt: 0 },
  ];

  const calculateSanctionedLoad = (appliances) => {
    let totalLoad = 0;
    appliances.forEach((appliance) => {
      totalLoad += (appliance.power / 1000) * appliance.quantity;
    });
    return totalLoad;
  };

  const calculateBill = () => {
    const ratePerKWh = puc;

    if (isNaN(ratePerKWh) || ratePerKWh <= 0) {
      alert("Please enter a valid Per Unit Cost.");
      return;
    }

    let totalDailyConsumption = 0;

    // Calculate total daily consumption
    appliances.forEach((appliance) => {
      const dailyConsumption = (appliance.power / 1000) * appliance.usage * appliance.quantity;
      totalDailyConsumption += dailyConsumption;
    });

    const totalMonthlyConsumption = totalDailyConsumption * 30; // 30 days in a month
    const monthlyBill = totalMonthlyConsumption * ratePerKWh;

    // Calculate sanctioned load
    const sanctionedLoad = calculateSanctionedLoad(appliances);

    // Display results
    document.getElementById("daily-consumption").innerText = `Total Daily Consumption: ${totalDailyConsumption.toFixed(2)} kWh`;
    document.getElementById("monthly-consumption").innerText = `Total Monthly Consumption: ${totalMonthlyConsumption.toFixed(2)} kWh`;
    document.getElementById("monthly-bill").innerText = `Approximate Monthly Bill: ₹${monthlyBill.toFixed(2)}`;
    document.getElementById("sanctioned-load").innerText = `Recommended Sanctioned Load: ${sanctionedLoad.toFixed(2)} kW`;
  };

  const handleApplianceChange = (event) => {
    const selectedOption = applianceOptions.find((option) => option.value === event.target.value);
    setSelectedAppliance(event.target.value);
    setPower(selectedOption.watt);

    if (selectedOption.value === "Other") {
      setCustomApplianceName("");
    }
  };

  const addAppliance = () => {
    if (!power || quantity <= 0 || usage < 0 || !puc) {
      alert("Please enter valid details for all fields.");
      return;
    }

    const applianceName =
      selectedAppliance === "Other" ? customApplianceName : selectedAppliance;

    if (applianceName) {
      const newAppliance = { applianceName, power, quantity, usage };
      setAppliances((prevAppliances) => [...prevAppliances, newAppliance]);

      // Reset fields
      setQuantity(1);
      setUsage(0);
      setCustomApplianceName("");
      setPower(selectedAppliance === "Other" ? 0 : power);
    }
  };

  const deleteAppliance = (index) => {
    setAppliances((prevAppliances) =>
      prevAppliances.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="container">
      <div id="appliance-form">
        <label>Select Appliance</label>
        <select value={selectedAppliance} onChange={handleApplianceChange}>
          {applianceOptions.map((option) => (
            <option key={option.value} value={option.value} data-watt={option.watt}>
              {`${option.value} (${option.watt}W)`}
            </option>
          ))}
        </select>

        {selectedAppliance === "Other" && (
          <div id="custom-appliance">
            <label>Appliance Name</label>
            <input
              type="text"
              value={customApplianceName}
              onChange={(e) => setCustomApplianceName(e.target.value)}
              placeholder="Enter Appliance Name"
            />
          </div>
        )}

        <label>Power (Watts)</label>
        <input
          type="number"
          value={power}
          onChange={(e) => setPower(Number(e.target.value))}
          placeholder="Power (Watt)"
          min="0"
        />

        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Number of appliances"
          min="1"
        />

        <label>Usage per Day (hours)</label>
        <input
          type="number"
          value={usage}
          onChange={(e) => setUsage(Number(e.target.value))}
          placeholder="Usage per Day (hours)"
          step="0.1"
          min="0"
        />

        <label>Per Unit Cost</label>
        <input
          type="number"
          value={puc}
          onChange={(e) => setPuc(Number(e.target.value))}
          placeholder="₹/kWh (rupees per kilowatt-hour)"
          min="1"
        />

        <button onClick={addAppliance}>Add Appliance</button>
      </div>

      <div id="appliances-list">
        <h2>Appliances</h2>
        <ul>
          {appliances.map((appliance, index) => (
            <li key={index}>
              {`${appliance.quantity} x ${appliance.applianceName} - ${appliance.power}W, ${appliance.usage} hrs/day `}
              <span className="delete" onClick={() => deleteAppliance(index)}>
                ❌
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      <button onClick={calculateBill}>Calculate Bill</button>

      <div id="results">
        <h2>Results</h2>
        <p id="daily-consumption"></p>
        <p id="monthly-consumption"></p>
        <p id="monthly-bill"></p>
        <p id="sanctioned-load"></p>
      </div>
    </div>
  );
};

export default BillCalculator;

