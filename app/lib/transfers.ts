'use server';

import { Transfer } from './definitions';
import { writeToFile, readFile, TRANSFERS_FILE, ACCOUNTS_FILE } from './files';
import { updateAccount } from './accounts';

/* create new transfer */
export async function newTransfer(pin: string, transfer: Transfer) {
  try {
    const jsonData = await readFile(TRANSFERS_FILE, pin);

    if (jsonData.length > 0) {
      jsonData.push(transfer);
      await writeToFile(TRANSFERS_FILE, jsonData, pin);
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
      return {};
    } else {
      await writeToFile(TRANSFERS_FILE, [transfer], pin);
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
    }
  } catch (error) {
    console.error('Error adding transfer data:', error);
    return { error: true };
  }
}

/* retrieve the transfers of a determined year */
export async function fetchTransfers(pin: string, year: number) {
  let result: Transfer[] = [];

  try {
    let transferData = await readFile(TRANSFERS_FILE, pin);

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
export async function deleteTransfer(id: string, pin: string) {
  try {
    let transferData = await readFile(TRANSFERS_FILE, pin);
    const prev = transferData.find((obj: Transfer) => obj.id === id);
    const newData = transferData.filter(
      (transfer: Transfer) => transfer.id !== id,
    );

    await writeToFile(TRANSFERS_FILE, newData, pin);
    await updateAccount(ACCOUNTS_FILE, pin, prev.accountFrom, +prev.value);
    await updateAccount(ACCOUNTS_FILE, pin, prev.accountTo, +prev.value * -1);
  } catch (error) {
    console.error('Error deleting income:', error);
  }
}

/* edit existing transfer */
export async function editTransfer(transfer: Transfer, pin: string) {
  try {
    let transferData = await readFile(TRANSFERS_FILE, pin);
    const prev = transferData.find((obj: Transfer) => obj.id === transfer.id);
    const newData = transferData.map((tra: Transfer) => {
      if (tra.id === tra.id) {
        return transfer;
      }
      return tra;
    });

    await writeToFile(TRANSFERS_FILE, newData, pin);
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
  } catch (error) {
    console.error('Error editing transfer:', error);
  }
}
