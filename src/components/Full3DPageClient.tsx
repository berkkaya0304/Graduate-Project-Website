"use client";
import React, { useEffect, useState } from "react";
import { teamMembers, advisor, juryMembers } from "@/data/team";
import Image from "next/image";


function FloatingParticles() {
  const particles = Array.from({ length: 28 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const size = 2 + ((i * 7) % 6);
        const left = (i * 37) % 100;
        const duration = 18 + ((i * 13) % 16);
        const delay = -((i * 3) % 20);
        const opacity = 0.15 + ((i * 5) % 10) / 100;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-amber-200/60 shadow-[0_0_12px_rgba(139,69,19,0.4)] particle"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              animationDuration: `${duration}s, 3.2s`,
              animationDelay: `${delay}s, ${(i % 7) * 0.3}s`,
              opacity
            }}
          />
        );
      })}
    </div>
  );
}


export default function Full3DPageClient() {
  const [mounted, setMounted] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState<typeof advisor | null>(null);
  const [selectedJuryMember, setSelectedJuryMember] = useState<typeof juryMembers[0] | null>(null);
  const [selectedReportOpen, setSelectedReportOpen] = useState(false);
  const [selectedVisual, setSelectedVisual] = useState<string | null>(null);
  useEffect(() => setMounted(true), []);

  // Reveal on scroll
  useEffect(() => {
    if (!mounted) return;
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div className="fixed inset-0 m-0 p-0">
      {/* Background with driedfig.png and dark brown overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-motion"
        style={{
          backgroundImage: 'url(/driedfig.png)',
          filter: 'brightness(0.3) sepia(0.3)',
          willChange: 'transform'
        }}
      />
      
      {/* Dark brown overlay */}
      <div className="absolute inset-0 bg-[color:rgb(30,20,10)/0.85]" />
      <FloatingParticles />
      
      {/* Content */}
      <div className="relative z-10 h-screen overflow-y-auto">
        <div className="min-h-screen">
          <div className="mx-auto max-w-6xl px-6 text-center py-20 reveal">
            <div className="mx-auto inline-block rounded-xl border border-amber-200/30 bg-[color:rgb(40,25,15)/0.8] backdrop-blur-md px-6 py-6 shadow-[0_15px_50px_rgba(25,15,8,0.9)] transition-transform duration-500">
              <div className="mb-6 flex items-center justify-center">
                <div className="relative">
                  <Image alt="Figion Logo" src="/logo.jpg" width={120} height={120} className="rounded-full border-2 border-white/30 shadow-[0_12px_48px_rgba(0,0,0,0.6)] object-cover ring-2 ring-white/10" unoptimized />
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-400/25 to-orange-500/25 blur-md"></div>
                </div>
              </div>
              <h1 className="text-white text-4xl sm:text-6xl font-bold tracking-tight" style={{textShadow:"0 3px 12px rgba(0,0,0,0.8)"}}>Figion — Dried Fig Aflatoxin Analysis</h1>
              <p className="mt-4 text-white/95 text-base sm:text-lg font-medium" style={{textShadow:"0 2px 8px rgba(0,0,0,0.7)"}}>Quality control and analysis based on aflatoxin levels</p>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 py-20 reveal">
            <div className="rounded-xl border border-amber-200/25 bg-[color:rgb(35,22,12)/0.75] backdrop-blur-md p-6 shadow-[0_12px_45px_rgba(25,15,8,0.8)]">
            <h2 className="text-white text-3xl font-semibold" style={{textShadow:"0 3px 10px rgba(0,0,0,0.7)"}}>About the Project</h2>
            <p className="mt-2 text-white/95 text-base" style={{textShadow:"0 2px 8px rgba(0,0,0,0.6)"}}>We detect aflatoxin-contaminated dried figs through image analysis techniques. Our system classifies figs based on visual characteristics under specific lighting conditions — particularly UV light, where aflatoxin contamination typically causes yellowish fluorescence.</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {[
                { name: "Aflatoxin Analysis", desc: "Mycotoxin detection and quantification" },
                { name: "Quality Control", desc: "Food safety standards and compliance" },
                { name: "Machine Learning", desc: "Automated classification and scoring" },
                { name: "Visual Analysis", desc: "Image processing and pattern recognition" },
              ].map((t) => (
                <div key={t.name} className="p-5 rounded-lg border border-white/20 bg-[color:rgb(45,28,16)/0.5] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[color:rgb(45,28,16)/0.7]">
                  <div className="text-white font-medium text-lg" style={{textShadow:"0 2px 8px rgba(0,0,0,0.6)"}}>{t.name}</div>
                  <div className="text-white/95 text-sm" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>{t.desc}</div>
                </div>
              ))}
            </div>
            <ul className="mt-4 text-white/95 list-disc ms-5 space-y-1 text-base" style={{textShadow:"0 2px 8px rgba(0,0,0,0.6)"}}>
              <li>Goal: Objective evaluation of dried fig quality</li>
              <li>Method: Spectroscopic analysis and computer vision</li>
              <li>Impact: Stronger food safety and export quality</li>
            </ul>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-20 reveal">
            <div className="rounded-xl border border-amber-200/25 bg-[color:rgb(35,22,12)/0.75] backdrop-blur-md p-6 shadow-[0_12px_45px_rgba(25,15,8,0.8)]">
            <h2 className="text-white text-2xl font-semibold" style={{textShadow:"0 3px 10px rgba(0,0,0,0.7)"}}>Team — Figion</h2>
            <p className="mt-2 text-white/95" style={{textShadow:"0 2px 8px rgba(0,0,0,0.6)"}}>Interdisciplinary collaboration and shared ownership.</p>
            <div className="mt-2 text-white/95 text-sm" style={{textShadow:"0 2px 8px rgba(0,0,0,0.6)"}}>Team members: <span className="font-medium text-white">{teamMembers.length}</span> • Advisor: <span className="font-medium text-white">{advisor ? 1 : 0}</span> • Jury: <span className="font-medium text-white">{juryMembers ? juryMembers.length : 0}</span></div>
            
            {/* Main Team Members Section */}
            <div className="mt-6">
              <h3 className="text-white text-lg font-medium mb-3" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>👥 Team Members</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {teamMembers.map((m) => (
                  <div 
                    key={m.name} 
                    className="p-4 rounded-lg border border-white/20 bg-[color:rgb(45,28,16)/0.5] flex items-start gap-3 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[color:rgb(45,28,16)/0.7] cursor-pointer"
                    onClick={() => setSelectedMember(m)}
                  >
                    {m.avatarUrl ? (
                      <Image alt={m.name} src={m.avatarUrl} width={40} height={40} className="size-10 rounded-full bg-white/10 object-cover" unoptimized />
                    ) : (
                      <div className="size-10 rounded-full bg-white/10 grid place-items-center text-xs text-white/70">
                        {m.name.split(" ").map((p) => p[0]).slice(0,2).join("")}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-white font-medium truncate" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>{m.name}</div>
                      <div className="text-white/90 text-sm truncate" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>{m.role}</div>
                      {m.skills && m.skills.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {m.skills.slice(0,4).map((s) => (
                            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-white/20 text-white/90" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>{s}</span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Advisor Section */}
            {advisor && (
              <div className="mt-6">
                <h3 className="text-white text-lg font-medium mb-3" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>👨‍🏫 Advisor</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div 
                    className="p-4 rounded-lg border border-white/20 bg-[color:rgb(45,28,16)/0.5] flex items-start gap-3 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[color:rgb(45,28,16)/0.7] cursor-pointer"
                    onClick={() => setSelectedAdvisor(advisor)}
                  >
                    {advisor.avatarUrl ? (
                      <Image alt={advisor.name} src={advisor.avatarUrl} width={40} height={40} className="size-10 rounded-full bg-white/10 object-cover" unoptimized />
                    ) : (
                      <div className="size-10 rounded-full bg-white/10 grid place-items-center text-xs text-white/70">
                        {advisor.name.split(" ").map((p) => p[0]).slice(0,2).join("")}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-white font-medium truncate" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>{advisor.name}</div>
                      <div className="text-white/90 text-sm truncate" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>{advisor.role}</div>
                      {advisor.skills && advisor.skills.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {advisor.skills.slice(0,4).map((s) => (
                            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-white/20 text-white/90" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>{s}</span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Jury Members Section */}
            {juryMembers && juryMembers.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white text-lg font-medium mb-3" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>⚖️ Jury Members</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {juryMembers.map((m) => (
                    <div 
                      key={m.name} 
                      className="p-4 rounded-lg border border-white/20 bg-[color:rgb(45,28,16)/0.5] flex items-start gap-3 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[color:rgb(45,28,16)/0.7] cursor-pointer"
                      onClick={() => setSelectedJuryMember(m)}
                    >
                      {m.avatarUrl ? (
                        <Image alt={m.name} src={m.avatarUrl} width={40} height={40} className="size-10 rounded-full bg-white/10 object-cover" unoptimized />
                      ) : (
                        <div className="size-10 rounded-full bg-white/10 grid place-items-center text-xs text-white/70">
                          {m.name.split(" ").map((p) => p[0]).slice(0,2).join("")}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-white font-medium truncate" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>{m.name}</div>
                        <div className="text-white/90 text-sm truncate" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>{m.role}</div>
                        {m.skills && m.skills.length ? (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {m.skills.slice(0,4).map((s) => (
                              <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-white/20 text-white/90" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>{s}</span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-20 reveal">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/20 bg-[color:rgb(50,30,18)/0.6] backdrop-blur-md p-6 shadow-[0_12px_45px_rgba(20,12,8,0.7)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[color:rgb(50,30,18)/0.8] cursor-pointer" onClick={() => setSelectedReportOpen(true)}>
                <h2 className="text-white text-2xl font-semibold" style={{textShadow:"0 2px 8px rgba(0,0,0,0.5)"}}>Analysis Reports</h2>
                <p className="mt-2 text-white/90 text-sm" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>Aflatoxin analysis and quality control reports.</p>
                <ul className="mt-3 text-white/90 text-sm list-disc ms-5 space-y-1">
                  <li>Aflatoxin Analysis Results</li>
                  <li>Quality Control Report</li>
                  <li>Spectroscopic Analysis Data</li>
                  <li>Food Safety Assessment</li>
                </ul>
                <p className="mt-2 text-white/70 text-xs">Folder: <code className="font-mono">public/pdfs</code></p>
              </div>
              <div className="rounded-xl border border-white/20 bg-[color:rgb(50,30,18)/0.6] backdrop-blur-md p-6 shadow-[0_12px_45px_rgba(20,12,8,0.7)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[color:rgb(50,30,18)/0.8]">
                <h2 className="text-white text-2xl font-semibold" style={{textShadow:"0 2px 8px rgba(0,0,0,0.5)"}}>Visual Analysis</h2>
                <p className="mt-2 text-white/90 text-sm" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>Pipeline: UV fluorescence detection → background removal → defect detection → color-space metrics → aflatoxin risk classification.</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {["/photos/fig-sample1.jpg","/photos/fig-sample2.jpg","/photos/fig-sample3.jpg"].map((src) => (
                    <div key={src} className="aspect-[4/3] rounded bg-white/10/10 border border-white/10 grid place-items-center text-[10px] text-white/80 cursor-pointer hover:bg-white/15" onClick={() => setSelectedVisual(src)}>Fig Sample</div>
                  ))}
                </div>
                <ul className="mt-3 text-white/80 text-xs list-disc ms-5 space-y-1">
                  <li>Batch processing with reproducible parameters</li>
                  <li>Export JSON metrics + overlay images</li>
                </ul>
                <p className="mt-2 text-white/70 text-xs">Folder: <code className="font-mono">public/photos</code></p>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 py-20 reveal">
            <div className="rounded-xl border border-amber-200/25 bg-[color:rgb(35,22,12)/0.75] backdrop-blur-md p-6 shadow-[0_12px_45px_rgba(25,15,8,0.8)]">
            <h2 className="text-white text-2xl font-semibold" style={{textShadow:"0 3px 10px rgba(0,0,0,0.7)"}}>Sustainable Development Goals</h2>
            <p className="mt-2 text-white/95" style={{textShadow:"0 2px 8px rgba(0,0,0,0.6)"}}>The project is framed through food safety and sustainable agriculture.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Good Health and Well-Being (SDG 3)", "Industry, Innovation and Infrastructure (SDG 9)", "Partnerships for the Goals (SDG 17)", "Decent Work and Economic Growth (SDG 8)"].map((s) => (
                <span key={s} className="text-[11px] px-3 py-1 rounded-full border border-white/25 bg-white/15 text-white/95" style={{textShadow:"0 2px 8px rgba(0,0,0,0.6)"}}>{s}</span>
              ))}
            </div>
            </div>
          </div>

          <div className="py-20" />
        </div>
      </div>

      {/* Team Member Popup Modal */}
      {selectedMember && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div className="absolute inset-0 bg-black/80" />
          <div
            className="relative max-w-lg w-full rounded-xl border border-white/20 bg-[color:rgb(45,28,16)/0.9] backdrop-blur-md p-6 shadow-[0_15px_50px_rgba(20,12,8,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              {selectedMember.avatarUrl ? (
                <Image alt={selectedMember.name} src={selectedMember.avatarUrl} width={64} height={64} className="size-16 rounded-full bg-white/10 object-cover" unoptimized />
              ) : (
                <div className="size-16 rounded-full bg-white/10 grid place-items-center text-lg text-white/70">
                  {selectedMember.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-white text-xl font-semibold truncate" style={{textShadow:"0 2px 8px rgba(0,0,0,0.6)"}}>{selectedMember.name}</h2>
                    <p className="text-white/90 text-sm truncate" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>{selectedMember.role}</p>
                    {selectedMember.email ? (
                      <a className="text-blue-300 text-sm hover:underline" href={`mailto:${selectedMember.email}`} style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>{selectedMember.email}</a>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className="text-white/70 hover:text-white text-sm border border-white/20 rounded px-3 py-1 hover:border-white/40 transition-colors"
                    onClick={() => setSelectedMember(null)}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
                
                {selectedMember.bio ? (
                  <div className="mt-4">
                    <h3 className="text-white font-medium text-sm mb-2" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>Hakkında</h3>
                    <p className="text-white/90 text-sm leading-relaxed" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>{selectedMember.bio}</p>
                  </div>
                ) : null}
                
                {selectedMember.skills && selectedMember.skills.length > 0 ? (
                  <div className="mt-4">
                    <h3 className="text-white font-medium text-sm mb-2" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>Yetenekler</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map((s) => (
                        <span key={s} className="text-xs px-2 py-1 rounded-full border border-white/20 bg-white/10 text-white/90" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                
                <div className="mt-4">
                  <h3 className="text-white font-medium text-sm mb-2" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>Sorumluluklar</h3>
                  <ul className="text-white/90 text-sm space-y-1 list-disc ms-5" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>
                    {selectedMember.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center gap-4 mt-4 text-sm">
                  {selectedMember.github ? (
                    <a className="text-blue-300 hover:underline" href={selectedMember.github} target="_blank" rel="noreferrer" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>GitHub</a>
                  ) : null}
                  {selectedMember.linkedin ? (
                    <a className="text-blue-300 hover:underline" href={selectedMember.linkedin} target="_blank" rel="noreferrer" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>LinkedIn</a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advisor Popup Modal */}
      {selectedAdvisor && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center p-4"
          onClick={() => setSelectedAdvisor(null)}
        >
          <div className="absolute inset-0 bg-black/80" />
          <div
            className="relative max-w-lg w-full rounded-xl border border-white/20 bg-[color:rgb(45,28,16)/0.9] backdrop-blur-md p-6 shadow-[0_15px_50px_rgba(20,12,8,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              {selectedAdvisor.avatarUrl ? (
                <Image alt={selectedAdvisor.name} src={selectedAdvisor.avatarUrl} width={64} height={64} className="size-16 rounded-full bg-white/10 object-cover" unoptimized />
              ) : (
                <div className="size-16 rounded-full bg-white/10 grid place-items-center text-lg text-white/70">
                  {selectedAdvisor.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-white text-xl font-semibold truncate" style={{textShadow:"0 2px 8px rgba(0,0,0,0.6)"}}>{selectedAdvisor.name}</h2>
                    <p className="text-white/90 text-sm truncate" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>{selectedAdvisor.role}</p>
                    {selectedAdvisor.email ? (
                      <a className="text-blue-300 text-sm hover:underline" href={`mailto:${selectedAdvisor.email}`} style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>{selectedAdvisor.email}</a>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className="text-white/70 hover:text-white text-sm border border-white/20 rounded px-3 py-1 hover:border-white/40 transition-colors"
                    onClick={() => setSelectedAdvisor(null)}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
                
                {selectedAdvisor.bio ? (
                  <div className="mt-4">
                    <h3 className="text-white font-medium text-sm mb-2" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>Hakkında</h3>
                    <p className="text-white/90 text-sm leading-relaxed" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>{selectedAdvisor.bio}</p>
                  </div>
                ) : null}
                
                {selectedAdvisor.skills && selectedAdvisor.skills.length > 0 ? (
                  <div className="mt-4">
                    <h3 className="text-white font-medium text-sm mb-2" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>Yetenekler</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAdvisor.skills.map((s) => (
                        <span key={s} className="text-xs px-2 py-1 rounded-full border border-white/20 bg-white/10 text-white/90" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                
                <div className="mt-4">
                  <h3 className="text-white font-medium text-sm mb-2" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>Sorumluluklar</h3>
                  <ul className="text-white/90 text-sm space-y-1 list-disc ms-5" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>
                    {selectedAdvisor.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Jury Member Popup Modal */}
      {selectedJuryMember && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center p-4"
          onClick={() => setSelectedJuryMember(null)}
        >
          <div className="absolute inset-0 bg-black/80" />
          <div
            className="relative max-w-lg w-full rounded-xl border border-white/20 bg-[color:rgb(45,28,16)/0.9] backdrop-blur-md p-6 shadow-[0_15px_50px_rgba(20,12,8,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              {selectedJuryMember.avatarUrl ? (
                <Image alt={selectedJuryMember.name} src={selectedJuryMember.avatarUrl} width={64} height={64} className="size-16 rounded-full bg-white/10 object-cover" unoptimized />
              ) : (
                <div className="size-16 rounded-full bg-white/10 grid place-items-center text-lg text-white/70">
                  {selectedJuryMember.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-white text-xl font-semibold truncate" style={{textShadow:"0 2px 8px rgba(0,0,0,0.6)"}}>{selectedJuryMember.name}</h2>
                    <p className="text-white/90 text-sm truncate" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>{selectedJuryMember.role}</p>
                    {selectedJuryMember.email ? (
                      <a className="text-blue-300 text-sm hover:underline" href={`mailto:${selectedJuryMember.email}`} style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>{selectedJuryMember.email}</a>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className="text-white/70 hover:text-white text-sm border border-white/20 rounded px-3 py-1 hover:border-white/40 transition-colors"
                    onClick={() => setSelectedJuryMember(null)}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
                
                {selectedJuryMember.bio ? (
                  <div className="mt-4">
                    <h3 className="text-white font-medium text-sm mb-2" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>Hakkında</h3>
                    <p className="text-white/90 text-sm leading-relaxed" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>{selectedJuryMember.bio}</p>
                  </div>
                ) : null}
                
                {selectedJuryMember.skills && selectedJuryMember.skills.length > 0 ? (
                  <div className="mt-4">
                    <h3 className="text-white font-medium text-sm mb-2" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>Yetenekler</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJuryMember.skills.map((s) => (
                        <span key={s} className="text-xs px-2 py-1 rounded-full border border-white/20 bg-white/10 text-white/90" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                
                <div className="mt-4">
                  <h3 className="text-white font-medium text-sm mb-2" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>Sorumluluklar</h3>
                  <ul className="text-white/90 text-sm space-y-1 list-disc ms-5" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>
                    {selectedJuryMember.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports Popup Modal */}
      {selectedReportOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center p-4" onClick={() => setSelectedReportOpen(false)}>
          <div className="absolute inset-0 bg-black/80" />
          <div className="relative max-w-lg w-full rounded-xl border border-white/20 bg-[color:rgb(45,28,16)/0.9] backdrop-blur-md p-6 shadow-[0_15px_50px_rgba(20,12,8,0.8)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-3">
              <h2 className="text-white text-xl font-semibold">Analysis Reports</h2>
              <button type="button" className="ms-auto text-white/80 hover:text-white text-sm border border-white/20 rounded px-3 py-1" onClick={() => setSelectedReportOpen(false)}>✕</button>
            </div>
            <p className="mt-2 text-white/90 text-sm">Detailed aflatoxin analysis and quality control documentation.</p>
            <ul className="mt-3 text-white/90 text-sm list-disc ms-5 space-y-1">
              <li>Aflatoxin Analysis Results (PDF)</li>
              <li>Quality Control Report (PDF)</li>
              <li>Spectroscopic Analysis Data (CSV)</li>
              <li>Food Safety Assessment (PDF)</li>
            </ul>
            <p className="mt-3 text-white/80 text-xs">Files under <code className="font-mono">public/pdfs</code></p>
          </div>
        </div>
      )}

      {/* Visual Image Popup Modal */}
      {selectedVisual && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center p-4" onClick={() => setSelectedVisual(null)}>
          <div className="absolute inset-0 bg-black/80" />
          <div className="relative max-w-3xl w-full rounded-xl border border-white/20 bg-[color:rgb(45,28,16)/0.9] backdrop-blur-md p-4 shadow-[0_15px_50px_rgba(20,12,8,0.8)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-white text-lg font-semibold">Visual Preview</h2>
              <button type="button" className="ms-auto text-white/80 hover:text-white text-sm border border-white/20 rounded px-3 py-1" onClick={() => setSelectedVisual(null)}>✕</button>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/15">
              <Image alt="Visual sample" src={selectedVisual} fill className="object-cover" unoptimized />
            </div>
          </div>
        </div>
      )}

      {/* Fixed footer at absolute bottom */}
      <div className="pointer-events-none fixed bottom-2 left-0 right-0 z-20 flex items-center justify-center px-4">
        <div className="pointer-events-auto text-white/90 text-xs sm:text-sm rounded-full border border-white/25 bg-[color:rgb(45,28,16)/0.8] backdrop-blur-md px-3 py-1.5 shadow-[0_8px_25px_rgba(20,12,8,0.7)]">
          © {new Date().getFullYear()} Figion Team • <a href="https://figion.tech" target="_blank" rel="noreferrer" className="hover:underline">figion.tech</a> • Built by Berk Kaya
        </div>
      </div>

      {/* Hide default scrollbars globally + animations */}
      <style jsx global>{`
        ::-webkit-scrollbar { width: 0; height: 0; }
        * { scrollbar-width: none; }
        /* Background gentle pan/zoom */
        .bg-motion { animation: bgZoomPan 40s ease-in-out infinite alternate; transform-origin: center; }
        @keyframes bgZoomPan {
          0% { transform: scale(1) translate3d(0,0,0); }
          50% { transform: scale(1.05) translate3d(1.5%, -1.5%, 0); }
          100% { transform: scale(1.1) translate3d(-1.5%, 1.5%, 0); }
        }
        /* Reveal on scroll */
        .reveal { opacity: 0; transform: translateY(14px); transition: opacity .6s ease, transform .6s ease; }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        /* Particles */
        .particle { animation-name: particleRise, twinkle; animation-timing-function: linear, ease-in-out; animation-iteration-count: infinite, infinite; bottom: -10vh; }
        @keyframes particleRise { to { transform: translateY(-120vh); } }
        @keyframes twinkle { 0%,100% { filter: blur(0); opacity: .2; } 50% { filter: blur(1px); opacity: .4; } }
      `}</style>
    </div>
  );
}


