'use server';

import { IRSDef } from './definitions';
import { writeToFile, readFile, IRS_FILE } from './files';

/* retrieve the IRS data of a determined year */
export async function fetchIRS(pin: string, year: number) {
  try {
    let irsData: IRSDef[] = await readFile(IRS_FILE, pin);
    let irs = irsData?.find((irs: IRSDef) => +irs.year === +year) || null;
    if (irsData.length === 0 || !irs) {
      return null;
    }
    return irs;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}

/* update IRS data */
export async function updateIRS(pin: string, irsData: IRSDef) {
  try {
    let jsonData: IRSDef[] = await readFile(IRS_FILE, pin);
    const prev =
      jsonData.find((irs: IRSDef) => irs.year === irsData.year) || null;
    if (prev) {
      let newData = jsonData.map((irs: IRSDef) => {
        if (irs.year === irsData.year) {
          return irsData;
        }
        return irs;
      });
      await writeToFile(IRS_FILE, newData, pin);
      return irsData;
    } else {
      jsonData.push(irsData);
      await writeToFile(IRS_FILE, jsonData, pin);
      return irsData;
    }
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}
