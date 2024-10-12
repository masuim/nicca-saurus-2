import { CustomCalendar } from "@/components/main/Dashboard/Calendar";
import { CompleteButton } from "@/components/main/Dashboard/CompleteButton";
import { DeleteButton } from "@/components/main/Dashboard/DeleteButton";
import { EditButton } from "@/components/main/Dashboard/EditButton";
import { SaurusImage } from "@/components/main/Dashboard/SaurusImage";

type Props = {
currentView: 'dashboard';
}


export const Dashboard = ({ currentView }: Props) => {

// TODO: Move to schemas
const SAURUS_TYPES = ['brachiosaurus', 'triceratops', 'pteranodon', 'tyrannosaurus'];
return (<div>
    <CustomCalendar />
    <SaurusImage saurusType={SAURUS_TYPES[0]} />
    <CompleteButton className="mt-4" />
    <EditButton className="mt-4" />
    <DeleteButton className="mt-4" />
</div>);
};
