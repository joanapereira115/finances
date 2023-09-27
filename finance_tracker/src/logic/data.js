import axios from "axios";

const getYearBalance = async (year, pin) => {
  let endpoint = `http://localhost:3000/general/getBalanceByYear`;

  try {
    let response = await axios.post(endpoint, { pin, year });
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export { getYearBalance };
