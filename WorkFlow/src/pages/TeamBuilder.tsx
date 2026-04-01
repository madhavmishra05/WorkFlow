import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Zap, Star, Briefcase, AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";
import { employees } from "@/lib/mock-data";

const allSkills = ["React", "Node.js", "Python", "Java", "SQL", "TypeScript", "Figma", "AWS", "Docker", "Machine Learning"];

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  department: string;
  skills: string[];
  workload: number;
  availability: number;
  score: number;
}

const employeeSkills: Record<string, { skills: string[]; workload: number; availability: number }> = {
  "1": { skills: ["React", "TypeScript", "Node.js", "AWS"], workload: 65, availability: 80 },
  "2": { skills: ["Figma", "React", "TypeScript"], workload: 40, availability: 95 },
  "3": { skills: ["Python", "SQL", "Machine Learning"], workload: 55, availability: 70 },
  "4": { skills: ["Java", "AWS", "Docker", "SQL"], workload: 80, availability: 30 },
  "5": { skills: ["Python", "SQL", "Machine Learning", "TypeScript"], workload: 35, availability: 90 },
  "6": { skills: ["AWS", "Docker", "Node.js", "Python"], workload: 70, availability: 60 },
  "7": { skills: ["Figma", "React", "Node.js"], workload: 20, availability: 50 },
  "8": { skills: ["React", "TypeScript", "Node.js", "Docker"], workload: 50, availability: 85 },
};

const scoreBorder = (score: number): string => {
  if (score >= 70) return "border-l-4 border-success";
  if (score >= 45) return "border-l-4 border-warning";
  return "border-l-4 border-destructive";
};

const TeamBuilder = () => {
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const maxTeamSize = employees.filter(e => e.status === "active").length;
  const [teamSize, setTeamSize] = useState(3);
  const [generatedTeam, setGeneratedTeam] = useState<TeamMember[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);

  const toggleSkill = (skill: string) => {
    setRequiredSkills((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]);
  };

  const buildTeam = () => {
    setIsBuilding(true);
    setTimeout(() => {
      const scored: TeamMember[] = employees
        .filter((e) => e.status === "active")
        .map((emp) => {
          const data = employeeSkills[emp.id] || { skills: [], workload: 50, availability: 50 };
          const skillMatch = requiredSkills.length > 0
            ? data.skills.filter((s) => requiredSkills.includes(s)).length / requiredSkills.length : 0.5;
          const score = Math.round(skillMatch * 40 + (data.availability / 100) * 30 - (data.workload / 100) * 30);
          return { id: emp.id, name: emp.name, avatar: emp.avatar, department: emp.department, skills: data.skills, workload: data.workload, availability: data.availability, score: Math.max(0, Math.min(100, score + 50)) };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, teamSize);
      setGeneratedTeam(scored);
      setIsBuilding(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-3">
          <div className="gradient-primary p-2.5 rounded-xl"><Zap className="h-6 w-6 text-primary-foreground" /></div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Auto Team Builder</h1>
            <p className="text-muted-foreground text-sm">AI-powered optimal team formation based on skills, workload & availability</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 glass rounded-xl p-6 space-y-5">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" /> Project Requirements</h2>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Required Skills</label>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill) => (
                <button key={skill} onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    requiredSkills.includes(skill) ? "gradient-primary text-primary-foreground shadow-md" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}>{skill}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Team Size: {teamSize} / {maxTeamSize} available</label>
            <input type="range" min={2} max={maxTeamSize} value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} className="w-full accent-primary" />
            <div className="flex justify-between text-[10px] text-muted-foreground"><span>2</span><span>{maxTeamSize}</span></div>
          </div>
          <div className="glass rounded-lg p-3 space-y-1">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Scoring Formula</p>
            <p className="text-xs text-foreground font-mono">Score = Skill × 0.4 + Avail × 0.3 - Load × 0.3</p>
          </div>
          <button onClick={buildTeam} disabled={isBuilding}
            className="gradient-primary text-primary-foreground w-full py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
            {isBuilding ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
            {isBuilding ? "Building Team..." : "Generate Optimal Team"}
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-4">
          {generatedTeam.length === 0 ? (
            <div className="glass rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-secondary p-4 rounded-full"><Users className="h-10 w-10 text-muted-foreground" /></div>
              <h3 className="text-lg font-semibold text-foreground">No Team Generated Yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">Select the required skills and team size, then click "Generate Optimal Team" to find the best fit.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-success" /><h2 className="text-lg font-semibold text-foreground">Recommended Team ({generatedTeam.length} members)</h2></div>
              <AnimatePresence>
                {generatedTeam.map((member, i) => (
                  <motion.div key={member.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className={`glass rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${scoreBorder(member.score)}`}>
                    <img src={member.avatar} alt={member.name} className="h-12 w-12 rounded-full ring-2 ring-primary/20" />
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">{member.name}</p>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{member.department}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.map((s) => (
                          <span key={s} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            requiredSkills.includes(s) ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                          }`}>{s}</span>
                        ))}
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Workload: <span className={member.workload > 70 ? "text-warning" : "text-success"}>{member.workload}%</span></span>
                        <span>Available: <span className={member.availability > 60 ? "text-success" : "text-warning"}>{member.availability}%</span></span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className={`text-2xl font-bold ${member.score >= 70 ? "text-success" : member.score >= 45 ? "text-warning" : "text-destructive"}`}>{member.score}</div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`h-3 w-3 ${j < Math.round(member.score / 20) ? "text-warning fill-warning" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                      <p className="text-[10px] text-muted-foreground">Score</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {generatedTeam.some((m) => m.workload > 70) && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20">
                  <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                  <div><p className="text-sm font-medium text-foreground">Workload Warning</p><p className="text-xs text-muted-foreground">Some members have high workload. Consider redistributing tasks.</p></div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TeamBuilder;
