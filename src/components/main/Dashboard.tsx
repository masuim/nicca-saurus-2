import { CustomCalendar } from "@/components/main/Dashboard/Calendar";

type Props = {
  currentView: 'dashboard';
}

export const Dashboard = ({ currentView }: Props) => {
  return (<div><CustomCalendar /></div>);
};

