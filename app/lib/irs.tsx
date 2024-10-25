'use server';

import { initializeFolder } from './auth';
import { IRSDef } from './definitions';
import { writeToFile, readFile, getIRSFile } from './files';

/* retrieve the IRS data of a determined year */
export async function fetchIRS(pin: string, year: number) {
  let irs_file = getIRSFile(year);
  try {
    let irsData: IRSDef[] = await readFile(irs_file, pin);
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
  let currentYear: number | undefined = new Date().getFullYear();

  if (irsData.year && irsData.year !== currentYear) {
    await initializeFolder(irsData.year);
  }

  let irs_file = getIRSFile(irsData.year);
  try {
    let jsonData: IRSDef[] = await readFile(irs_file, pin);
    const prev =
      jsonData.find((irs: IRSDef) => irs.year === irsData.year) || null;
    if (prev) {
      let newData = jsonData.map((irs: IRSDef) => {
        if (irs.year === irsData.year) {
          return irsData;
        }
        return irs;
      });
      await writeToFile(irs_file, newData, pin);
      return irsData;
    } else {
      jsonData.push(irsData);
      await writeToFile(irs_file, jsonData, pin);
      return irsData;
    }
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}
