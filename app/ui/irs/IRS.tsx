import IRSData from '@/app/ui/irs/IRSData';
import { IRSDef } from '@/app/lib/definitions';
import EmptyData from '../ui/EmptyData';

export default function IRS({ irsData }: { irsData: IRSDef }) {
  if (!irsData) {
    return <EmptyData />;
  }

  return (
    <div className="justify-center">
      <IRSData irsData={irsData} />
    </div>
  );
}
