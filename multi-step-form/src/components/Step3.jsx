import React, { useState } from "react";

const Step3 = ({ onNext, onPrev, updateFormData, formData }) => {
  const [userData, setUserData] = useState({
    userName: formData.userName,
    email: formData.email,
    phone: formData.phone,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = () => {
    updateFormData(userData);
    onNext();
  };

  return (
    <div>
      <h2>Enter your contact information:</h2>
      <label>
        Name:
        <input
          type="text"
          name="userName"
          value={userData.userName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={onPrev}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Step3;
