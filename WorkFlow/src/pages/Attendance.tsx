import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, XCircle, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { attendanceRecords } from "@/lib/mock-data";

const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const generateAttendance = (days: number) => {
  const statuses = ["present", "present", "present", "present", "late", "absent", "half-day"];
  return Array.from({ length: days }, () => statuses[Math.floor(Math.random() * statuses.length)]);
};

const Attendance = () => {
  const { user } = useAuth();
  const isEmployee = user?.role === "employee";
  const EMPLOYEE_ID = "1";

  const [currentMonth, setCurrentMonth] = useState(2);
  const [currentYear] = useState(2026);
  const days = daysInMonth(currentMonth, currentYear);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const attendance = generateAttendance(days);

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const displayRecords = isEmployee
    ? attendanceRecords.filter(r => r.employeeId === EMPLOYEE_ID)
    : attendanceRecords;

  const statusColor: Record<string, string> = {
    present: "bg-success/25 border border-success/40 hover:bg-success/40 hover:shadow-[0_0_8px_hsl(var(--success)/0.4)] hover:scale-110 transition-all cursor-pointer",
    late: "bg-warning/25 border border-warning/40 hover:bg-warning/40 hover:shadow-[0_0_8px_hsl(var(--warning)/0.4)] hover:scale-110 transition-all cursor-pointer",
    absent: "bg-destructive/25 border border-destructive/40 hover:bg-destructive/40 hover:shadow-[0_0_8px_hsl(var(--destructive)/0.4)] hover:scale-110 transition-all cursor-pointer",
    "half-day": "bg-info/25 border border-info/40 hover:bg-info/40 hover:shadow-[0_0_8px_hsl(var(--info)/0.4)] hover:scale-110 transition-all cursor-pointer",
  };

  const summary = {
    present: attendance.filter((s) => s === "present").length,
    late: attendance.filter((s) => s === "late").length,
    absent: attendance.filter((s) => s === "absent").length,
    halfDay: attendance.filter((s) => s === "half-day").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{isEmployee ? "My Attendance" : "Attendance"}</h1>
        <p className="text-muted-foreground mt-1">Track daily attendance and patterns.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Present", value: summary.present, icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
          { label: "Late", value: summary.late, icon: Clock, color: "text-warning", bg: "bg-warning/10" },
          { label: "Absent", value: summary.absent, icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Half Day", value: summary.halfDay, icon: AlertTriangle, color: "text-info", bg: "bg-info/10" },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-4 flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${item.bg}`}><item.icon className={`h-5 w-5 ${item.color}`} /></div>
            <div><p className="text-2xl font-bold text-foreground">{item.value}</p><p className="text-xs text-muted-foreground">{item.label}</p></div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setCurrentMonth((m) => Math.max(0, m - 1))} className="p-2 hover:bg-secondary rounded-lg"><ChevronLeft className="h-5 w-5 text-muted-foreground" /></button>
          <h2 className="text-lg font-semibold text-foreground">{monthNames[currentMonth]} {currentYear}</h2>
          <button onClick={() => setCurrentMonth((m) => Math.min(11, m + 1))} className="p-2 hover:bg-secondary rounded-lg"><ChevronRight className="h-5 w-5 text-muted-foreground" /></button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {dayNames.map((d) => (<div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>))}
          {Array.from({ length: firstDay }).map((_, i) => (<div key={`empty-${i}`} />))}
          {attendance.map((status, i) => (
            <div key={i} className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium ${statusColor[status]}`}>{i + 1}</div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-border">
          {Object.entries({ present: "bg-success/25", late: "bg-warning/25", absent: "bg-destructive/25", "half-day": "bg-info/25" }).map(([status, cls]) => (
            <div key={status} className="flex items-center gap-2 text-xs">
              <div className={`w-3 h-3 rounded ${cls}`} />
              <span className="text-muted-foreground capitalize">{status.replace("-", " ")}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Attendance;
