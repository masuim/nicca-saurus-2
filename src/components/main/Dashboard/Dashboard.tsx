import { AchievementMetrics } from "@/components/main/Dashboard/AchievementMetrics";
import { CustomCalendar } from "@/components/main/Dashboard/Calendar";
import { CompleteButton } from "@/components/main/Dashboard/CompleteButton";
import { DeleteButton } from "@/components/main/Dashboard/DeleteButton";
import { EditButton } from "@/components/main/Dashboard/EditButton";
import { NiccaMessage } from "@/components/main/Dashboard/NiccaMessage";
import { SaurusImage } from "@/components/main/Dashboard/SaurusImage";

type Props = {
  currentView: 'dashboard';
}

export const Dashboard = ({ currentView }: Props) => {
  const SAURUS_TYPES = ['brachiosaurus', 'triceratops', 'pteranodon', 'tyrannosaurus'];

  return (
    <div className="p-8 mt-8 max-w-4xl mx-auto main-background border-2 border-mainColor rounded-lg">
      <div>
        <div className="flex items-stretch mb-8 px-14">
          <div className="flex-grow mr-6">
            <NiccaMessage
              className="dashboard-component bg-yellow-50 bg-opacity-90 p-6 relative h-full flex items-center" />
          </div>
          <div className="flex flex-col space-y-6">
            <EditButton className="dashboard-component flex-1 bg-green-50 bg-opacity-90" />
            <DeleteButton className="dashboard-component flex-1 bg-red-50 bg-opacity-90" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-14">
          <div className="w-full">
            <CustomCalendar className="dashboard-component bg-purple-50 bg-opacity-90" />
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="dashboard-component bg-blue-50 bg-opacity-90 p-6">
              <CompleteButton
                className="w-full mb-4 text-lg font-bold py-3 bg-green-500 text-white rounded-lg border-2 border-mainColor transition-all duration-300 transform hover:scale-105 hover:shadow-xl" />
              <SaurusImage
                saurusType={SAURUS_TYPES[0]}
                className="mx-auto transition-transform duration-300 hover:scale-110" />
              <div className="mt-4 text-center space-y-2">
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 px-14">
          <AchievementMetrics className="dashboard-component bg-pink-50 bg-opacity-90" />
        </div>
      </div>
    </div>
  );
};
