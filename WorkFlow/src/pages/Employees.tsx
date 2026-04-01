import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Mail, Phone, X } from "lucide-react";
import { employees, Employee } from "@/lib/mock-data";
import { useAuth } from "@/contexts/AuthContext";

const Employees = () => {
  const { user } = useAuth();
  const canDelete = user?.role === "admin";
  const canAdd = user?.role !== "employee";

  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const departments = ["All", ...new Set(employees.map((e) => e.department))];
  const filtered = employees.filter(
    (e) =>
      (selectedDept === "All" || e.department === selectedDept) &&
      (e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()))
  );

  const statusTopBorder: Record<string, string> = {
    active:    "border-t-4 border-success",
    "on-leave":"border-t-4 border-warning",
    inactive:  "border-t-4 border-destructive",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground mt-1">{employees.length} total employees</p>
        </div>
        {canAdd && (
          <button onClick={() => setShowAddModal(true)}
            className="gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" /> Add Employee
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-card rounded-xl px-3 py-2.5 flex-1 border border-border">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search employees..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {departments.map((d) => (
            <button key={d} onClick={() => setSelectedDept(d)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedDept === d ? "gradient-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}>{d}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((emp, i) => (
          <motion.div key={emp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedEmployee(emp)}
            className={`glass rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group ${statusTopBorder[emp.status]}`}>
            <div className="flex items-start justify-between">
              <img src={emp.avatar} alt={emp.name} className="h-14 w-14 rounded-xl object-cover ring-2 ring-primary/10" />
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                emp.status === "active" ? "bg-success/10 text-success" :
                emp.status === "on-leave" ? "bg-warning/10 text-warning" :
                "bg-destructive/10 text-destructive"
              }`}>{emp.status}</span>
            </div>
            <div className="mt-3">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{emp.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{emp.role}</p>
              <p className="text-xs text-primary font-medium mt-1">{emp.department}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center gap-3">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedEmployee && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEmployee(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="glass rounded-2xl p-6 max-w-md w-full space-y-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <img src={selectedEmployee.avatar} alt="" className="h-16 w-16 rounded-xl object-cover" />
                  <div><h2 className="text-xl font-bold text-foreground">{selectedEmployee.name}</h2><p className="text-sm text-primary">{selectedEmployee.role}</p></div>
                </div>
                <button onClick={() => setSelectedEmployee(null)} className="p-1 hover:bg-secondary rounded-lg"><X className="h-5 w-5 text-muted-foreground" /></button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-muted-foreground text-xs">Department</p><p className="font-medium text-foreground">{selectedEmployee.department}</p></div>
                <div><p className="text-muted-foreground text-xs">Status</p><p className="font-medium text-foreground capitalize">{selectedEmployee.status}</p></div>
                <div><p className="text-muted-foreground text-xs">Email</p><p className="font-medium text-foreground">{selectedEmployee.email}</p></div>
                <div><p className="text-muted-foreground text-xs">Phone</p><p className="font-medium text-foreground">{selectedEmployee.phone}</p></div>
                <div><p className="text-muted-foreground text-xs">Join Date</p><p className="font-medium text-foreground">{selectedEmployee.joinDate}</p></div>
                <div><p className="text-muted-foreground text-xs">Salary</p><p className="font-medium text-foreground">${selectedEmployee.salary.toLocaleString()}</p></div>
              </div>
              <div className="flex gap-2 pt-2">
                <button className="gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium flex-1">Edit</button>
                {canDelete && <button className="bg-destructive/10 text-destructive px-4 py-2 rounded-xl text-sm font-medium">Delete</button>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="glass rounded-2xl p-6 max-w-lg w-full space-y-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-foreground">Add New Employee</h2>
                <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-secondary rounded-lg"><X className="h-5 w-5 text-muted-foreground" /></button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["Full Name", "Email", "Phone", "Role", "Department", "Salary"].map((label) => (
                  <div key={label}>
                    <label className="text-xs font-medium text-muted-foreground">{label}</label>
                    <input className="w-full mt-1 px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm outline-none border border-border focus:ring-2 focus:ring-primary/30 transition-all" />
                  </div>
                ))}
              </div>
              <button className="gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl font-medium text-sm w-full">Add Employee</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Employees;
