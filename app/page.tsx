import Pin from '@/app/ui/homepage/pin';
import PinContextProvider from '@/app/store/PinContextProvider';
import { initialize, pinDefined, definePin, validatePin } from '@/app/lib/auth';

export default async function Page() {
  let defined = false;

  if ((await pinDefined()) === true) {
    defined = true;
  }

  await initialize();

  return (
    <div className="bg-black-800 flex h-[100vh] overflow-hidden">
      <PinContextProvider>
        <Pin
          defined={defined}
          definePin={definePin}
          validatePin={validatePin}
        ></Pin>
      </PinContextProvider>
    </div>
  );
}
