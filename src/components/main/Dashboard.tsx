type Props = {
  currentView: 'dashboard';
}

export const Dashboard = ({ currentView }: Props) => {
  return <div>{currentView}</div>;
};

