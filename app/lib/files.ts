import { promises as fs } from 'fs';
const { enc, AES } = require('crypto-js');

export const HOME_DIR = process.env.HOME || process.env.USERPROFILE;
export const TARGET_DIR = `${HOME_DIR}/finances`;
export const EXPENSES_FILE = `${TARGET_DIR}/expensesData.json`;
export const INCOME_FILE = `${TARGET_DIR}/incomeData.json`;
export const ACCOUNTS_FILE = `${TARGET_DIR}/accountsData.json`;
export const PIN_FILE = `${TARGET_DIR}/pinData.json`;

export async function readFile(filename: string, pin: string) {
  if (HOME_DIR === undefined) {
    return;
  }
  try {
    const encryptedData = await fs.readFile(filename, { encoding: 'utf-8' });
    const decryptedData = AES.decrypt(encryptedData, pin).toString(enc.Utf8);

    if (decryptedData) {
      const jsonData = JSON.parse(decryptedData);
      return jsonData;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}

export async function writeToFile(filename: string, data: any, pin: string) {
  try {
    const encrypted = AES.encrypt(JSON.stringify(data), pin).toString();
    await fs.writeFile(filename, encrypted, 'utf-8');
    return {};
  } catch (error) {
    throw error;
  }
}
