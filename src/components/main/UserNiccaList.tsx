import { ViewProps } from '@/types/views';

type Props = ViewProps & {
  currentView: Extract<ViewProps['currentView'], 'niccaList'>;
};

export const UserNiccaList = ({ currentView }: Props) => {
  return <div>{currentView}</div>;
};
