
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export const EditButton = ({ className }: { className?: string }) => {
  const handleEdit = () => {
    alert('編集Clicked!!');
  };

  return (
    <Button
      onClick={handleEdit}
      variant="outline"
      className={`flex flex-1 items-center justify-center bg-transparent text-primary xs:min-w-[48px] ${className}`}
    >
      <Edit size={16} />
    </Button>
  );
};
