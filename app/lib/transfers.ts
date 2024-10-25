'use server';

import { Transfer } from './definitions';
import {
  writeToFile,
  readFile,
  getTransfersFile,
  ACCOUNTS_FILE,
} from './files';
import { updateAccount } from './accounts';

/* create new transfer */
export async function newTransfer(pin: string, transfer: Transfer) {
  let transfers_file = getTransfersFile(transfer.year);

  try {
    const jsonData = await readFile(transfers_file, pin);

    if (jsonData.length > 0) {
      jsonData.push(transfer);
      await writeToFile(transfers_file, jsonData, pin);
      await updateAccount(
        ACCOUNTS_FILE,
        pin,
        transfer.accountFrom,
        +transfer.value * -1,
      );
      await updateAccount(
        ACCOUNTS_FILE,
        pin,
        transfer.accountTo,
        transfer.value,
      );
      return jsonData;
    } else {
      await writeToFile(transfers_file, [transfer], pin);
      await updateAccount(
        ACCOUNTS_FILE,
        pin,
        transfer.accountFrom,
        +transfer.value * -1,
      );
      await updateAccount(
        ACCOUNTS_FILE,
        pin,
        transfer.accountTo,
        transfer.value,
      );
      return [transfer];
    }
  } catch (error) {
    console.error('Error adding transfer data:', error);
    return [];
  }
}

/* retrieve the transfers of a determined year */
export async function fetchTransfers(pin: string, year: number) {
  let transfers_file = getTransfersFile(year);
  let result: Transfer[] = [];

  try {
    let transferData = await readFile(transfers_file, pin);

    let transfers = transferData?.filter(
      (transfer: Transfer) => +transfer.year === +year,
    );
    transfers.sort((a: Transfer, b: Transfer) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    result = transfers;
    return result;
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
}

/* delete existing transfer */
export async function deleteTransfer(id: string, year: number, pin: string) {
  let transfers_file = getTransfersFile(year);

  try {
    let transferData = await readFile(transfers_file, pin);
    const prev = transferData.find((obj: Transfer) => obj.id === id);
    const newData = transferData.filter(
      (transfer: Transfer) => transfer.id !== id,
    );

    await writeToFile(transfers_file, newData, pin);
    await updateAccount(ACCOUNTS_FILE, pin, prev.accountFrom, +prev.value);
    await updateAccount(ACCOUNTS_FILE, pin, prev.accountTo, +prev.value * -1);
    return newData;
  } catch (error) {
    console.error('Error deleting income:', error);
    return [];
  }
}

/* edit existing transfer */
export async function editTransfer(transfer: Transfer, pin: string) {
  let transfers_file = getTransfersFile(transfer.year);
  try {
    let transferData = await readFile(transfers_file, pin);

    const prev = transferData.find((obj: Transfer) => obj.id === transfer.id);
    const newData = transferData.map((tra: Transfer) => {
      if (transfer.id === tra.id) {
        return transfer;
      }
      return tra;
    });

    await writeToFile(transfers_file, newData, pin);
    await updateAccount(
      ACCOUNTS_FILE,
      pin,
      transfer.accountFrom,
      +transfer.value * -1,
    );
    await updateAccount(ACCOUNTS_FILE, pin, prev.accountFrom, +prev.value);

    await updateAccount(
      ACCOUNTS_FILE,
      pin,
      transfer.accountTo,
      +transfer.value,
    );
    await updateAccount(ACCOUNTS_FILE, pin, prev.accountTo, +prev.value * -1);
    return newData;
  } catch (error) {
    console.error('Error editing transfer:', error);
    return [];
  }
}
