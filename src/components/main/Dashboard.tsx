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

// TODO: Move to schemas
const SAURUS_TYPES = ['brachiosaurus', 'triceratops', 'pteranodon', 'tyrannosaurus'];

return (
<div className="p-8 mt-8 max-w-4xl mx-auto bg-yellow-200 border-2 border-black">
    <div className="flex items-stretch mb-8">
        <div className="flex-grow mr-6">
            <NiccaMessage
                className="bg-white p-6 rounded-none border-2 border-black relative h-full flex items-center" />
        </div>
        <div className="flex flex-col space-y-6">
            <EditButton className="flex-1 border-2 border-black" />
            <DeleteButton className="flex-1 border-2 border-black" />
        </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            <CustomCalendar />
        </div>
        <div className="space-y-8">
            <div className="bg-blue-300 rounded-none border-2 border-black p-6">
                <CompleteButton
                    className="w-full mb-4 text-lg font-bold py-3 bg-green-500 text-white rounded-lg border-2 border-black transition-all duration-300 transform hover:scale-105 hover:shadow-xl" />
                <SaurusImage
                    saurusType={SAURUS_TYPES[0]}
                    className="mx-auto transition-transform duration-300 hover:scale-110" />
                <div className="mt-4 text-center space-y-2">
                </div>
            </div>
            <AchievementMetrics />
        </div>
    </div>
</div>
);
};
