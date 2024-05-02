'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';
import { clsx } from 'clsx';
import {
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  NoSymbolIcon,
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

function getCategoryDesc(id: string) {
  let categoriesCopy = [...expenseCategories];
  const category = categoriesCopy.find((cat) => cat.id === id);
  return category?.name;
}

function getDescFromAccountType(type: string) {
  let accountCategoriesCopy = [...accountCategories];
  const category = accountCategoriesCopy.find((cat) => cat.id === type);
  return category?.description;
}

export default function DataTable({
  items,
  columns,
  accounts,
  updateHandler,
  deleteHandler,
  setUpdated,
  type,
  pin,
}: {
  items: (Expense | Income | Account | Transfer)[];
  columns: Column[];
  accounts: Account[];
  updateHandler: (
    item: Expense | Income | Account | Transfer,
    type: string,
    pin: string,
  ) => Promise<void>;
  deleteHandler: (id: string, type: string, pin: string) => Promise<void>;
  setUpdated: Dispatch<SetStateAction<boolean>>;
  type: string;
  pin: string;
}) {
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editedLine, setEditedLine] = useState<
    Expense | Income | Account | Transfer | null
  >(null);
  let disable = false;

  if (type === 'account') {
    if (!(editedLine as Account)?.name || !(editedLine as Account)?.type) {
      disable = true;
    }
  }

  if (type === 'income') {
    if (!(editedLine as Income)?.name || !(editedLine as Income)?.account) {
      disable = true;
    }
  }

  if (type === 'expense') {
    if (!(editedLine as Expense)?.name || !(editedLine as Expense)?.account) {
      disable = true;
    }
  }

  if (type === 'transfer') {
    if (
      !(editedLine as Transfer)?.name ||
      !(editedLine as Transfer)?.accountFrom ||
      !(editedLine as Transfer)?.accountTo
    ) {
      disable = true;
    }
  }

  function getDescFromAccount(id: string, accounts: Account[]) {
    let accountsCopy = [...accounts];
    const account = accountsCopy.find((acc) => acc.id === id);
    return account?.name;
  }

  const exitEditing = () => {
    setEditMode(null);
    setEditedLine(null);
  };

  const handleSaveClick = () => {
    updateHandler(
      editedLine as Expense | Income | Account | Transfer,
      type,
      pin,
    );
    setUpdated((old) => !old);
    exitEditing();
  };

  const handleDeleteClick = (id: string) => {
    deleteHandler(id, type, pin);
    setUpdated((old) => !old);
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
            : 'pointer-events-auto rounded-md border p-1 hover:bg-gray-100',
        )}
      >
        <PencilIcon className="w-4" />
      </div>
    );
  }

  function DeleteLine({ id, active }: { id: string; active: boolean }) {
    return (
      <form action={() => handleDeleteClick(id)}>
        <button
          className={clsx(
            editMode || !active
              ? 'pointer-events-none rounded-md border p-1 opacity-40 hover:bg-gray-100'
              : 'rounded-md border p-1 hover:bg-gray-100',
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
              : 'rounded-md border p-1 hover:bg-gray-100',
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
        className="rounded-md border p-1 hover:bg-gray-100"
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
            className="w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
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
            className="w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
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
            className="peer block w-full rounded-md border border-gray-200 text-sm outline-2"
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
            className="w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
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
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
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
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
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
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
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
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
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
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
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
            className="peer block rounded-md border border-gray-200 py-2 text-lg outline-2"
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
        return editMode === item.id ? (
          <input
            type="checkbox"
            className="peer block rounded-md border border-gray-200 py-2 text-lg outline-2"
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
            className="w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
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
              id={item.id}
              active={type === 'account' ? (item as Account).active : true}
            />
          </div>
        );
      default:
        return <></>;
    }
  }

  return (
    <div className="mt-4 rounded-xl bg-white p-2 drop-shadow-md">
      <div className="inline-block min-w-[99%] align-middle">
        <table className="w-full">
          <thead className="text-left text-sm font-normal">
            <tr className="border-b">
              {columns?.map((col: Column) => (
                <th key={col.id} scope="col" className="px-3 py-3 font-bold">
                  {col.name ? col.name : <span className="sr-only">Edit</span>}
                </th>
              ))}
              <th scope="col" className="relative"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {items?.map((item: Expense | Income | Account) => (
              <tr
                key={item.id}
                className="border-b py-2 text-sm last-of-type:border-none"
              >
                {columns?.map((col: Column) => {
                  return (
                    <td
                      key={`${item.id}${col.name}`}
                      className="py-3 pl-3 pr-3"
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
