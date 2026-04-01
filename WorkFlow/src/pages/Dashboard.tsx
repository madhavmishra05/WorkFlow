import { useState, useEffect } from "react";
import { Users, CalendarCheck, CalendarOff, DollarSign, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";
import StatsCard from "@/components/hrms/StatsCard";
import { SkeletonCard } from "@/components/hrms/SkeletonCard";
import { employees, leaveRequests, monthlyData, departmentData, leaveBalances, attendanceRecords } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Employees", value: employees.length, change: "+12% from last month", changeType: "positive" as const, icon: Users, gradient: "gradient-primary", borderColor: "border-primary", bgTint: "bg-primary/5" },
    { title: "Attendance Rate", value: "96.5%", change: "+2.1% from last week", changeType: "positive" as const, icon: CalendarCheck, gradient: "gradient-success", borderColor: "border-success", bgTint: "bg-success/5" },
    { title: "Pending Leaves", value: leaveRequests.filter((l) => l.status === "pending").length, change: "3 new requests", changeType: "neutral" as const, icon: CalendarOff, gradient: "gradient-warning", borderColor: "border-warning", bgTint: "bg-warning/5" },
    { title: "Payroll (Mar)", value: "$425K", change: "+5% from Feb", changeType: "positive" as const, icon: DollarSign, gradient: "gradient-info", borderColor: "border-info", bgTint: "bg-info/5" },
  ];

  const recentActivity = [
    { action: "Sarah Johnson checked in", time: "9:02 AM", icon: Clock, color: "text-success" },
    { action: "Leave approved for James Rodriguez", time: "8:45 AM", icon: CalendarCheck, color: "text-info" },
    { action: "New employee onboarded", time: "Yesterday", icon: Users, color: "text-primary" },
    { action: "March payroll processed", time: "Yesterday", icon: DollarSign, color: "text-warning" },
    { action: "Attendance report generated", time: "2 days ago", icon: TrendingUp, color: "text-accent" },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">WorkFlow <span className="text-gradient">Dashboard</span></h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your smart HR overview.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatsCard key={stat.title} {...stat} delay={i * 0.1} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Employee & Attendance Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", color: "hsl(var(--foreground))" }} />
              <Bar dataKey="employees" fill="hsl(243, 75%, 59%)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="attendance" fill="hsl(262, 83%, 58%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Department Distribution</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={4} dataKey="value">
                {departmentData.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", color: "hsl(var(--foreground))" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {departmentData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.fill }} />{d.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary"><activity.icon className={`h-4 w-4 ${activity.color}`} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Leave Requests</h2>
          <div className="space-y-3">
            {leaveRequests.map((leave) => {
              const leaveRowClass: Record<string, string> = {
                pending: "border-l-4 border-warning bg-warning/5",
                approved: "border-l-4 border-success bg-success/5",
                rejected: "border-l-4 border-destructive bg-destructive/5",
              };
              return (
                <div key={leave.id} className={`flex items-center justify-between p-3 rounded-lg ${leaveRowClass[leave.status]}`}>
                  <div>
                    <p className="text-sm font-medium text-foreground">{leave.employeeName}</p>
                    <p className="text-xs text-muted-foreground">{leave.type} · {leave.startDate}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    leave.status === "approved" ? "bg-success/10 text-success" :
                    leave.status === "rejected" ? "bg-destructive/10 text-destructive" :
                    "bg-warning/10 text-warning"
                  }`}>{leave.status}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const HRDashboard = () => {
  const totalEmployees = employees.length;
  const presentToday = attendanceRecords.filter(r => r.date === "2026-03-03" && r.status === "present").length;
  const totalToday = attendanceRecords.filter(r => r.date === "2026-03-03").length;
  const pendingLeaves = leaveRequests.filter(l => l.status === "pending").length;
  const activeEmps = employees.filter(e => e.status === "active").length;

  const recentJoiners = [...employees].sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()).slice(0, 3);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">HR <span className="text-gradient">Dashboard</span></h1>
        <p className="text-muted-foreground mt-1">Manage your team effectively.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Employees" value={totalEmployees} icon={Users} gradient="gradient-primary" borderColor="border-primary" bgTint="bg-primary/5" />
        <StatsCard title="Today Attendance" value={`${presentToday}/${totalToday}`} icon={CalendarCheck} gradient="gradient-success" borderColor="border-success" bgTint="bg-success/5" />
        <StatsCard title="Pending Leaves" value={pendingLeaves} icon={CalendarOff} gradient="gradient-warning" borderColor="border-warning" bgTint="bg-warning/5" />
        <StatsCard title="Active Employees" value={activeEmps} icon={Users} gradient="gradient-info" borderColor="border-info" bgTint="bg-info/5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Today Attendance Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Present</span><span className="text-foreground font-semibold">{presentToday}/{totalToday} ({totalToday > 0 ? Math.round(presentToday/totalToday*100) : 0}%)</span></div>
            <Progress value={totalToday > 0 ? (presentToday/totalToday)*100 : 0} className="h-3" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Joiners</h2>
          <div className="space-y-3">
            {recentJoiners.map(emp => (
              <div key={emp.id} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                <img src={emp.avatar} alt={emp.name} className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">{emp.role} · {emp.joinDate}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const EmployeeDashboard = () => {
  const myBalance = leaveBalances.find(b => b.employeeId === "1");
  const myLeaves = leaveRequests.filter(l => l.employeeId === "1");
  const myAttendance = attendanceRecords.filter(r => r.employeeId === "1");
  const presentCount = myAttendance.filter(r => r.status === "present").length;
  const attendanceRate = myAttendance.length > 0 ? Math.round((presentCount / myAttendance.length) * 100) : 0;
  const pendingCount = myLeaves.filter(l => l.status === "pending").length;

  const balanceBars = myBalance ? [
    { label: "Vacation", used: myBalance.vacation.used, total: myBalance.vacation.total, color: "gradient-primary" },
    { label: "Sick", used: myBalance.sick.used, total: myBalance.sick.total, color: "gradient-success" },
    { label: "Personal", used: myBalance.personal.used, total: myBalance.personal.total, color: "gradient-warning" },
  ] : [];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">My <span className="text-gradient">Dashboard</span></h1>
        <p className="text-muted-foreground mt-1">Welcome back, Sarah!</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Attendance This Month" value={`${attendanceRate}%`} icon={CalendarCheck} gradient="gradient-success" borderColor="border-success" bgTint="bg-success/5" />
        <StatsCard title="Leave Balance" value={myBalance ? `${myBalance.vacation.total - myBalance.vacation.used + myBalance.sick.total - myBalance.sick.used + myBalance.personal.total - myBalance.personal.used} days` : "N/A"} icon={CalendarOff} gradient="gradient-primary" borderColor="border-primary" bgTint="bg-primary/5" />
        <StatsCard title="Pending Requests" value={pendingCount} icon={Clock} gradient="gradient-warning" borderColor="border-warning" bgTint="bg-warning/5" />
        <StatsCard title="My Salary" value="$95,000" icon={DollarSign} gradient="gradient-info" borderColor="border-info" bgTint="bg-info/5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">My Leave Balance</h2>
          <div className="space-y-4">
            {balanceBars.map(b => (
              <div key={b.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{b.label}</span>
                  <span className="text-foreground font-medium">{b.used}/{b.total}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${b.color} rounded-full`} style={{ width: `${(b.used / b.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">My Leave History</h2>
          <div className="space-y-3">
            {myLeaves.map(leave => {
              const leaveRowClass: Record<string, string> = {
                pending: "border-l-4 border-warning bg-warning/5",
                approved: "border-l-4 border-success bg-success/5",
                rejected: "border-l-4 border-destructive bg-destructive/5",
              };
              return (
                <div key={leave.id} className={`flex items-center justify-between p-3 rounded-lg ${leaveRowClass[leave.status]}`}>
                  <div>
                    <p className="text-sm font-medium text-foreground">{leave.type}</p>
                    <p className="text-xs text-muted-foreground">{leave.startDate} → {leave.endDate}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    leave.status === "approved" ? "bg-success/10 text-success" :
                    leave.status === "rejected" ? "bg-destructive/10 text-destructive" :
                    "bg-warning/10 text-warning"
                  }`}>{leave.status}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({length:4}).map((_,i) => <SkeletonCard key={i} />)}
    </div>
  );

  if (user?.role === "admin") return <AdminDashboard />;
  if (user?.role === "hr") return <HRDashboard />;
  return <EmployeeDashboard />;
};

export default Dashboard;
