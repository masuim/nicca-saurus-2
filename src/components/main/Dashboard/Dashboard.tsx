import { AchievementMetrics } from '@/components/main/Dashboard/AchievementMetrics';
import { CustomCalendar } from '@/components/main/Dashboard/Calendar';
import { CompleteButton } from '@/components/main/Dashboard/CompleteButton';
import { NiccaMessage } from '@/components/main/Dashboard/NiccaMessage';
import { SaurusImage } from '@/components/main/Dashboard/SaurusImage';
import { NiccaRegistrationModal } from '@/components/side-menu/NiccaRegistrationModal';

import { useState, useEffect } from 'react';
import { Nicca } from '@/types/nicca';

type Props = {
  nicca: Nicca | null;
  onNiccaRegistration: (newNicca: Nicca) => void;
};

export const Dashboard = ({ nicca, onNiccaRegistration }: Props) => {
  const [showNiccaRegistration, setShowNiccaRegistration] = useState(nicca === null);

  useEffect(() => {
    setShowNiccaRegistration(nicca === null);
  }, [nicca]);

  if (nicca === null) {
    return (
      <NiccaRegistrationModal
        isOpen={true}
        onClose={() => {}}
        onRegistration={onNiccaRegistration}
      />
    );
  }

  return (
    <>
      <div className="sm:main-background xs mx-auto w-[calc(100%-1rem)] max-w-[280px] rounded-lg p-4 xs:w-[calc(100%-2rem)] xs:max-w-[360px] sm:w-full sm:max-w-[640px] sm:border-2 sm:border-mainColor sm:p-6 md:p-8 lg:mt-8 lg:flex lg:h-auto lg:max-w-[720px] lg:flex-col lg:justify-between">
        <div className="mb-8 flex flex-col bg-red-500 sm:flex-row sm:items-start lg:mb-8">
          <div className="mb-4 w-full text-center sm:mb-0 sm:w-1/3">
            <div className="nicca-title">
              <div className="nicca-title-text">
                <h2 className="truncate text-2xl lg:text-3xl">{nicca.title || '日課'}</h2>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-2/3 sm:pl-4">
            <NiccaMessage className="dashboard-component relative flex border-2 border-mainColor p-6 pt-4" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="h-full w-full">
            <CustomCalendar className="dashboard-component h-full w-full bg-gray-50" />
          </div>
          <div className="dashboard-component flex h-full flex-col justify-between border-2 border-mainColor bg-gray-50 p-6">
            <div className="flex flex-grow transform items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110">
              <SaurusImage saurusType={nicca.saurusType || 'デフォルト'} className="w-full" />
            </div>
            <CompleteButton className="mt-4 w-full transform rounded-lg border-2 border-mainColor py-3 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl" />
            <div className="mt-4 space-y-2 text-center"></div>
          </div>
        </div>
      </div>
    </>
  );
};
