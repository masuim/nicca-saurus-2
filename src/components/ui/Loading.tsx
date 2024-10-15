import { Loader2 } from 'lucide-react';

export const Loading = () => {
  // TODO: まだ時間のかかる非同期処理がないので、一度も表示できていない。
  console.log('Loading');
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-mainColor" />
    </div>
  );
};
