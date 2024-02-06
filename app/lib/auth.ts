'use server';

import { promises as fs } from 'fs';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import {
  TARGET_DIR,
  PIN_FILE,
  EXPENSES_FILE,
  INCOME_FILE,
  ACCOUNTS_FILE,
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
    revalidatePath('/');
    return true;
  } catch (error) {
    return false;
  }
}

const getFolder = async function () {
  try {
    return await fs.opendir(TARGET_DIR, { encoding: 'utf8' });
  } catch (error) {
    try {
      await fs.mkdir(TARGET_DIR);
      return await fs.opendir(TARGET_DIR, { encoding: 'utf8' });
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
    const dir = await getFolder();
    createFile(PIN_FILE);
    createFile(EXPENSES_FILE);
    createFile(INCOME_FILE);
    createFile(ACCOUNTS_FILE);
    dir.close();
  } catch (error) {
    return false;
  }
}
