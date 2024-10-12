import { AchievementMetrics } from '@/components/main/Dashboard/AchievementMetrics';
import { CustomCalendar } from '@/components/main/Dashboard/Calendar';
import { CompleteButton } from '@/components/main/Dashboard/CompleteButton';
import { DeleteButton } from '@/components/main/Dashboard/DeleteButton';
import { EditButton } from '@/components/main/Dashboard/EditButton';
import { NiccaMessage } from '@/components/main/Dashboard/NiccaMessage';
import { SaurusImage } from '@/components/main/Dashboard/SaurusImage';

type Props = {
  currentView: 'dashboard';
};

export const Dashboard = ({ currentView }: Props) => {
  const SAURUS_TYPES = ['brachiosaurus', 'triceratops', 'pteranodon', 'tyrannosaurus'];

  return (
    <div className="main-background mx-auto mt-8 max-w-4xl rounded-lg border-2 border-mainColor p-4 sm:p-6 md:p-8">
      <div className="space-y-8">
        <div className="mb-8 flex items-stretch px-2 sm:px-8 md:px-14">
          <div className="mr-6 flex-grow">
            <NiccaMessage className="dashboard-component relative flex h-full items-center bg-yellow-50 bg-opacity-90 p-6" />
          </div>
          <div className="flex flex-col space-y-6">
            <EditButton className="dashboard-component flex-1 bg-green-50 bg-opacity-90" />
            <DeleteButton className="dashboard-component flex-1 bg-red-50 bg-opacity-90" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 sm:px-8 md:px-14">
          <div className="h-full w-full">
            <CustomCalendar className="dashboard-component h-full bg-purple-50 bg-opacity-90" />
          </div>
          <div className="dashboard-component flex h-full flex-col justify-between bg-blue-50 bg-opacity-90 p-6">
            <CompleteButton className="mb-4 w-full transform rounded-lg border-2 border-mainColor bg-green-500 py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl" />
            <div className="flex flex-grow items-center justify-center overflow-hidden">
              <SaurusImage saurusType={SAURUS_TYPES[0]} className="w-full" />
            </div>
            <div className="mt-4 space-y-2 text-center"></div>
          </div>
        </div>
        <div className="mt-8 px-2 sm:px-8 md:px-14">
          <AchievementMetrics className="dashboard-component bg-pink-50 bg-opacity-90" />
        </div>
      </div>
    </div>
  );
};
