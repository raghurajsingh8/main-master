import React, { useState } from "react";

const Step2 = ({ onNext, onPrev, updateFormData }) => {
  const [monthlyBill, setMonthlyBill] = useState(""); // Renamed
  const [propertyType, setPropertyType] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [sunlight, setSunlight] = useState(6); // Default 6 hours
  const [rate, setRate] = useState(8); // Default ₹/kWh

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude.toFixed(6));
          setLongitude(longitude.toFixed(6));

          let avgSunlight = 6;
          if (latitude >= 8 && latitude <= 12) avgSunlight = 7;
          else if (latitude >= 20 && latitude <= 28) avgSunlight = 5.5;

          setSunlight(avgSunlight);
          alert(`Location detected: Latitude ${latitude}, Longitude ${longitude}, Avg Sunlight: ${avgSunlight} hours/day`);
        },
        () => alert("Location detection failed. Please set manually.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = () => {
    updateFormData({
      monthlyBill, // Corrected variable name
      propertyType,
      latitude,
      longitude,
      sunlight,
      rate, // Corrected variable name
    });
    onNext();
  };

  return (
    <div className="step2-container">
      <h2>Enter Electricity and Location Details</h2>

      <div className="form-group">
        <label>Electricity Bill (₹/Month):</label>
        <input
          type="text"
          value={monthlyBill}
          onChange={(e) => setMonthlyBill(e.target.value)}
          placeholder="Enter your monthly bill"
        />
      </div>

      <div className="form-group">
        <label>Select Type:</label>
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
        </select>
      </div>

      <div className="form-group">
        <label>Latitude:</label>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
        />
      </div>

      <div className="form-group">
        <label>Longitude:</label>
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude"
        />
      </div>

      <button className="detect-location" onClick={detectLocation}>
        📍 Detect Location (Auto Sunlight)
      </button>

      <div className="form-group">
        <label>Sunlight Availability (Hours/Day):</label>
        <input type="number" value={sunlight} readOnly />
      </div>

      <div className="form-group">
        <label>Electricity Rate (₹/kWh):</label>
        <input type="number" value={rate} readOnly />
      </div>

      <div className="navigation-buttons">
        <button onClick={onPrev}>Back</button>
        <button onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
};

export default Step2;
