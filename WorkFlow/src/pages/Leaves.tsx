import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarOff, Check, X, Plus } from "lucide-react";
import { leaveRequests as initialLeaves } from "@/lib/mock-data";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PendingAction {
  open: boolean;
  leaveId: string;
  action: "approved" | "rejected";
  employeeName: string;
  leaveType: string;
  dateRange: string;
}

const Leaves = () => {
  const { user } = useAuth();
  const isEmployee = user?.role === "employee";
  const [filter, setFilter] = useState("all");
  const [showApply, setShowApply] = useState(false);
  const [leaveList, setLeaveList] = useState([...initialLeaves]);
  const [confirmDialog, setConfirmDialog] = useState<PendingAction>({
    open: false, leaveId: "", action: "approved", employeeName: "", leaveType: "", dateRange: "",
  });
  const [flashRowId, setFlashRowId] = useState<string | null>(null);
  const [flashType, setFlashType] = useState<"approved" | "rejected">("approved");

  const displayLeaves = isEmployee ? leaveList.filter(l => l.employeeId === "1") : leaveList;
  const filtered = filter === "all" ? displayLeaves : displayLeaves.filter((l) => l.status === filter);

  const leaveBalance = [
    { type: "Vacation", total: 20, used: 8, color: "gradient-primary" },
    { type: "Sick Leave", total: 12, used: 3, color: "gradient-success" },
    { type: "Personal", total: 5, used: 2, color: "gradient-warning" },
  ];

  const handleActionClick = (leaveId: string, action: "approved" | "rejected", leave: typeof leaveList[0]) => {
    setConfirmDialog({
      open: true, leaveId, action,
      employeeName: leave.employeeName,
      leaveType: leave.type,
      dateRange: `${leave.startDate} – ${leave.endDate}`,
    });
  };

  const handleConfirm = () => {
    const { leaveId, action, employeeName } = confirmDialog;
    const previousList = [...leaveList];

    setFlashRowId(leaveId);
    setFlashType(action);
    setTimeout(() => setFlashRowId(null), 600);

    setLeaveList(prev => prev.map(l => l.id === leaveId ? { ...l, status: action } : l));
    setConfirmDialog(d => ({ ...d, open: false }));

    toast.success(action === "approved" ? `✅ Leave approved for ${employeeName}` : `❌ Leave rejected for ${employeeName}`, {
      action: { label: "Undo", onClick: () => setLeaveList(previousList) },
      duration: 5000,
    });
  };

  const leaveRowClass: Record<string, string> = {
    pending: "border-l-4 border-warning bg-warning/5",
    approved: "border-l-4 border-success bg-success/5",
    rejected: "border-l-4 border-destructive bg-destructive/5",
  };

  const statusBadgeClass: Record<string, string> = {
    approved: "bg-success/10 text-success",
    rejected: "bg-destructive/10 text-destructive",
    pending: "bg-warning/10 text-warning",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{isEmployee ? "My Leaves" : "Leave Management"}</h1>
          <p className="text-muted-foreground mt-1">Manage and track leave requests.</p>
        </div>
        <button onClick={() => setShowApply(true)}
          className="gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <Plus className="h-4 w-4" /> Apply Leave
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {leaveBalance.map((lb, i) => (
          <motion.div key={lb.type} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5">
            <p className="text-sm font-medium text-muted-foreground">{lb.type}</p>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold text-foreground">{lb.total - lb.used}</span>
              <span className="text-sm text-muted-foreground mb-1">/ {lb.total} days left</span>
            </div>
            <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
              <div className={`h-full ${lb.color} rounded-full transition-all`} style={{ width: `${(lb.used / lb.total) * 100}%` }} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
              filter === f ? "gradient-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"
            }`}>{f}</button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-4">Employee</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-4">Type</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-4">Duration</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-4">Reason</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-4">Status</th>
                {!isEmployee && <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-4">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((leave) => (
                <tr key={leave.id} className={`border-b border-border/50 hover:bg-secondary/30 transition-colors ${
                  flashRowId === leave.id ? (flashType === "approved" ? "bg-success/20" : "bg-destructive/20") : ""
                }`}>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{leave.employeeName}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{leave.type}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{leave.startDate} → {leave.endDate}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{leave.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusBadgeClass[leave.status]}`}>{leave.status}</span>
                  </td>
                  {!isEmployee && (
                    <td className="px-6 py-4">
                      <AnimatePresence mode="wait">
                        {leave.status === "pending" ? (
                          <motion.div key="buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-1.5">
                            <button onClick={() => handleActionClick(leave.id, "approved", leave)} className="p-1.5 rounded-lg gradient-success text-primary-foreground hover:opacity-90"><Check className="h-3.5 w-3.5" /></button>
                            <button onClick={() => handleActionClick(leave.id, "rejected", leave)} className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"><X className="h-3.5 w-3.5" /></button>
                          </motion.div>
                        ) : (
                          <motion.span key="badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-muted-foreground">—</motion.span>
                        )}
                      </AnimatePresence>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AlertDialog open={confirmDialog.open} onOpenChange={open => setConfirmDialog(d => ({ ...d, open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmDialog.action === "approved" ? "Approve Leave Request?" : "Reject Leave Request?"}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to <strong>{confirmDialog.action === "approved" ? "approve" : "reject"}</strong> the leave
              request from <strong>{confirmDialog.employeeName}</strong> for {confirmDialog.leaveType} ({confirmDialog.dateRange})?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}
              className={confirmDialog.action === "approved" ? "gradient-success text-primary-foreground" : "bg-destructive text-primary-foreground hover:bg-destructive/90"}>
              {confirmDialog.action === "approved" ? "Confirm Approve" : "Confirm Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AnimatePresence>
        {showApply && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowApply(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="glass rounded-2xl p-6 max-w-md w-full space-y-4" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-foreground">Apply for Leave</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Leave Type</label>
                  <select className="w-full mt-1 px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm outline-none border border-border">
                    <option>Vacation</option><option>Sick Leave</option><option>Personal</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium text-muted-foreground">Start Date</label><input type="date" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm outline-none border border-border" /></div>
                  <div><label className="text-xs font-medium text-muted-foreground">End Date</label><input type="date" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm outline-none border border-border" /></div>
                </div>
                <div><label className="text-xs font-medium text-muted-foreground">Reason</label><textarea className="w-full mt-1 px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm outline-none border border-border h-20 resize-none" /></div>
              </div>
              <button className="gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl font-medium text-sm w-full">Submit Request</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Leaves;
