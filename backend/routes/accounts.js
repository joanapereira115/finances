var express = require("express");
const path = require("path");

const { readFile, writeToFile } = require("../logic/files.js");

var router = express.Router();

const homeDirectory = process.env.HOME || process.env.USERPROFILE;
const targetDirectory = path.join(homeDirectory, "finances");
const accountsDataFile = path.join(targetDirectory, "accountsData.json");

/* retrieve the list of accounts */
router.post("/getAll", async (req, res) => {
  const { pin } = req.body;
  let accountsData = await readFile(accountsDataFile, pin);
  res.json(accountsData);
});

/* create new account */
router.post("/new", async (req, res) => {
  const { pin, account } = req.body;

  try {
    const jsonData = await readFile(accountsDataFile, pin);

    if (jsonData.length > 0) {
      const alreadyExists = jsonData.some((obj) => obj.id === account.id);

      if (alreadyExists) {
        res.json({ error: true });
      } else {
        jsonData.push(account);
        let result = await writeToFile(accountsDataFile, jsonData, pin);
        res.json(result);
      }
    } else {
      let result = await writeToFile(accountsDataFile, [account], pin);
      res.json(result);
    }
  } catch (error) {
    console.error("Error adding account data:", error);
    res.json({ error: true });
  }
});

/* inactivate existing account */
router.post("/inactivate", async (req, res) => {
  const { pin, id } = req.body;

  try {
    const jsonData = await readFile(accountsDataFile, pin);

    if (jsonData.length > 0) {
      const newData = jsonData.map((account) => {
        if (account.id === id) {
          return { ...account, active: false };
        }
        return account;
      });
      let result = await writeToFile(accountsDataFile, newData, pin);
      res.json(result);
    } else {
      res.json({ error: true });
    }
  } catch (error) {
    console.error("Error inactivating account:", error);
    res.json({ error: true });
  }
});

module.exports = router;
