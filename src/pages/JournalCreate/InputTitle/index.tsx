import { motion } from 'framer-motion';
interface Props {
  title: string;
  subtitle: string;
}

export const InputTitle = ({ title, subtitle }: Props) => {
  return (
    <div className="px-4 py-8">
      <div className="flex flex-col">
        <motion.p
          className="text-2xl font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm text-gray-600"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};
