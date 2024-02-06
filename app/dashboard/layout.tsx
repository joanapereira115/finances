import PinContextProvider from '@/app/store/PinContextProvider';
import YearContextProvider from '@/app/store/YearContextProvider';
import TopBar from '@/app/ui/dashboard/TopBar';
import SideNav from '@/app/ui/dashboard/SideNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PinContextProvider>
      <YearContextProvider>
        <div className="flex h-[100vh] w-full flex-col overflow-hidden">
          <TopBar />
          <div className="flex flex-grow">
            <SideNav />
            <div className="w-full">{children}</div>
          </div>
        </div>
      </YearContextProvider>
    </PinContextProvider>
  );
}
