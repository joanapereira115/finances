'use server';

import { promises as fs } from 'fs';
import bcrypt from 'bcryptjs';

import {
  TARGET_DIR,
  PIN_FILE,
  ACCOUNTS_FILE,
  getExpensesFile,
  getIncomeFile,
  getTransfersFile,
  getIRSFile,
} from './files';

export async function pinDefined() {
  try {
    const pinData = JSON.parse(
      await fs.readFile(PIN_FILE, { encoding: 'utf-8' }),
    );
    if (pinData.pin) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function validatePin(pin: string) {
  try {
    const pinData = JSON.parse(
      await fs.readFile(PIN_FILE, { encoding: 'utf-8' }),
    );

    if (await bcrypt.compare(pin, pinData.pin)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function definePin(pin: string) {
  const saltRounds = 10;
  const hashedPin = await bcrypt.hash(pin, saltRounds);

  try {
    await fs.writeFile(PIN_FILE, JSON.stringify({ pin: hashedPin }), 'utf-8');
    return true;
  } catch (error) {
    return false;
  }
}

const getFolder = async function (folderName) {
  try {
    return await fs.opendir(folderName, { encoding: 'utf8' });
  } catch (error) {
    try {
      await fs.mkdir(folderName);
      return await fs.opendir(folderName, { encoding: 'utf8' });
    } catch (error) {
      throw error;
    }
  }
};

const createFile = async function (filename) {
  try {
    await fs.readFile(filename, { encoding: 'utf-8' });
  } catch (error) {
    try {
      await fs.writeFile(filename, []);
    } catch (error) {
      throw error;
    }
  }
};

export async function initialize() {
  try {
    let currentYear: number | undefined = new Date().getFullYear();
    let folderName = `${TARGET_DIR}/${currentYear}`;
    console.log(folderName);
    const dir = await getFolder(TARGET_DIR);
    const subdir = await getFolder(folderName);
    await createFile(getExpensesFile(currentYear));
    await createFile(getIncomeFile(currentYear));
    await createFile(getTransfersFile(currentYear));
    await createFile(getIRSFile(currentYear));
    await createFile(PIN_FILE);
    await createFile(ACCOUNTS_FILE);
    dir.close();
    subdir.close();
  } catch (error) {
    return false;
  }
}

export async function initializeFolder(year: number) {
  let folderName = `${TARGET_DIR}/${year}`;
  const dir = await getFolder(folderName);
  await createFile(getExpensesFile(year));
  await createFile(getIncomeFile(year));
  await createFile(getTransfersFile(year));
  await createFile(getIRSFile(year));
  dir.close();
}
