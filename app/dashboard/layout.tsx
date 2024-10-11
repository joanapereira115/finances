import PinContextProvider from '@/app/store/PinContextProvider';
import YearContextProvider from '@/app/store/YearContextProvider';
import TopBar from '@/app/ui/dashboard/TopBar';
import SideNav from '@/app/ui/dashboard/SideNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PinContextProvider>
      <YearContextProvider>
        <div className="flex h-[100vh] w-full flex-row overflow-hidden">
          <SideNav />
          <div className="flex h-full w-full flex-col">
            <TopBar />
            <div className="bg-black-800 flex h-full w-full flex-col mt-[100px]">
              {children}
            </div>
          </div>
        </div>
      </YearContextProvider>
    </PinContextProvider>
  );
}
