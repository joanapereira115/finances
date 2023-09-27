const fs = require("fs");
const { enc, AES } = require("crypto-js");
const path = require("path");

const readFile = async (filename, pin) => {
  try {
    const encryptedData = await fs.promises.readFile(filename, "utf-8");
    const decryptedData = AES.decrypt(encryptedData, pin).toString(enc.Utf8);

    if (decryptedData) {
      const jsonData = JSON.parse(decryptedData);
      return jsonData;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};

const writeToFile = async (filename, data, pin) => {
  try {
    const encrypted = AES.encrypt(JSON.stringify(data), pin).toString();
    await fs.promises.writeFile(filename, encrypted, "utf-8");
    return {};
  } catch (error) {
    console.error("Error writing to file:", error);
    return { error: true };
  }
};

module.exports = {
  readFile,
  writeToFile,
};
