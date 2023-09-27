const { readFile, writeToFile } = require("./files");

const updateAccount = async (filename, pin, accountId, amount) => {
  try {
    const jsonData = await readFile(filename, pin);

    const newData = jsonData.map((account) => {
      if (account.id === accountId) {
        return { ...account, balance: (account.balance += amount) };
      }
      return account;
    });
    let result = await writeToFile(filename, newData, pin);
    return result;
  } catch (error) {
    console.error("Error updating accounts data:", error);
  }
};

module.exports = {
  updateAccount,
};
