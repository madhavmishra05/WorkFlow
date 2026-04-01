import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Sprout, Clock, Heart, Menu, X, ArrowRight, CheckCircle2,
  BarChart3, Users, Shield, Sun, Moon, Sparkles, Globe, Zap,
  Star, ChevronRight, Play
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import workflowLogo from "@/assets/workflow-logo.png";

/* ─── Reusable animated section ─── */
const Section = ({ children, className = "", id = "", style }: {
  children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section ref={ref} id={id} initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
      className={className} style={style}>
      {children}
    </motion.section>
  );
};

/* ─── Count-up hook ─── */
function useStatCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);
  return { count, ref };
}

/* ─── Floating particles ─── */
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/20"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
      />
    ))}
  </div>
);

/* ─── Typing animation ─── */
const TypingText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % texts.length), 3000);
    return () => clearInterval(timer);
  }, [texts.length]);
  return (
    <AnimatePresence mode="wait">
      <motion.span key={index}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
        className="text-primary inline-block">
        {texts[index]}
      </motion.span>
    </AnimatePresence>
  );
};

/* ════════════════════════════════════════════════════════ */

const LandingPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const stat1 = useStatCountUp(500);
  const stat2 = useStatCountUp(50000);
  const stat3 = useStatCountUp(12);
  const stat4 = useStatCountUp(99);

  const features = [
    { icon: Users, title: "Smart Team Builder", desc: "AI-powered team composition that balances skills, personality, and workload for optimal performance.", color: "from-blue-500 to-cyan-500" },
    { icon: Zap, title: "Burnout Predictor", desc: "ML-driven early warning system that detects exhaustion patterns before they become resignations.", color: "from-amber-500 to-orange-500" },
    { icon: BarChart3, title: "Real-time Analytics", desc: "Live dashboards with predictive insights, trend analysis, and actionable workforce intelligence.", color: "from-emerald-500 to-teal-500" },
    { icon: Shield, title: "Role-Based Security", desc: "Granular permissions with Admin, HR, and Employee roles. Every action is audited and secure.", color: "from-purple-500 to-pink-500" },
    { icon: Globe, title: "Global Payroll", desc: "Multi-currency payroll processing with tax compliance across 12+ countries, automated and accurate.", color: "from-indigo-500 to-blue-500" },
    { icon: Sparkles, title: "AI Assistant", desc: "Natural language queries for HR data. Ask anything about your workforce and get instant answers.", color: "from-rose-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={workflowLogo} alt="WorkFlow" className="w-9 h-9 rounded-lg" />
            <span className="text-xl font-bold text-foreground">WorkFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {["Features", "Philosophy", "Preview", "Pricing"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
            <button onClick={toggleTheme}
              className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
              {theme === "dark" ? <Sun className="w-4 h-4 text-warning" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
            </button>
            <button onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-xl text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              Sign In
            </button>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-xl bg-secondary">
              {theme === "dark" ? <Sun className="w-4 h-4 text-warning" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
            </button>
            <button className="text-muted-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-card border-t border-border overflow-hidden">
              <div className="px-4 py-4 space-y-3">
                {["Features", "Philosophy", "Preview", "Pricing"].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`}
                    className="block text-sm text-muted-foreground py-2" onClick={() => setMobileMenuOpen(false)}>{item}</a>
                ))}
                <button onClick={() => navigate("/login")}
                  className="w-full mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold gradient-primary text-primary-foreground">
                  Sign In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <FloatingParticles />
        <motion.div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity }} />
        <motion.div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl pointer-events-none"
          animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 15, repeat: Infinity }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 glass border border-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary">AI-Powered People Platform</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight text-foreground mb-6">
            Build a Workspace Where
            <br />
            <TypingText texts={["People Thrive", "Teams Excel", "Culture Grows", "Innovation Starts"]} />
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            WorkFlow connects HR, payroll, and team culture with AI intelligence.
            When your people grow, your company grows.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-16">
            <button onClick={() => navigate("/login")}
              className="px-8 py-4 rounded-2xl text-sm font-semibold gradient-primary text-primary-foreground flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 rounded-2xl text-sm font-semibold glass border border-border text-foreground flex items-center gap-2 hover:bg-secondary transition-all">
              <Play className="w-4 h-4 text-primary" /> Watch Demo
            </button>
          </motion.div>

          {/* Live preview cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { label: "Wellness Score", value: "94 / 100", sub: "🟢 Excellent" },
              { label: "Team Harmony", value: "↑ 12%", sub: "This month" },
              { label: "Leave Approved ✓", value: "Sarah J.", sub: "5 days vacation" },
              { label: "Burnout Risk", value: "Low 🟢", sub: "Engineering" },
            ].map((card, i) => (
              <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass rounded-2xl p-4 text-left border border-border cursor-default">
                <p className="text-[10px] font-medium text-muted-foreground mb-1">{card.label}</p>
                <p className="text-sm font-bold text-foreground">{card.value}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{card.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted by ── */}
      <Section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-border">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Trusted by forward-thinking companies
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-40">
            {["TechCraft", "NovaSoft", "Meridian", "Apex Corp", "QuantumHR"].map(name => (
              <span key={name} className="text-xl font-bold text-foreground">{name}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Features Grid ── */}
      <Section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-3">POWERFUL FEATURES</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Manage People
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Six powerful modules working in harmony to transform your HR operations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="group relative rounded-2xl p-6 bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-default overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${f.color} shadow-lg`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <motion.div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium"
                  initial={{ x: -10, opacity: 0 }}
                  animate={hoveredFeature === i ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}>
                  Learn more <ChevronRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Philosophy ── */}
      <Section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-3">OUR PHILOSOPHY</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">
            From Human Resources to Human Relationships
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sprout, title: "Nurturing Talent", desc: "We don't just filter resumes; we uncover potential using thoughtful skill matching. Every hire is a relationship, not a resource allocation." },
              { icon: Clock, title: "Balanced Timelines", desc: "Time tracking that respects boundaries. Simple logging, easy time-offs, zero micromanagement. Work enhances life, not consumes it." },
              { icon: Heart, title: "Proactive Care", desc: "Catch the early signs of exhaustion before your best people burn out. Insights to check in before it's too late." },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary/10">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Experience Preview ── */}
      <Section id="preview" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-3">THE EXPERIENCE</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
            Built for Every Person in Your Organization
          </h2>
          <div className="flex gap-2 mb-8 flex-wrap">
            {["For Leadership", "For Individuals", "For Future Teammates"].map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === i
                    ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}>
                {tab}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-sm">
              {activeTab === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[{ l: "Employees", v: "48" }, { l: "Attendance", v: "96.5%" }, { l: "Pending", v: "3" }, { l: "Payroll", v: "$425K" }].map(s => (
                      <div key={s.l} className="rounded-xl p-3 border border-border bg-secondary/50">
                        <p className="text-[10px] text-muted-foreground">{s.l}</p>
                        <p className="text-lg font-bold text-foreground">{s.v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-end gap-2 h-24">
                    {[65, 45, 80, 55, 70, 90, 75, 85].map((h, i) => (
                      <motion.div key={i} className="flex-1 rounded-t-md bg-primary"
                        initial={{ height: 0 }} whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.6 }}
                        style={{ opacity: 0.5 + i * 0.06 }} />
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-foreground">My Attendance This Week</p>
                  <div className="flex gap-2">
                    {["🟢","🟢","🟡","🟢","🔴","🟢","🟢"].map((d,i) => (
                      <div key={i} className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-sm">{d}</div>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-foreground mt-4">Leave Balance</p>
                  {[{l:"Vacation",u:10,t:15},{l:"Sick",u:2,t:10},{l:"Personal",u:1,t:5}].map(b => (
                    <div key={b.l}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{b.l}</span>
                        <span className="text-foreground">{b.u}/{b.t}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }} whileInView={{ width: `${(b.u/b.t)*100}%` }}
                          viewport={{ once: true }} transition={{ duration: 0.8 }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 2 && (
                <div className="space-y-3">
                  <p className="text-lg font-bold text-foreground">Your First Week at WorkFlow</p>
                  {["Complete profile setup","Meet your team lead","Review company handbook","Set up development environment","First team standup"].map((item,i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 py-2">
                      <CheckCircle2 className={`w-5 h-5 ${i < 3 ? "text-success" : "text-border"}`} />
                      <span className={`text-sm ${i < 3 ? "text-muted-foreground line-through" : "text-foreground"}`}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>

      {/* ── Pricing ── */}
      <Section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-3">PRICING</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: "$9", desc: "Per employee/mo", features: ["Up to 25 employees", "Basic attendance", "Leave management", "Email support"], popular: false },
              { name: "Growth", price: "$19", desc: "Per employee/mo", features: ["Unlimited employees", "AI Team Builder", "Burnout Predictor", "Priority support", "Advanced analytics"], popular: true },
              { name: "Enterprise", price: "Custom", desc: "Let's talk", features: ["Everything in Growth", "Custom integrations", "Dedicated manager", "SLA guarantee", "On-premise option"], popular: false },
            ].map((plan) => (
              <motion.div key={plan.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                  plan.popular
                    ? "border-primary bg-card shadow-xl shadow-primary/10 scale-105"
                    : "border-border bg-card hover:border-primary/30"
                }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3" /> Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-3xl font-extrabold text-foreground mb-0">{plan.price}</p>
                <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                <ul className="space-y-2 text-left mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate("/login")}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                    plan.popular
                      ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Social Proof / Stats ── */}
      <Section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { v: stat1, s: "+ Teams" }, { v: stat2, s: "+ Employees" },
              { v: stat4, s: ".9% Uptime" }, { v: stat3, s: " Countries" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-foreground">
                  <span ref={item.v.ref}>{item.v.count}</span>{item.s}
                </p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center bg-card rounded-2xl p-8 border border-border">
            <p className="text-5xl mb-4 text-primary/30">"</p>
            <p className="text-lg italic text-foreground mb-4">
              WorkFlow didn't just organize our HR — it changed how we think about our people.
              The burnout predictor alone saved two key employees from leaving.
            </p>
            <p className="text-sm text-muted-foreground">— Ananya Rao, Head of People, TechCraft India</p>
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center gradient-primary rounded-3xl p-12 sm:p-16 relative overflow-hidden">
          <motion.div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 50%)" }} />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">
            Ready to Build a Workplace People Love?
          </h2>
          <p className="text-lg text-white/80 mb-8 relative z-10">Start with a free 30-day trial. No credit card needed.</p>
          <button onClick={() => navigate("/login")}
            className="px-8 py-4 rounded-2xl text-sm font-semibold bg-white text-primary hover:bg-white/90 transition-colors shadow-xl relative z-10">
            Get Started Free
          </button>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <img src={workflowLogo} alt="WorkFlow" className="w-8 h-8 rounded-lg" />
            <span className="text-lg font-bold text-foreground">WorkFlow</span>
          </div>
          <p className="text-sm text-muted-foreground mb-8">Because when your people thrive, your company grows.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { title: "About", links: ["About Us", "Blog", "Careers", "Press"] },
              { title: "Product", links: ["Dashboard", "Attendance", "Leaves", "Payroll"] },
              { title: "Resources", links: ["Documentation", "API", "Community", "Status"] },
              { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Security"] },
            ].map(col => (
              <div key={col.title}>
                <p className="text-sm font-semibold text-foreground mb-3">{col.title}</p>
                {col.links.map(link => (
                  <a key={link} href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">{link}</a>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2026 WorkFlow. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
                {theme === "dark" ? <Sun className="w-4 h-4 text-warning" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
