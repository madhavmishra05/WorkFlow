import { motion } from "framer-motion";
import { Heart, AlertTriangle, TrendingUp, Clock, Calendar, Activity, Shield } from "lucide-react";
import { burnoutData } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";

const riskColors = {
  LOW: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
  MEDIUM: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20" },
  HIGH: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20" },
};

const burnoutCardStyle: Record<string, string> = {
  HIGH:   "border-l-4 border-destructive bg-destructive/5",
  MEDIUM: "border-l-4 border-warning bg-warning/5",
  LOW:    "border-l-4 border-success bg-success/5",
};

const summaryStats = [
  { label: "High Risk", value: burnoutData.filter((d) => d.riskLevel === "HIGH").length, icon: AlertTriangle, gradient: "gradient-danger" },
  { label: "Medium Risk", value: burnoutData.filter((d) => d.riskLevel === "MEDIUM").length, icon: Activity, gradient: "gradient-warning" },
  { label: "Low Risk", value: burnoutData.filter((d) => d.riskLevel === "LOW").length, icon: Shield, gradient: "gradient-success" },
  { label: "Avg Score", value: Math.round(burnoutData.reduce((a, b) => a + b.score, 0) / burnoutData.length), icon: TrendingUp, gradient: "gradient-info" },
];

const BurnoutPredictor = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-3">
          <div className="gradient-danger p-2.5 rounded-xl"><Heart className="h-6 w-6 text-primary-foreground" /></div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Burnout Predictor</h1>
            <p className="text-muted-foreground text-sm">Monitor employee wellness and prevent burnout before it happens</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryStats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-4 flex items-center gap-3">
            <div className={`${stat.gradient} p-2.5 rounded-xl`}><stat.icon className="h-5 w-5 text-primary-foreground" /></div>
            <div><p className="text-2xl font-bold text-foreground">{stat.value}</p><p className="text-xs text-muted-foreground">{stat.label}</p></div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="gradient-primary p-2 rounded-lg"><TrendingUp className="h-5 w-5 text-primary-foreground" /></div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Burnout Scoring Formula</p>
          <p className="text-xs text-muted-foreground font-mono mt-1">Score = (Overtime × 0.4) + (Low Leaves × 0.3) + (Low Mood × 0.3)</p>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="px-3 py-1.5 rounded-full bg-success/10 text-success font-medium">0–44: LOW</span>
          <span className="px-3 py-1.5 rounded-full bg-warning/10 text-warning font-medium">45–69: MEDIUM</span>
          <span className="px-3 py-1.5 rounded-full bg-destructive/10 text-destructive font-medium">70–100: HIGH</span>
        </div>
      </motion.div>

      <div className="space-y-3">
        {burnoutData.map((emp, i) => {
          const rc = riskColors[emp.riskLevel];
          return (
            <motion.div key={emp.employeeId} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
              className={`glass rounded-xl p-5 ${burnoutCardStyle[emp.riskLevel]}`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <img src={emp.avatar} alt={emp.employeeName} className="h-11 w-11 rounded-full ring-2 ring-primary/20" />
                <div className="flex-1 min-w-0 space-y-2 w-full">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-foreground">{emp.employeeName}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{emp.department}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${rc.bg} ${rc.text}`}>{emp.riskLevel} RISK</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-3.5 w-3.5" /><span>OT: {emp.overtimeHours}h</span></div>
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Calendar className="h-3.5 w-3.5" /><span>Leaves: {emp.leavesTaken}</span></div>
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Activity className="h-3.5 w-3.5" /><span>Mood: {emp.moodScore}/5</span></div>
                    <div className="flex items-center gap-1.5 text-muted-foreground"><AlertTriangle className="h-3.5 w-3.5" /><span>{emp.factors[0]}</span></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={emp.score} className="h-2 flex-1" />
                    <span className={`text-sm font-bold ${rc.text} min-w-[2rem] text-right`}>{emp.score}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BurnoutPredictor;
