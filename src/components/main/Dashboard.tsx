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
<div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
    <div className="flex items-stretch">
        <div className="flex-grow mr-2">
            <NiccaMessage className="bg-yellow-100 p-4 rounded-lg shadow relative h-full flex items-center" />
        </div>
        <div className="flex flex-col space-y-2">
            <EditButton className="flex-1" />
            <DeleteButton className="flex-1" />
        </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
            <CustomCalendar />

        </div>
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-inner">
                <CompleteButton className="flex-1" />
                <SaurusImage saurusType={SAURUS_TYPES[0]} className="mx-auto" />
            </div>

        </div>
    </div>
</div>
);
};
