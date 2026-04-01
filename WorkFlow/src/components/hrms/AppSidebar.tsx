import { LayoutDashboard, Users, CalendarCheck, CalendarOff, DollarSign, Bell, Settings, LogOut, Zap, Heart } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import workflowLogo from "@/assets/workflow-logo.png";

const roleBadgeConfig = {
  admin:    { label: "Admin",    className: "bg-purple-500/20 text-purple-400 border border-purple-500/30" },
  hr:       { label: "HR",       className: "bg-blue-500/20 text-blue-400 border border-blue-500/30" },
  employee: { label: "Employee", className: "bg-green-500/20 text-green-400 border border-green-500/30" },
};

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const role = user?.role ?? "employee";

  const allMain = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, roles: ["admin","hr","employee"] },
    { title: "Employees", url: "/employees", icon: Users, roles: ["admin","hr"] },
    { title: "Attendance", url: "/attendance", icon: CalendarCheck, roles: ["admin","hr"] },
    { title: "My Attendance", url: "/attendance", icon: CalendarCheck, roles: ["employee"] },
    { title: "Leaves",     url: "/leaves",     icon: CalendarOff, roles: ["admin","hr"] },
    { title: "My Leaves",  url: "/leaves",     icon: CalendarOff, roles: ["employee"] },
    { title: "Payroll",    url: "/payroll",    icon: DollarSign, roles: ["admin"] },
  ];
  const smartItems = [
    { title: "Team Builder",      url: "/team-builder", icon: Zap,   roles: ["admin"] },
    { title: "Burnout Predictor", url: "/burnout",      icon: Heart, roles: ["admin"] },
  ];
  const otherItems = [
    { title: "Notifications", url: "/notifications", icon: Bell,     roles: ["admin","hr","employee"] },
    { title: "Settings",      url: "/settings",      icon: Settings, roles: ["admin","hr","employee"] },
  ];

  const filterItems = (items: typeof allMain) => items.filter(i => i.roles.includes(role));

  const renderGroup = (label: string, items: typeof allMain) => {
    const visible = filterItems(items);
    if (!visible.length) return null;
    return (
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {!collapsed && label}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {visible.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink to={item.url} end={item.url === "/dashboard"}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  const badge = roleBadgeConfig[role];

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="p-4 flex items-center gap-3">
        <img src={workflowLogo} alt="WorkFlow" width={36} height={36} className="rounded-xl flex-shrink-0" />
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-gradient">WorkFlow</h1>
              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${badge.className}`}>{badge.label}</span>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Smart HRMS</p>
          </div>
        )}
      </div>
      <SidebarContent>
        {renderGroup("Main Menu", allMain)}
        {renderGroup("Smart Features", smartItems)}
        {renderGroup("Other", otherItems)}
      </SidebarContent>
      <SidebarFooter className="p-4">
        <button onClick={() => { logout(); navigate("/"); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 w-full">
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
