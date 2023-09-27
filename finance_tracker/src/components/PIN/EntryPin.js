import React from "react";
import { useState } from "react";
import { definePin } from "../../logic/setup";

const EntryPin = ({ setIsPinDefined }) => {
  const [pin, setPin] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    if (definePin(pin)) {
      setIsPinDefined(true);
    }
  };

  return (
    <div>
      <h2>Define o código PIN</h2>
      <form onSubmit={submitHandler}>
        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(event) => setPin(event.target.value)}
        />
        <button type="submit">OK</button>
      </form>
    </div>
  );
};

export default EntryPin;
