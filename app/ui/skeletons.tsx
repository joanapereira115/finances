// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent';

export function MonthlyBalanceSkeleton() {
  return (
    <div
      className={`${shimmer} bg-black-600 relative ml-4 flex h-[62vh] flex-col items-center overflow-hidden rounded-xl p-4 drop-shadow-md`}
    >
      <div className="bg-black-800 grid h-full w-full grid-cols-12 items-end gap-2 rounded-md p-4" />
    </div>
  );
}

export function BalancesSkeleton() {
  return (
    <div className="mx-4 flex h-[20vh] flex-row justify-between gap-4">
      <div
        className={`${shimmer} bg-black-600 relative h-full w-[20%] overflow-y-auto overflow-x-hidden rounded-xl drop-shadow-md`}
      >
        <div className="flex h-full items-center justify-center">
          <div className="border-black-800 h-32 w-32 rounded-full border-[17px]"></div>
        </div>
      </div>
      <div
        className={`${shimmer} bg-black-600 relative h-full w-[20%] overflow-y-auto overflow-x-hidden rounded-xl drop-shadow-md `}
      ></div>
      <div
        className={`${shimmer} bg-black-600 relative h-full w-[20%] overflow-y-auto overflow-x-hidden rounded-xl drop-shadow-md `}
      ></div>
      <div
        className={`${shimmer} bg-black-600 relative h-full w-[20%] overflow-y-auto overflow-x-hidden rounded-xl drop-shadow-md `}
      ></div>
      <div
        className={`${shimmer} bg-black-600 relative h-full w-[20%] overflow-y-auto overflow-x-hidden rounded-xl drop-shadow-md `}
      ></div>
    </div>
  );
}

export function AccountSkeleton() {
  return (
    <div className="flex flex-row items-center justify-center p-2">
      <div className="flex w-full items-center">
        <div className="bg-black-800 mr-8 h-[40px] w-[40px] rounded-full" />
        <div>
          <div className="bg-black-800 m-2 h-4 w-40 rounded-md" />
          <div className="bg-black-800 m-2 h-4 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function AccountsBalanceSkeleton() {
  return (
    <div
      className={`${shimmer} bg-black-600 relative mr-4 flex h-[62vh] flex-col justify-between overflow-hidden rounded-xl p-4`}
    >
      {[...Array(6)].map((_, i) => (
        <AccountSkeleton key={`account${i}`} />
      ))}
    </div>
  );
}

let expensesColumns = [
  { id: 'name', name: 'Descrição' },
  { id: 'date', name: 'Data' },
  { id: 'value', name: 'Valor' },
  { id: 'account', name: 'Conta' },
  { id: 'category', name: 'Categoria' },
  { id: 'nif', name: 'Fatura?' },
  { id: 'iva', name: 'IRS' },
  { id: 'actions', name: '' },
];

let incomeColumns = [
  { id: 'name', name: 'Descrição' },
  { id: 'date', name: 'Data' },
  { id: 'value', name: 'Valor' },
  { id: 'account', name: 'Conta' },
  { id: 'actions', name: '' },
];

let transferColumns = [
  { id: 'name', name: 'Descrição' },
  { id: 'date', name: 'Data' },
  { id: 'value', name: 'Valor' },
  { id: 'accountFrom', name: 'Da conta' },
  { id: 'accountTo', name: 'Para a conta' },
  { id: 'actions', name: '' },
];

let accountsColumns = [
  { id: 'name', name: 'Descrição' },
  { id: 'balance', name: 'Valor' },
  { id: 'type', name: 'Tipo' },
  { id: 'active', name: 'Ativa' },
  { id: 'actions', name: '' },
];

export function ExpenseTableRowSkeleton() {
  return (
    <tr className="mt-2 border-b border-gray-500 last-of-type:border-none">
      {[...Array(7)].map((_, i) => (
        <td key={`expenseRow${i}`} className="whitespace-nowrap px-3 py-3">
          <div className="bg-black-800 w-30 h-6 rounded"></div>
        </td>
      ))}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="bg-black-800 h-6 w-6 rounded"></div>
          <div className="bg-black-800 h-6 w-6 rounded"></div>
        </div>
      </td>
    </tr>
  );
}

export function ExpensesTableSkeleton() {
  return (
    <div
      className={`${shimmer} bg-black-600 relative overflow-hidden rounded-xl p-2`}
    >
      <div className="inline-block min-w-[99%] align-middle">
        <table className="w-full">
          <thead className="text-left text-sm font-normal text-white">
            <tr className="border-b">
              {expensesColumns?.map((col) => (
                <th key={col.id} className="px-3 py-3 font-bold">
                  {col.name ? col.name : <span className="sr-only">Edit</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full align-middle">
            {[...Array(10)].map((_, i) => (
              <ExpenseTableRowSkeleton key={`expense${i}`} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function IncomeTableRowSkeleton() {
  return (
    <tr className="mt-2 border-b border-gray-500 last-of-type:border-none">
      {[...Array(4)].map((_, i) => (
        <td className="whitespace-nowrap px-3 py-3" key={`incomeRow${i}`}>
          <div className="bg-black-800 h-6 w-32 rounded"></div>
        </td>
      ))}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="bg-black-800 h-6 w-6 rounded"></div>
          <div className="bg-black-800 h-6 w-6 rounded"></div>
        </div>
      </td>
    </tr>
  );
}

export function IncomeTableSkeleton() {
  return (
    <div
      className={`${shimmer} bg-black-600 relative overflow-hidden rounded-xl p-2`}
    >
      <div className="inline-block min-w-[99%] align-middle">
        <table className="w-full">
          <thead className="text-left text-sm font-normal text-white">
            <tr className="border-b">
              {incomeColumns?.map((col) => (
                <th key={col.id} className="px-3 py-3 font-bold">
                  {col.name ? col.name : <span className="sr-only">Edit</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full align-middle">
            {[...Array(10)].map((_, i) => (
              <IncomeTableRowSkeleton key={`income${i}`} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TransferTableRowSkeleton() {
  return (
    <tr className="mt-2 border-b border-gray-500 last-of-type:border-none">
      {[...Array(5)].map((_, i) => (
        <td className="whitespace-nowrap px-3 py-3" key={`transferRow${i}`}>
          <div className="bg-black-800 h-6 w-32 rounded"></div>
        </td>
      ))}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="bg-black-800 h-6 w-6 rounded"></div>
          <div className="bg-black-800 h-6 w-6 rounded"></div>
        </div>
      </td>
    </tr>
  );
}

export function TransferTableSkeleton() {
  return (
    <div
      className={`${shimmer} bg-black-600 relative overflow-hidden rounded-xl p-2`}
    >
      <div className="inline-block min-w-[99%] align-middle">
        <table className="w-full">
          <thead className="text-left text-sm font-normal text-white">
            <tr className="border-b">
              {transferColumns?.map((col) => (
                <th key={col.id} className="px-3 py-3 font-bold">
                  {col.name ? col.name : <span className="sr-only">Edit</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full align-middle">
            {[...Array(10)].map((_, i) => (
              <TransferTableRowSkeleton key={`transfer${i}`} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AccountTableRowSkeleton() {
  return (
    <tr className="mt-2 border-b border-gray-500 last-of-type:border-none">
      {[...Array(4)].map((_, i) => (
        <td className="whitespace-nowrap px-3 py-3" key={`accountRow${i}`}>
          <div className="bg-black-800 h-6 w-32 rounded"></div>
        </td>
      ))}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="bg-black-800 h-6 w-6 rounded"></div>
          <div className="bg-black-800 h-6 w-6 rounded"></div>
        </div>
      </td>
    </tr>
  );
}

export function AccountsTableSkeleton() {
  return (
    <div
      className={`${shimmer} bg-black-600 relative overflow-hidden rounded-xl p-2`}
    >
      <div className="inline-block min-w-[99%] align-middle">
        <table className="w-full">
          <thead className="text-left text-sm font-normal text-white">
            <tr className="border-b">
              {accountsColumns?.map((col) => (
                <th key={col.id} className="px-3 py-3 font-bold">
                  {col.name ? col.name : <span className="sr-only">Edit</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full align-middle">
            {[...Array(10)].map((_, i) => (
              <AccountTableRowSkeleton key={`account${i}`} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------- */

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
