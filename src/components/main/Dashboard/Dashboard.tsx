import { AchievementMetrics } from '@/components/main/Dashboard/AchievementMetrics';
import { CustomCalendar } from '@/components/main/Dashboard/Calendar';
import { CompleteButton } from '@/components/main/Dashboard/CompleteButton';
import { NiccaMessage } from '@/components/main/Dashboard/NiccaMessage';
import { SaurusImage } from '@/components/main/Dashboard/SaurusImage';

type Props = {
  currentView: 'dashboard';
};

export const Dashboard = ({ currentView }: Props) => {
  const SAURUS_TYPES = ['brachiosaurus', 'triceratops', 'pteranodon', 'tyrannosaurus'];

  return (
    <div className="sm:main-background xs mx-auto mt-4 w-[calc(100%-1rem)] max-w-[280px] rounded-lg p-4 xs:w-[calc(100%-2rem)] xs:max-w-[360px] sm:w-full sm:max-w-[640px] sm:border-2 sm:border-mainColor sm:p-6 md:p-8 lg:mt-8 lg:max-w-[720px]">
      <div className="mb-8">
        <NiccaMessage className="dashboard-component relative flex h-full items-center border-2 border-mainColor bg-gray-50 p-6" />
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="h-full w-full">
          <CustomCalendar className="dashboard-component h-full w-full bg-gray-50" />
        </div>
        <div className="dashboard-component flex h-full flex-col justify-between border-2 border-mainColor bg-gray-50 p-6">
          <CompleteButton className="mb-4 w-full transform rounded-lg border-2 border-mainColor py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl" />
          <div className="flex flex-grow transform items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <SaurusImage saurusType={SAURUS_TYPES[0]} className="w-full" />
          </div>
          <div className="mt-4 space-y-2 text-center"></div>
        </div>
      </div>
      <div className="mt-8">
        <AchievementMetrics className="dashboard-component bg-gray-50" />
      </div>
    </div>
  );
};
