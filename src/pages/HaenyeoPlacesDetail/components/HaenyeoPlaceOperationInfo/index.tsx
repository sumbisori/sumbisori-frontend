import { motion } from 'framer-motion';
import OperationDividerIcon from '@/icons/operation-divider.svg?react';
import { HaenyeoPlaceOperationInfoType } from '@/api/haenyeoPlaces/types';

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
          <div className="grid grid-cols-[auto,1fr] gap-2 text-sm font-medium">
            {/* 첫 행 */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-3">
                  <img src={operation.iconUrl} alt="icon" className="size-6" />
                  <p className="whitespace-nowrap">{operation.title}</p>
                </div>
                <OperationDividerIcon className="shrink-0" />
              </div>
            </div>
            <p className="pt-0.5">
              {operation.content ? operation.content : '-'}
            </p>
            {/* 두 번째 행: description은 content의 시작 지점에 위치 */}
            {operation.description && (
              <div className="col-start-2">
                <p className="whitespace-pre-wrap text-sm text-gray-700">
                  {operation.description}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
