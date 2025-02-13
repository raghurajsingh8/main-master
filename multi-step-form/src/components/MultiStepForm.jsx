import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    knowsBill: false,
    userLocation: "",
    userName: "",
    email: "",
    phone: "",
  });

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  return (
    <div className="form-container">
      <div className="stepper">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`step ${s === step ? "active" : ""}`}
            onClick={() => s < step || formData[`step${s - 1}Complete`] ? handleStepChange(s) : null}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="step-content">
        {step === 1 && (
          <Step1 onNext={() => handleStepChange(2)} updateFormData={updateFormData} />
        )}
        {step === 2 && (
          <Step2
            onNext={() => handleStepChange(3)}
            onPrev={() => handleStepChange(1)}
            updateFormData={updateFormData}
            formData={formData}
          />
        )}
        {step === 3 && (
          <Step3
            onNext={() => handleStepChange(4)}
            onPrev={() => handleStepChange(2)}
            updateFormData={updateFormData}
            formData={formData}
          />
        )}
        {step === 4 && <Step4 formData={formData} />}
      </div>
    </div>
  );
};

export default MultiStepForm;
