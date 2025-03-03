import { motion } from 'framer-motion';
import { HaenyeoPlaceInquiryType } from '@/api/haenyeoPlaces/types';

interface Props {
  inquiries: HaenyeoPlaceInquiryType[];
}

export const HaenyeoPlaceInquiries = ({ inquiries }: Props) => {
  if (!inquiries || inquiries.length === 0) return null;

  return (
    <motion.div
      className="flex flex-col gap-4 border-t border-gray-200 py-4"
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
        문의
      </motion.h3>
      <motion.div
        className="flex flex-wrap gap-4"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {inquiries.map((inquire, index) => (
          <motion.div
            key={`${inquire.title}-${index}`}
            className="flex flex-nowrap items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <img src={inquire.iconUrl} alt="inquire-icon" className="size-6" />
            <a
              className="cursor-pointer text-sm font-medium text-gray-800 hover:text-gray-600"
              href={inquire.content}
            >
              {inquire.content}
            </a>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
