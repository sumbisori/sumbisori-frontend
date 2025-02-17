import { motion } from 'framer-motion';
import OperationDividerIcon from '@/icons/operation-divider.svg?react';
import { HaenyeoPlaceOperationInfoType } from '@/api/haenyeoPlaces';

interface Props {
  operationInfo: HaenyeoPlaceOperationInfoType[];
}

export const HaenyeoPlaceOperationInfo = ({ operationInfo }: Props) => {
  return (
    <motion.div
      className="flex flex-col gap-9"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {operationInfo.map((operation, index) => (
        <motion.div
          className="flex flex-col gap-1"
          key={`${operation.title}-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="flex flex-nowrap items-center gap-3">
            <img src={operation.iconUrl} alt="icon" className="size-6" />
            <div className="flex flex-nowrap items-center gap-2 text-sm font-medium">
              <p className="whitespace-nowrap">{operation.title}</p>
              <OperationDividerIcon className="shrink-0" />
              <p>{operation.content ? operation.content : '-'}</p>
            </div>
          </div>
          {operation.description && (
            <p className="pl-9 text-sm text-gray-700">
              {operation.description}
            </p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};
