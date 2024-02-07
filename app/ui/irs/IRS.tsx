import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import IRSData from '@/app/ui/irs/IRSData';
import { IRSDef } from '@/app/lib/definitions';

export default function IRS({ irsData }: { irsData: IRSDef }) {
  if (!irsData) {
    return (
      <div className="mt-4 flex h-full flex-row items-center justify-center rounded-xl bg-white p-2 drop-shadow-md">
        <ExclamationCircleIcon className="pointer-events-none mr-2 h-[24px] w-[24px] text-red-500" />
        <p className="text-gray-400">Não foi encontrada informação.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 justify-center">
      <IRSData irsData={irsData} />
    </div>
  );
}
