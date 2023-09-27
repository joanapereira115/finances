import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

import { getYearBalance } from "../../logic/data";

import {
  accountCategories,
  irsCategories,
  expenseCategories,
} from "../../logic/categories";

const Home = ({ pin }) => {
  const [year, setYear] = useState(2023);
  const [balance, setBalance] = useState({});

  useEffect(() => {
    const fetchBalance = async () => {
      let balance = await getYearBalance(year, pin);
      setBalance(balance);
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <Sidebar />
      <h1>Home</h1>
      <p>{balance.income}</p>
      <p>{balance.expense}</p>
      <p>{balance.difference}</p>
      <p>{balance.percentage}</p>
    </div>
  );
};

export default Home;
