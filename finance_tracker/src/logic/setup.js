import axios from "axios";

const initialize = async () => {
  let endpoint = `http://localhost:3000/initialize`;

  try {
    let response = await axios.get(endpoint);
    if (response.data.error) {
      console.log("Error initializing files.");
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const pinDefined = async () => {
  let endpoint = `http://localhost:3000/pin`;

  try {
    let response = await axios.get(endpoint);
    return response.data.pinExists;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const definePin = async (pin) => {
  let endpoint = `http://localhost:3000/definePin`;

  try {
    let response = await axios.post(endpoint, { pin: pin });
    if (response.data.error) {
      console.log("Error defining pin.");
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const verifyPin = async (pin) => {
    let endpoint = `http://localhost:3000/validatePin`;
  
    try {
      let response = await axios.post(endpoint, { pin: pin });
      if (response.data.error) {
        console.log("Error validating pin.");
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

export { initialize, pinDefined, definePin, verifyPin };
