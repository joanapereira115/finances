import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function EmptyData() {
  return (
    <div className="bg-black-600 w-full flex h-full flex-row items-center justify-center rounded-xl p-2 drop-shadow-md">
      <ExclamationCircleIcon className="pointer-events-none mr-2 h-[24px] w-[24px] text-red-500" />
      <p className="text-white">Não foi encontrada informação.</p>
    </div>
  );
}
