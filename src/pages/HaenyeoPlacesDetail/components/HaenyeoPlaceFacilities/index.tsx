import React from 'react';
import { motion } from 'framer-motion';
import { HaenyeoPlaceFacilityType } from '@/api/haenyeoPlaces';

interface Props {
  facilities: HaenyeoPlaceFacilityType[];
}

export const HaenyeoPlaceFacilities = ({ facilities }: Props) => {
  if (!facilities || facilities.length === 0) return null;

  return (
    <motion.div
      className="flex flex-col gap-[1.375rem] border-t border-gray-200 py-4"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.h3
        className="text-sm font-medium"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        편의시설
      </motion.h3>
      <motion.div
        className="flex flex-wrap gap-6"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {facilities.map((facility, index) => (
          <motion.div
            key={`${facility.title}-${index}`}
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <img
              src={facility.iconUrl}
              alt="facility-icon"
              className="size-6"
            />
            <p className="text-sm">{facility.title}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
