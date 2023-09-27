var express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
var router = express.Router();

const homeDirectory = process.env.HOME || process.env.USERPROFILE;
const targetDirectory = path.join(homeDirectory, "finances");
const pinDataFile = path.join(targetDirectory, "pinData.json");
const accountsDataFile = path.join(targetDirectory, "accountsData.json");
const expensesDataFile = path.join(targetDirectory, "expensesData.json");
const incomeDataFile = path.join(targetDirectory, "incomeData.json");

router.get("/initialize", async (req, res) => {
  let error = false;

  if (!fs.existsSync(targetDirectory)) {
    // create the directory
    fs.mkdir(targetDirectory, (err) => {
      if (err) {
        console.error("Error creating directory:", err.message);
        error = true;
      } else {
        console.log("Directory created successfully:", targetDirectory);
      }
    });
  }

  try {
    if (!fs.existsSync(pinDataFile)) {
      await fs.promises.writeFile(pinDataFile, JSON.stringify([]));
      console.log("File created:", pinDataFile);
    }

    if (!fs.existsSync(accountsDataFile)) {
      await fs.promises.writeFile(accountsDataFile, JSON.stringify([]));
      console.log("File created:", accountsDataFile);
    }

    if (!fs.existsSync(expensesDataFile)) {
      await fs.promises.writeFile(expensesDataFile, JSON.stringify([]));
      console.log("File created:", expensesDataFile);
    }

    if (!fs.existsSync(incomeDataFile)) {
      await fs.promises.writeFile(incomeDataFile, JSON.stringify([]));
      console.log("File created:", incomeDataFile);
    }
  } catch (err) {
    console.error("Error:", err.message);
    error = true;
  }

  if (error) {
    res.json({ error: error });
  } else {
    res.json({});
  }
});

router.get("/pin", (req, res) => {
  let pinExists = false;
  try {
    const pinData = JSON.parse(fs.readFileSync(pinDataFile, "utf8"));
    if (pinData.pin) {
      pinExists = true;
    }

    res.json({ pinExists: pinExists });
  } catch (error) {
    res.json({ pinExists: pinExists });
  }
});

router.post("/definePin", async (req, res) => {
  const { pin } = req.body;
  const saltRounds = 10;
  const hashedPin = await bcrypt.hash(pin, saltRounds);

  try {
    await fs.promises.writeFile(
      pinDataFile,
      JSON.stringify({ pin: hashedPin })
    );
    res.json({ error: false });
  } catch (err) {
    console.log(err);
    res.json({ error: true });
  }
});

router.post("/validatePin", async (req, res) => {
  const { pin } = req.body;

  const pinData = JSON.parse(await fs.promises.readFile(pinDataFile, "utf8"));

  if (await bcrypt.compare(pin, pinData.pin)) {
    res.json({ error: false, pin: pinData.pin });
  } else {
    res.json({ error: true, pin: null });
  }
});

module.exports = router;
