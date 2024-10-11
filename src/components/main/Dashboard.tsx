import { CustomCalendar } from "@/components/main/Dashboard/Calendar";
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
    </div>);
};

