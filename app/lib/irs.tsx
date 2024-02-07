'use server';

import { IRSDef } from './definitions';
import { writeToFile, readFile, IRS_FILE } from './files';

const youngIRS = [
  { id: 1, percentage: 50, limit: 6002.88 },
  { id: 2, percentage: 40, limit: 4802.3 },
  { id: 3, percentage: 30, limit: 3601.73 },
  { id: 4, percentage: 30, limit: 3601.73 },
  { id: 5, percentage: 20, limit: 2401.15 },
];

const scale = [
  { min: 0, max: 7479, tax: 14.5, parcel: 0 },
  { min: 7480, max: 11284, tax: 21, parcel: 486.14 },
  { min: 11285, max: 15992, tax: 26.5, parcel: 1106.73 },
  { min: 15993, max: 20700, tax: 28.5, parcel: 1426.65 },
  { min: 20701, max: 26355, tax: 35, parcel: 2772.14 },
  { min: 26356, max: 38632, tax: 37, parcel: 3299.12 },
  { min: 38633, max: 50483, tax: 43.5, parcel: 5810.25 },
  { min: 50484, max: 78834, tax: 45, parcel: 6567.33 },
  { min: 78835, max: Infinity, tax: 48, parcel: 8932.68 },
];

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
    } else {
      jsonData.push(irsData);
      await writeToFile(IRS_FILE, jsonData, pin);
    }
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}

/* calculate IRS */
export async function calculateIRS(irsData: IRSDef) {
  let rendCol = +irsData.grossIncome - +4104;
  let scaleLine =
    scale.find((item) => +rendCol >= +item.min && +rendCol <= +item.max) ||
    null;
  let tax = +scaleLine.tax;
  let parcel = +scaleLine.parcel;
  let impApur = +rendCol * +tax - +parcel;
  let impIse = +0;
  if (irsData.youngIrs !== '') {
    let youngLine =
      youngIRS.find((item) => +irsData.youngIrs === +item.id) || null;
    let limit =
      +irsData.grossIncome * +youngLine.percentage < +youngLine.limit
        ? +irsData.grossIncome * +youngLine.percentage
        : +youngLine.limit;
    impIse = (+limit / +rendCol) * +impApur;
  }
  let colTot = +impApur - +impIse;
  let IRSpay = +colTot - +irsData.deductions;
  let IRSreceive = +IRSpay - +irsData.withholding;

  return {
    rendCol, // Rendimento coletável
    impApur, // Importância apurada
    impIse, // Imposto de rendimentos isentos
    colTot, // Coleta
    IRSpay, // Valor a pagar
    IRSreceive, // Valor a receber
  };
}
