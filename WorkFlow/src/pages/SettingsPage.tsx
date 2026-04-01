import { motion } from "framer-motion";
import { User, Moon, Sun, Shield, Bell } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const isEmployee = user?.role === "employee";

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your preferences.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3"><User className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold text-foreground">Profile</h2></div>
        <div className="flex items-center gap-4">
          <img src={user?.avatar ?? "https://i.pravatar.cc/150?img=12"} alt="" className="h-16 w-16 rounded-xl object-cover" />
          <div><p className="font-semibold text-foreground">{user?.userName ?? "User"}</p><p className="text-sm text-muted-foreground">{user?.email ?? ""}</p></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Full Name</label>
            <input className="w-full mt-1 px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm outline-none border border-border" defaultValue={user?.userName ?? ""} readOnly={isEmployee} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <input className="w-full mt-1 px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm outline-none border border-border" defaultValue={user?.email ?? ""} readOnly />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Phone</label>
            <input className="w-full mt-1 px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm outline-none border border-border" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Role</label>
            <input className="w-full mt-1 px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm outline-none border border-border" defaultValue={user?.role ?? ""} readOnly />
          </div>
        </div>
        <button className="gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium">Save Changes</button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === "dark" ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
            <div><h2 className="text-lg font-semibold text-foreground">Theme</h2><p className="text-sm text-muted-foreground">Currently using {theme} mode</p></div>
          </div>
          <button onClick={toggleTheme} className="px-4 py-2 rounded-xl bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
            Switch to {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </motion.div>

      {!isEmployee && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-3"><Bell className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold text-foreground">Notifications</h2></div>
          {["Email Notifications", "Leave Alerts", "Payroll Updates", "Attendance Reminders"].map((item) => (
            <div key={item} className="flex items-center justify-between py-2">
              <span className="text-sm text-foreground">{item}</span>
              <button className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-primary-foreground rounded-full transition-all" />
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SettingsPage;
