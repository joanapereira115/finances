import React from "react";
import { useState } from "react";
import { verifyPin } from "../../logic/setup";

const VerifyPin = ({ setPin }) => {
  const [enteredPin, setEnteredPin] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    if (await verifyPin(enteredPin)) {
      setPin(enteredPin);
    }
  };

  return (
    <div>
      <h2>Introduz o código PIN</h2>
      <form onSubmit={submitHandler}>
        <input
          type="password"
          placeholder="PIN"
          value={enteredPin}
          onChange={(event) => setEnteredPin(event.target.value)}
        />
        <button type="submit">OK</button>
      </form>
    </div>
  );
};

export default VerifyPin;
