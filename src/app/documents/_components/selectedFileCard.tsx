import { FileTextIcon, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SelectedFileCardProps {
  fileName: string;
  fileSize: number;
  showRemoveButton?: boolean;
  onRemoveClick?: () => void;
}

export default function SelectedFileCard({
  fileName,
  fileSize,
  showRemoveButton = false,
  onRemoveClick,
}: SelectedFileCardProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full p-4 border rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:border-gray-600">
      <div className="flex items-center mb-2 md:mb-0">
        <div className="mr-4">
          <FileTextIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </div>
        <div className='break-words truncate'>
          <p className="text-sm w-48 font-medium text-gray-900 dark:text-gray-100">
            {fileName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {Math.round(fileSize / 1024)} KB
          </p>
        </div>
      </div>
      {showRemoveButton && onRemoveClick && (
        <Button
          variant="outline"
          size="icon"
          title="Remover"
          onClick={onRemoveClick}
          className="ml-0 md:ml-2 w-full"
        >
          <XCircle className="w-6 h-6 text-red-500" />
        </Button>
      )}
    </div>
  );
}
