export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  avatar: string;
  joinDate: string;
  salary: number;
  status: "active" | "on-leave" | "inactive";
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  reason: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "present" | "late" | "absent" | "half-day";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  time: string;
  read: boolean;
}

const avatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=6",
  "https://i.pravatar.cc/150?img=7",
  "https://i.pravatar.cc/150?img=8",
];

export const employees: Employee[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah@company.com", role: "Senior Developer", department: "Engineering", phone: "+1 234 567 890", avatar: avatars[0], joinDate: "2022-03-15", salary: 95000, status: "active" },
  { id: "2", name: "Michael Chen", email: "michael@company.com", role: "UI/UX Designer", department: "Design", phone: "+1 234 567 891", avatar: avatars[1], joinDate: "2021-07-20", salary: 82000, status: "active" },
  { id: "3", name: "Emma Williams", email: "emma@company.com", role: "HR Manager", department: "Human Resources", phone: "+1 234 567 892", avatar: avatars[2], joinDate: "2020-01-10", salary: 78000, status: "active" },
  { id: "4", name: "James Rodriguez", email: "james@company.com", role: "Product Manager", department: "Product", phone: "+1 234 567 893", avatar: avatars[3], joinDate: "2022-11-05", salary: 105000, status: "on-leave" },
  { id: "5", name: "Olivia Brown", email: "olivia@company.com", role: "Data Analyst", department: "Analytics", phone: "+1 234 567 894", avatar: avatars[4], joinDate: "2023-02-28", salary: 72000, status: "active" },
  { id: "6", name: "Daniel Kim", email: "daniel@company.com", role: "DevOps Engineer", department: "Engineering", phone: "+1 234 567 895", avatar: avatars[5], joinDate: "2021-09-12", salary: 98000, status: "active" },
  { id: "7", name: "Sophia Martinez", email: "sophia@company.com", role: "Marketing Lead", department: "Marketing", phone: "+1 234 567 896", avatar: avatars[6], joinDate: "2022-06-18", salary: 88000, status: "inactive" },
  { id: "8", name: "William Taylor", email: "william@company.com", role: "Frontend Developer", department: "Engineering", phone: "+1 234 567 897", avatar: avatars[7], joinDate: "2023-01-09", salary: 85000, status: "active" },
];

export const leaveRequests: LeaveRequest[] = [
  { id: "1", employeeId: "1", employeeName: "Sarah Johnson", type: "Vacation", startDate: "2026-04-01", endDate: "2026-04-05", status: "pending", reason: "Family vacation" },
  { id: "2", employeeId: "4", employeeName: "James Rodriguez", type: "Sick Leave", startDate: "2026-03-28", endDate: "2026-03-30", status: "approved", reason: "Medical appointment" },
  { id: "3", employeeId: "2", employeeName: "Michael Chen", type: "Personal", startDate: "2026-04-10", endDate: "2026-04-11", status: "pending", reason: "Personal matters" },
  { id: "4", employeeId: "5", employeeName: "Olivia Brown", type: "Vacation", startDate: "2026-04-15", endDate: "2026-04-20", status: "rejected", reason: "Travel plans" },
];

export const notifications: Notification[] = [
  { id: "1", title: "Leave Approved", message: "Your leave request has been approved by HR.", type: "success", time: "2 min ago", read: false },
  { id: "2", title: "Payroll Processed", message: "March 2026 payroll has been processed successfully.", type: "info", time: "1 hour ago", read: false },
  { id: "3", title: "New Employee", message: "A new employee has joined the Engineering team.", type: "info", time: "3 hours ago", read: true },
  { id: "4", title: "Attendance Alert", message: "3 employees were late today.", type: "warning", time: "5 hours ago", read: true },
];

export const monthlyData = [
  { month: "Jan", employees: 42, attendance: 95, leaves: 8 },
  { month: "Feb", employees: 45, attendance: 92, leaves: 12 },
  { month: "Mar", employees: 48, attendance: 97, leaves: 6 },
  { month: "Apr", employees: 50, attendance: 94, leaves: 10 },
  { month: "May", employees: 52, attendance: 96, leaves: 7 },
  { month: "Jun", employees: 55, attendance: 93, leaves: 14 },
];

export const departmentData = [
  { name: "Engineering", value: 18, fill: "hsl(243, 75%, 59%)" },
  { name: "Design", value: 8, fill: "hsl(262, 83%, 58%)" },
  { name: "Marketing", value: 6, fill: "hsl(199, 89%, 48%)" },
  { name: "HR", value: 5, fill: "hsl(152, 69%, 41%)" },
  { name: "Product", value: 7, fill: "hsl(38, 92%, 50%)" },
  { name: "Analytics", value: 4, fill: "hsl(340, 82%, 52%)" },
];

// Part 4 — Extended Mock Data

export interface BurnoutRecord {
  employeeId: string;
  employeeName: string;
  avatar: string;
  department: string;
  riskLevel: "HIGH" | "MEDIUM" | "LOW";
  score: number;
  factors: string[];
  overtimeHours: number;
  leavesTaken: number;
  moodScore: number;
}

export const burnoutData: BurnoutRecord[] = [
  { employeeId: "4", employeeName: "James Rodriguez", avatar: "https://i.pravatar.cc/150?img=4", department: "Product",     riskLevel: "HIGH",   score: 82, factors: ["High overtime", "No leaves taken", "Declining mood"], overtimeHours: 22, leavesTaken: 0, moodScore: 2 },
  { employeeId: "1", employeeName: "Sarah Johnson",   avatar: "https://i.pravatar.cc/150?img=1", department: "Engineering", riskLevel: "MEDIUM", score: 55, factors: ["Moderate overtime", "Low leave balance"],              overtimeHours: 10, leavesTaken: 2, moodScore: 3 },
  { employeeId: "6", employeeName: "Daniel Kim",      avatar: "https://i.pravatar.cc/150?img=6", department: "Engineering", riskLevel: "MEDIUM", score: 58, factors: ["Back-to-back sprints", "Missed breaks"],               overtimeHours: 14, leavesTaken: 1, moodScore: 3 },
  { employeeId: "2", employeeName: "Michael Chen",    avatar: "https://i.pravatar.cc/150?img=2", department: "Design",      riskLevel: "LOW",    score: 22, factors: ["Good work-life balance"],                              overtimeHours:  2, leavesTaken: 5, moodScore: 5 },
  { employeeId: "5", employeeName: "Olivia Brown",    avatar: "https://i.pravatar.cc/150?img=5", department: "Analytics",   riskLevel: "LOW",    score: 30, factors: ["Regular breaks", "Active engagement"],                 overtimeHours:  4, leavesTaken: 4, moodScore: 4 },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: "a1",  employeeId: "1", date: "2026-03-03", checkIn: "09:00", checkOut: "18:00", status: "present"  },
  { id: "a2",  employeeId: "1", date: "2026-03-04", checkIn: "09:15", checkOut: "18:00", status: "late"     },
  { id: "a3",  employeeId: "1", date: "2026-03-05", checkIn: "",      checkOut: "",      status: "absent"   },
  { id: "a4",  employeeId: "1", date: "2026-03-06", checkIn: "09:00", checkOut: "13:00", status: "half-day" },
  { id: "a5",  employeeId: "1", date: "2026-03-07", checkIn: "09:00", checkOut: "18:00", status: "present"  },
  { id: "a6",  employeeId: "2", date: "2026-03-03", checkIn: "09:05", checkOut: "18:00", status: "present"  },
  { id: "a7",  employeeId: "2", date: "2026-03-04", checkIn: "09:00", checkOut: "18:00", status: "present"  },
  { id: "a8",  employeeId: "3", date: "2026-03-03", checkIn: "08:50", checkOut: "17:30", status: "present"  },
  { id: "a9",  employeeId: "4", date: "2026-03-03", checkIn: "",      checkOut: "",      status: "absent"   },
  { id: "a10", employeeId: "5", date: "2026-03-03", checkIn: "09:00", checkOut: "18:00", status: "present"  },
  { id: "a11", employeeId: "6", date: "2026-03-03", checkIn: "09:00", checkOut: "18:00", status: "present"  },
  { id: "a12", employeeId: "7", date: "2026-03-03", checkIn: "",      checkOut: "",      status: "absent"   },
  { id: "a13", employeeId: "8", date: "2026-03-03", checkIn: "09:10", checkOut: "18:00", status: "late"     },
];

export interface LeaveBalance {
  employeeId: string;
  vacation:  { used: number; total: number };
  sick:      { used: number; total: number };
  personal:  { used: number; total: number };
}
export const leaveBalances: LeaveBalance[] = [
  { employeeId: "1", vacation: { used: 10, total: 15 }, sick: { used: 2, total: 10 }, personal: { used: 1, total: 5 } },
  { employeeId: "2", vacation: { used:  5, total: 15 }, sick: { used: 0, total: 10 }, personal: { used: 0, total: 5 } },
];
