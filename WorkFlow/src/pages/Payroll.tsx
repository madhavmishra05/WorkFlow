import { motion } from "framer-motion";
import { DollarSign, Download, FileText, TrendingUp } from "lucide-react";
import { employees } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const salaryData = [
  { month: "Jan", total: 385000 },
  { month: "Feb", total: 392000 },
  { month: "Mar", total: 425000 },
  { month: "Apr", total: 418000 },
  { month: "May", total: 430000 },
  { month: "Jun", total: 445000 },
];

const Payroll = () => {
  const totalPayroll = employees.reduce((sum, e) => sum + e.salary, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Payroll</h1>
          <p className="text-muted-foreground mt-1">Manage salary and generate payslips.</p>
        </div>
        <button className="gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Payroll", value: `$${totalPayroll.toLocaleString()}`, icon: DollarSign, gradient: "gradient-primary" },
          { label: "Avg Salary", value: `$${Math.round(totalPayroll / employees.length).toLocaleString()}`, icon: TrendingUp, gradient: "gradient-success" },
          { label: "Payslips Generated", value: employees.length, icon: FileText, gradient: "gradient-info" },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5 flex items-center gap-4">
            <div className={`${item.gradient} p-3 rounded-xl text-primary-foreground`}><item.icon className="h-6 w-6" /></div>
            <div><p className="text-sm text-muted-foreground">{item.label}</p><p className="text-2xl font-bold text-foreground">{item.value}</p></div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Monthly Payroll Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salaryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", color: "hsl(var(--foreground))" }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Total"]} />
            <Bar dataKey="total" fill="hsl(243, 75%, 59%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Employee", "Department", "Role", "Salary", "Status", "Payslip"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4"><div className="flex items-center gap-3"><img src={emp.avatar} alt="" className="h-8 w-8 rounded-lg object-cover" /><span className="text-sm font-medium text-foreground">{emp.name}</span></div></td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{emp.department}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{emp.role}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">${emp.salary.toLocaleString()}</td>
                  <td className="px-6 py-4"><span className="text-xs font-medium px-2.5 py-1 rounded-full bg-success/10 text-success">Paid</span></td>
                  <td className="px-6 py-4"><button className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"><Download className="h-3.5 w-3.5" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Payroll;
