import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { initialize, pinDefined } from "./logic/setup";
import EntryPin from "./components/PIN/EntryPin";
import VerifyPin from "./components/PIN/VerifyPin";
import Home from "./components/Home/Home";
import Income from "./components/Income/Income";

function App() {
  const [pin, setPin] = useState("");
  const [isPinDefined, setIsPinDefined] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const setPinWrapper = (pin) => {
    setPin(pin);
  };

  const setIsPinDefinedWrapper = (defined) => {
    setIsPinDefined(defined);
  };

  useEffect(() => {
    const fetchIsPinDefined = async () => {
      let pin = await pinDefined();
      setIsPinDefined(pin);
    };
    const init = async () => {
      let initialized = await initialize();
      setInitialized(initialized);
    };

    init();
    fetchIsPinDefined();
  }, []);

  const loadIndex = () => {
    if (!initialized) {
      return <h3>Ocorreu um erro na criação dos dados.</h3>;
    } else if (initialized && !isPinDefined) {
      return <EntryPin setIsPinDefined={setIsPinDefinedWrapper} />;
    } else if (initialized && isPinDefined && !pin) {
      return <VerifyPin setPin={setPinWrapper} />;
    } else if (initialized && isPinDefined && pin) {
      return <Home pin={pin} />;
    } else {
      return <h3>Algo de errado não está certo</h3>;
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={loadIndex()} />
          <Route path="/income" element={initialized && isPinDefined && pin ? <Income /> : loadIndex()} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
