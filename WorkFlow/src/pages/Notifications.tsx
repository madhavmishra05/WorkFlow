import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { notifications } from "@/lib/mock-data";
import { useAuth } from "@/contexts/AuthContext";

const iconMap = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

const colorMap = {
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  info: "text-info bg-info/10",
  error: "text-destructive bg-destructive/10",
};

const notifLeftBorder: Record<string, string> = {
  success: "border-l-4 border-success",
  warning: "border-l-4 border-warning",
  info:    "border-l-4 border-info",
  error:   "border-l-4 border-destructive",
};

const Notifications = () => {
  const { user } = useAuth();
  const filteredNotifs = user?.role === "employee"
    ? notifications.filter(n => n.type === "success" || n.type === "info").slice(0, 2)
    : user?.role === "hr"
      ? notifications.filter(n => n.type === "warning" || n.type === "info")
      : notifications;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Notifications</h1>
        <p className="text-muted-foreground mt-1">Stay updated with the latest alerts.</p>
      </div>
      <div className="space-y-3">
        {filteredNotifs.map((n, i) => {
          const Icon = iconMap[n.type];
          return (
            <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className={`glass rounded-xl p-4 flex items-start gap-4 ${notifLeftBorder[n.type]}`}>
              <div className={`p-2.5 rounded-xl ${colorMap[n.type]}`}><Icon className="h-5 w-5" /></div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">{n.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
              {!n.read && <div className="w-2.5 h-2.5 rounded-full gradient-primary mt-1.5" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
