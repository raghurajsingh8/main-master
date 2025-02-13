import React from "react";
import BillCalculator from "./BillCalculator";
import Step2 from "./Step2";

const Step1 = ({ onNext, updateFormData }) => {
  const handleChoice = (choice) => {
    if (choice === "no") {
      updateFormData({ knowsBill: false });
      return <BillCalculator />;
    } else {
      updateFormData({ knowsBill: true });
      onNext();
    }
  };

  return (
    <div>
      <h2>Do you know your electricity bill?</h2>
      <button onClick={() => handleChoice("yes")}>Yes</button>
      <button onClick={() => handleChoice("no")}>No</button>
    </div>
  );
};

export default Step1;
