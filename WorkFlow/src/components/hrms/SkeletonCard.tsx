import { motion } from "framer-motion";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <motion.div className={`glass rounded-xl p-6 ${className ?? ""}`}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity }}>
      <div className="h-3 bg-secondary rounded w-1/2 mb-4" />
      <div className="h-8 bg-secondary rounded w-3/4 mb-2" />
      <div className="h-3 bg-secondary rounded w-full" />
    </motion.div>
  );
}
