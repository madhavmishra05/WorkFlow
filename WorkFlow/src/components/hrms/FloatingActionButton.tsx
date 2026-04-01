import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, UserPlus, CalendarOff, BarChart3, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const actions = [
  { icon: UserPlus,     label: "Add Employee",      path: "/employees"  },
  { icon: CalendarOff,  label: "Apply Leave",        path: "/leaves"     },
  { icon: BarChart3,    label: "View Reports",       path: "/payroll"    },
  { icon: CalendarCheck,label: "Check Attendance",   path: "/attendance" },
];

export function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    let lastY = window.scrollY;
    const handler = () => {
      setVisible(window.scrollY < lastY || window.scrollY < 50);
      lastY = window.scrollY;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (user?.role === "employee" || !visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && actions.map((a, i) => (
          <motion.button key={a.label}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => { navigate(a.path); setOpen(false); }}
            className="flex items-center gap-2 px-4 py-2 glass rounded-full shadow-lg text-sm font-medium text-foreground hover:bg-primary/10 transition-colors">
            <a.icon className="h-4 w-4 text-primary" />
            {a.label}
          </motion.button>
        ))}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileTap={{ scale: 0.92 }}
        className="h-14 w-14 gradient-primary rounded-full shadow-xl flex items-center justify-center text-primary-foreground">
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <Plus className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </div>
  );
}
