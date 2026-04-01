import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Zap, Shield, Users, BarChart3, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/use-theme";
import loginHero from "@/assets/login-hero.png";
import workflowLogo from "@/assets/workflow-logo.png";

const features = [
  { icon: Users, label: "Smart Team Builder", desc: "AI-powered team formation" },
  { icon: Zap, label: "Burnout Predictor", desc: "Protect employee wellness" },
  { icon: BarChart3, label: "Analytics", desc: "Real-time HR insights" },
  { icon: Shield, label: "Role-Based Access", desc: "Secure & controlled" },
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("admin@workflow.com");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleRoleChange = (r: string) => {
    setRole(r);
    const emails: Record<string, string> = {
      admin: "admin@workflow.com", hr: "hr@workflow.com", employee: "sarah@workflow.com",
    };
    setEmail(emails[r]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(role as "admin" | "hr" | "employee");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden transition-colors duration-300">
      {/* Theme toggle */}
      <button onClick={toggleTheme}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-xl glass border border-border hover:bg-secondary transition-colors">
        {theme === "dark" ? <Sun className="w-5 h-5 text-warning" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
      </button>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full gradient-primary opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative z-10">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="max-w-lg space-y-8">
          <div className="flex items-center gap-3">
            <img src={workflowLogo} alt="WorkFlow" width={48} height={48} className="rounded-xl" />
            <h1 className="text-4xl font-extrabold text-gradient">WorkFlow</h1>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The intelligent HRMS that doesn't just manage employees — it makes <span className="text-primary font-semibold">smart decisions</span> for your organization.
          </p>
          <motion.img src={loginHero} alt="Team collaboration" className="w-full max-w-md mx-auto drop-shadow-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} />
          <div className="grid grid-cols-2 gap-3">
            {features.map((f, i) => (
              <motion.div key={f.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="glass rounded-xl p-3 flex items-center gap-3 border border-border">
                <div className="gradient-primary p-2 rounded-lg"><f.icon className="h-4 w-4 text-primary-foreground" /></div>
                <div><p className="text-xs font-semibold text-foreground">{f.label}</p><p className="text-[10px] text-muted-foreground">{f.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass rounded-2xl p-8 w-full max-w-md space-y-6 border border-border">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 lg:hidden mb-2">
              <img src={workflowLogo} alt="WorkFlow" width={40} height={40} className="rounded-xl" />
              <span className="text-2xl font-extrabold text-gradient">WorkFlow</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">Sign in to your WorkFlow dashboard</p>
          </div>

          <div className="flex gap-2">
            {["admin", "hr", "employee"].map((r) => (
              <button key={r} onClick={() => handleRoleChange(r)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  role === r ? "gradient-primary text-primary-foreground shadow-lg" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}>{r}</button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-secondary text-foreground text-sm outline-none border border-border focus:ring-2 focus:ring-primary/30 transition-all" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} defaultValue="password123"
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-secondary text-foreground text-sm outline-none border border-border focus:ring-2 focus:ring-primary/30 transition-all pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" className="rounded border-border" defaultChecked />Remember me</label>
              <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="gradient-primary text-primary-foreground w-full py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg">Sign In</button>
          </form>
          <p className="text-center text-xs text-muted-foreground">Demo credentials are pre-filled. Just click <span className="text-primary font-medium">Sign In</span>.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
