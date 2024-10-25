'use client';

import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { clsx } from 'clsx';
import {
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  NoSymbolIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/outline';

import {
  Account,
  Column,
  Expense,
  Income,
  Transfer,
} from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import { expenseCategories, accountCategories } from '@/app/lib/categories';
import { useSelector } from 'react-redux';
import {
  accountsList,
  deleteAccount,
  getAccounts,
  updateAccount,
} from '@/app/store/accounts-context';
import { getCategoryDesc, getDescFromAccountType } from '@/app/lib/data';
import { store } from '@/app/store/store';
import { deleteIncome, updateIncome } from '@/app/store/income-context';
import { deleteExpense, updateExpense } from '@/app/store/expenses-context';
import { deleteTransfer, updateTransfer } from '@/app/store/transfers-context';

export default function DataTable({
  items,
  page,
  columns,
  type,
}: {
  items: (Expense | Income | Account | Transfer)[];
  page: string;
  columns: Column[];
  type: string;
}) {
  const accounts = useSelector(accountsList);

  const [filteredItems, setFilteredItems] = useState<
    (Expense | Income | Account | Transfer)[]
  >([]);
  const [sortedItems, setSortedItems] = useState<
    (Expense | Income | Account | Transfer)[]
  >([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const [editMode, setEditMode] = useState<string | null>(null);
  const [editedLine, setEditedLine] = useState<
    Expense | Income | Account | Transfer | null
  >(null);

  function getDescFromAccount(id: string, accounts: Account[]) {
    let accountsCopy = [...accounts];
    const account = accountsCopy.find((acc) => acc.id === id);
    return account?.name;
  }

  let disable = false;

  const handleSort = (column: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
      sortConfig &&
      sortConfig.key === column &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction });
  };

  const filterAndSortItems = () => {
    let sortedItemsCopy = [...sortedItems];
    if (sortConfig !== null) {
      switch (sortConfig.key) {
        case 'value':
        case 'balance':
          sortedItemsCopy.sort((a, b) => {
            if (+a[sortConfig.key] < +b[sortConfig.key]) {
              return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (+a[sortConfig.key] > +b[sortConfig.key]) {
              return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
          });
          break;
        default:
          sortedItemsCopy.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
          });
      }
    }

    const indexInit = (+page - 1) * 10;
    let filtered = [...sortedItemsCopy.slice(indexInit, indexInit + 10)];
    setSortedItems(sortedItemsCopy);
    setFilteredItems(filtered);
  };

  useEffect(() => {
    filterAndSortItems();
  }, [sortConfig]);

  useEffect(() => {
    const indexInit = (+page - 1) * 10;
    setSortedItems(items);
    setFilteredItems([...items.slice(indexInit, indexInit + 10)]);
  }, [items, page]);

  switch (type) {
    case 'account':
      if (!(editedLine as Account)?.name || !(editedLine as Account)?.type) {
        disable = true;
      }
      break;
    case 'income':
      if (!(editedLine as Income)?.name || !(editedLine as Income)?.account) {
        disable = true;
      }
      break;
    case 'expense':
      if (!(editedLine as Expense)?.name || !(editedLine as Expense)?.account) {
        disable = true;
      }
      break;
    case 'transfer':
      if (
        !(editedLine as Transfer)?.name ||
        !(editedLine as Transfer)?.accountFrom ||
        !(editedLine as Transfer)?.accountTo
      ) {
        disable = true;
      }
      break;
  }

  const exitEditing = () => {
    setEditMode(null);
    setEditedLine(null);
  };

  const handleSaveClick = () => {
    switch (type) {
      case 'account':
        store.dispatch(updateAccount(editedLine as Account));
        break;
      case 'income':
        store.dispatch(updateIncome(editedLine as Income));
        break;
      case 'expense':
        store.dispatch(updateExpense(editedLine as Expense));
        break;
      case 'transfer':
        store.dispatch(updateTransfer(editedLine as Transfer));
        break;
    }
    store.dispatch(getAccounts());
    exitEditing();
  };

  const handleDeleteClick = (item: Expense | Income | Account | Transfer) => {
    switch (type) {
      case 'account':
        store.dispatch(deleteAccount(item.id));
      case 'income':
        store.dispatch(deleteIncome(item as Income));
        break;
      case 'expense':
        store.dispatch(deleteExpense(item as Expense));
        break;
      case 'transfer':
        store.dispatch(deleteTransfer(item as Transfer));
        break;
    }
    store.dispatch(getAccounts());
  };

  function UpdateLine({
    item,
  }: {
    item: Expense | Income | Account | Transfer;
  }) {
    return (
      <div
        onClick={() => {
          setEditMode(item.id);
          setEditedLine({ ...item });
        }}
        className={clsx(
          editMode
            ? 'pointer-events-none rounded-md border p-1 opacity-40 hover:bg-gray-100'
            : 'rounded-md border p-1 hover:cursor-pointer hover:bg-gray-100 hover:text-black-600',
        )}
      >
        <PencilIcon className="w-4" />
      </div>
    );
  }

  function DeleteLine({
    item,
    active,
  }: {
    item: Expense | Income | Account | Transfer;
    active: boolean;
  }) {
    return (
      <form action={() => handleDeleteClick(item)}>
        <button
          className={clsx(
            editMode || !active
              ? 'pointer-events-none rounded-md border p-1 opacity-40 hover:bg-gray-100'
              : 'rounded-md border p-1 hover:bg-gray-100 hover:text-black-600',
          )}
        >
          <span className="sr-only">Delete</span>
          {type === 'account' ? (
            <NoSymbolIcon className="w-4" />
          ) : (
            <TrashIcon className="w-4" />
          )}
        </button>
      </form>
    );
  }

  function SaveLine() {
    return (
      <form action={handleSaveClick}>
        <button
          className={clsx(
            disable
              ? 'pointer-events-none rounded-md border p-1 opacity-40 hover:bg-gray-100'
              : 'rounded-md border p-1 hover:bg-gray-100 hover:text-black-600',
          )}
          disabled={disable}
        >
          <CheckIcon className="w-4" />
        </button>
      </form>
    );
  }

  function CancelLine() {
    return (
      <div
        onClick={exitEditing}
        className="rounded-md border p-1 hover:bg-gray-100 hover:text-black-600"
      >
        <XMarkIcon className="w-4" />
      </div>
    );
  }

  function renderCell(
    item: Expense | Income | Account | Transfer,
    column: string,
  ) {
    switch (column) {
      case 'name':
        return editMode === item.id ? (
          <input
            type="text"
            className="w-full rounded-md border border-white bg-black-600 text-sm outline-2 placeholder:text-gray-500"
            value={editedLine?.name}
            onChange={(e) =>
              setEditedLine(
                (
                  prevEditedLine: Expense | Income | Account | Transfer | null,
                ) => {
                  if (prevEditedLine) {
                    return {
                      ...prevEditedLine,
                      name: e.target.value,
                    };
                  }
                  return null;
                },
              )
            }
          />
        ) : (
          <span
            className={clsx(
              !(item as Account)?.active && type === 'account'
                ? 'opacity-40'
                : '',
            )}
          >
            {item.name}
          </span>
        );
      case 'date':
        return editMode === item.id ? (
          <input
            type="date"
            className="w-full rounded-md border border-white bg-black-600 text-sm outline-2 placeholder:text-gray-500"
            value={(editedLine as Expense | Income)?.date}
            onChange={(e) =>
              setEditedLine(
                (
                  prevEditedLine: Expense | Income | Account | Transfer | null,
                ) => {
                  if (prevEditedLine) {
                    return {
                      ...prevEditedLine,
                      date: e.target.value,
                    };
                  }
                  return null;
                },
              )
            }
          />
        ) : (
          formatDateToLocal((item as Expense | Income | Transfer).date)
        );
      case 'value':
        return editMode === item.id ? (
          <input
            id="value"
            name="value"
            type="number"
            min={0.0}
            step="0.01"
            className="peer block w-full rounded-md border border-white bg-black-600 text-sm outline-2"
            value={(editedLine as Expense | Income | Transfer)?.value}
            onChange={(e) =>
              setEditedLine(
                (
                  prevEditedLine: Expense | Income | Account | Transfer | null,
                ) => {
                  if (prevEditedLine) {
                    return {
                      ...prevEditedLine,
                      value: +e.target.value,
                    };
                  }
                  return null;
                },
              )
            }
          />
        ) : (
          `${(item as Expense | Income | Transfer).value}€`
        );
      case 'balance':
        return editMode === item.id ? (
          <input
            type="number"
            min={0.0}
            step="0.01"
            className="w-full rounded-md border border-white bg-black-600 text-sm outline-2 placeholder:text-gray-500"
            value={(editedLine as Account)?.balance}
            onChange={(e) =>
              setEditedLine((prevEditedLine: Account | null) => {
                if (prevEditedLine) {
                  return {
                    ...prevEditedLine,
                    balance: +e.target.value,
                  };
                }
                return null;
              })
            }
          />
        ) : (
          <span
            className={clsx(
              !(item as Account)?.active && type === 'account'
                ? 'opacity-40'
                : '',
            )}
          >
            {`${(item as Account)?.balance}€`}
          </span>
        );
      case 'account':
        return editMode === item.id ? (
          <select
            className="peer block w-full cursor-pointer rounded-md border border-white bg-black-600 text-sm outline-2 placeholder:text-gray-500"
            value={(editedLine as Expense | Income)?.account}
            onChange={(e) =>
              setEditedLine(
                (prevEditedLine: Expense | Income | Account | null) => {
                  if (prevEditedLine) {
                    return {
                      ...prevEditedLine,
                      account: e.target.value,
                    };
                  }
                  return null;
                },
              )
            }
          >
            <option value="" disabled></option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
        ) : (
          getDescFromAccount((item as Expense | Income).account, accounts)
        );
      case 'accountFrom':
        return editMode === item.id ? (
          <select
            className="peer block w-full cursor-pointer rounded-md border border-white bg-black-600 text-sm outline-2 placeholder:text-gray-500"
            value={(editedLine as Transfer)?.accountFrom}
            onChange={(e) =>
              setEditedLine((prevEditedLine: Transfer | null) => {
                if (prevEditedLine) {
                  return {
                    ...prevEditedLine,
                    account: e.target.value,
                  };
                }
                return null;
              })
            }
          >
            <option value="" disabled></option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
        ) : (
          getDescFromAccount((item as Transfer).accountFrom, accounts)
        );
      case 'accountTo':
        return editMode === item.id ? (
          <select
            className="peer block w-full cursor-pointer rounded-md border border-white bg-black-600 text-sm outline-2 placeholder:text-gray-500"
            value={(editedLine as Transfer)?.accountTo}
            onChange={(e) =>
              setEditedLine((prevEditedLine: Transfer | null) => {
                if (prevEditedLine) {
                  return {
                    ...prevEditedLine,
                    account: e.target.value,
                  };
                }
                return null;
              })
            }
          >
            <option value="" disabled></option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
        ) : (
          getDescFromAccount((item as Transfer).accountTo, accounts)
        );
      case 'category':
        return editMode === item.id ? (
          <select
            className="peer block w-full cursor-pointer rounded-md border border-white bg-black-600 text-sm outline-2 placeholder:text-gray-500"
            value={(editedLine as Expense)?.category}
            onChange={(e) =>
              setEditedLine(
                (prevEditedLine: Expense | Income | Account | null) => {
                  if (prevEditedLine) {
                    return {
                      ...prevEditedLine,
                      category: e.target.value,
                    };
                  }
                  return null;
                },
              )
            }
          >
            <option value=""></option>
            {expenseCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        ) : (
          getCategoryDesc((item as Expense).category)
        );
      case 'type':
        return editMode === item.id ? (
          <select
            className="peer block w-full cursor-pointer rounded-md border border-white bg-black-600 text-sm outline-2 placeholder:text-gray-500"
            value={(editedLine as Account)?.type}
            onChange={(e) =>
              setEditedLine(
                (prevEditedLine: Expense | Income | Account | null) => {
                  if (prevEditedLine) {
                    return {
                      ...prevEditedLine,
                      type: e.target.value,
                    };
                  }
                  return null;
                },
              )
            }
          >
            <option value=""></option>
            {accountCategories.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.description}
              </option>
            ))}
          </select>
        ) : (
          <span
            className={clsx(
              !(item as Account)?.active && type === 'account'
                ? 'opacity-40'
                : '',
            )}
          >
            {getDescFromAccountType((item as Account).type)}
          </span>
        );
      case 'nif':
        return editMode === item.id ? (
          <input
            type="checkbox"
            className="peer block rounded-md border border-white bg-black-600 py-2 text-lg outline-2"
            checked={(editedLine as Expense)?.nif}
            onChange={(e) =>
              setEditedLine(
                (prevEditedLine: Expense | Income | Account | null) => {
                  if (prevEditedLine) {
                    return {
                      ...prevEditedLine,
                      nif: e.target.checked,
                    };
                  }
                  return null;
                },
              )
            }
          />
        ) : (item as Expense).nif === true ? (
          <CheckIcon className="pointer-events-none h-4 w-4 text-green-400" />
        ) : (
          <XMarkIcon className="pointer-events-none h-4 w-4 text-red-400" />
        );
      case 'active':
        return editMode === item.id && !(item as Account).active ? (
          <input
            type="checkbox"
            className="peer block rounded-md border border-white bg-black-600 py-2 text-lg outline-2"
            checked={(editedLine as Account)?.active}
            onChange={(e) =>
              setEditedLine(
                (prevEditedLine: Expense | Income | Account | null) => {
                  if (prevEditedLine) {
                    return {
                      ...prevEditedLine,
                      active: Boolean(e.target.value),
                    };
                  }
                  return null;
                },
              )
            }
          />
        ) : (item as Account).active === true ? (
          <CheckIcon className="pointer-events-none h-4 w-4 text-green-400" />
        ) : (
          <XMarkIcon className="pointer-events-none h-4 w-4 text-red-400" />
        );
      case 'iva':
        return editMode === item.id ? (
          <input
            type="number"
            min={0.0}
            step="0.01"
            className="w-full rounded-md border border-white bg-black-600 text-sm outline-2 placeholder:text-gray-500"
            value={(editedLine as Expense)?.iva}
            onChange={(e) =>
              setEditedLine(
                (prevEditedLine: Expense | Income | Account | null) => {
                  if (prevEditedLine) {
                    return {
                      ...prevEditedLine,
                      iva: +e.target.value,
                    };
                  }
                  return null;
                },
              )
            }
          />
        ) : (item as Expense).iva && (item as Expense).iva !== 0 ? (
          `${(item as Expense).iva}€`
        ) : (
          ''
        );
      case 'actions':
        return editMode === item.id ? (
          <div className="flex justify-end gap-2">
            <SaveLine />
            <CancelLine />
          </div>
        ) : (
          <div className="flex justify-end gap-2">
            <UpdateLine item={item} />
            <DeleteLine
              item={item}
              active={type === 'account' ? (item as Account).active : true}
            />
          </div>
        );
      default:
        return <></>;
    }
  }

  return (
    <div className="rounded-xl bg-black-600 px-4 py-2 text-white drop-shadow-md">
      <div className="inline-block min-w-[99%] align-middle">
        <table className="w-full">
          <thead className="text-left text-sm font-normal">
            <tr className="border-b">
              {columns?.map((col: Column) => (
                <th key={col.id} scope="col" className="px-3 py-3 font-bold">
                  {col.name ? (
                    <span className="flex items-center">
                      {col.name}
                      {col.sortable && (
                        <span
                          onClick={() => handleSort(col.id)}
                          className="cursor-pointer p-1 hover:text-gray-100"
                        >
                          <ArrowsUpDownIcon className="w-4" />
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="sr-only">Edit</span>
                  )}
                </th>
              ))}
              <th scope="col" className="relative"></th>
            </tr>
          </thead>
          <tbody className="">
            {filteredItems?.map((item: Expense | Income | Account) => (
              <tr
                key={item.id}
                className="border-b border-gray-700 py-2 text-sm last-of-type:border-none"
              >
                {columns?.map((col: Column) => {
                  return (
                    <td
                      key={`${item.id}${col.name}`}
                      className="py-3 pl-2 pr-2"
                    >
                      {renderCell(item, col.id)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
