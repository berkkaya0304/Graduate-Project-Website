"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, ScrollControls, useScroll, Scroll } from "@react-three/drei";
import * as THREE from "three";
import { teamMembers } from "@/data/team";

function FlowFieldParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 4000;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 * Math.random();
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4;
      arr[i * 3 + 0] = Math.cos(theta) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(theta) * r;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const obj = ref.current as any;
    if (!obj) return;
    const a = (obj.geometry.attributes.position.array as Float32Array);
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const x = a[ix + 0];
      const z = a[ix + 2];
      const flow = Math.sin(0.12 * x + t * 0.35) + Math.cos(0.1 * z - t * 0.28);
      a[ix + 1] += 0.0018 * flow;
    }
    obj.geometry.attributes.position.needsUpdate = true;
  });

  const geom = useMemo(() => new THREE.BufferGeometry(), []);
  geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = useMemo(() => new THREE.PointsMaterial({ size: 0.02, color: new THREE.Color("#86efac"), transparent: true, opacity: 0.85 }), []);

  // Multi-color palette that lerps with scroll/time
  const scroll = useScroll();
  const palette = useMemo(() => [
    new THREE.Color("#86efac"), // green
    new THREE.Color("#60a5fa"), // blue
    new THREE.Color("#f59e0b"), // amber
    new THREE.Color("#f472b6"), // pink
  ], []);

  useFrame(() => {
    const o = THREE.MathUtils.clamp(scroll.offset, 0, 1);
    const seg = o * (palette.length - 1);
    const i = Math.floor(seg);
    const t = seg - i;
    const c1 = palette[i];
    const c2 = palette[Math.min(palette.length - 1, i + 1)];
    const r = THREE.MathUtils.lerp(c1.r, c2.r, t);
    const g = THREE.MathUtils.lerp(c1.g, c2.g, t);
    const b = THREE.MathUtils.lerp(c1.b, c2.b, t);
    (mat as any).color.setRGB(r, g, b);
  });

  return <points ref={ref} geometry={geom} material={mat as any} />;
}

// Wireframe sphere removed to eliminate straight lines in the background

function CameraRig() {
  const { camera } = useThree();
  const scroll = useScroll();
  const lookAtTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const sections = useMemo(() => (
    [
      { cam: new THREE.Vector3(2.4, 1.8, 2.6), color: "#4f8cff" },
      { cam: new THREE.Vector3(0.8, 1.2, 3.2), color: "#10b981" },
      { cam: new THREE.Vector3(-2.2, 1.6, 2.8), color: "#f59e0b" },
      { cam: new THREE.Vector3(0.2, 2.4, 2.0), color: "#ef4444" },
    ]
  ), []);

  useFrame(() => {
    const o = THREE.MathUtils.clamp(scroll.offset, 0, 1);
    // 4 sections -> 0..1 split in quarters
    const idx = Math.min(2, Math.floor(o * 4));
    const localT = (o * 4) - idx; // 0..1 within section

    const from = sections[idx];
    const to = sections[idx + 1] || sections[idx];

    const targetPos = new THREE.Vector3().copy(from.cam).lerp(to.cam, THREE.MathUtils.smoothstep(localT, 0, 1));
    camera.position.lerp(targetPos, 0.1);
    camera.lookAt(lookAtTarget);
  });

  return null;
}

export default function Full3DPageClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="fixed inset-0 m-0 p-0">
      {!mounted ? null : (
        <Canvas key="full3d-canvas" dpr={[1, 1.8]} shadows={false} camera={{ position: [2.4, 1.8, 2.6], fov: 50 }}>
          <color attach="background" args={["#07120a"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 2]} intensity={0.8} />
          <ScrollControls pages={4} damping={0.16} distance={1}>
            <CameraRig />
            <group>
              <FlowFieldParticles />
            </group>

            <Scroll html>
              <div className="h-[480vh] w-full">
                <div className="sticky top-16 mx-auto max-w-3xl px-6 text-center">
                  <div className="mx-auto inline-block rounded-xl border border-white/15 bg-[color:rgb(0,0,0)/0.35] backdrop-blur-md px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
                    <h1 className="text-white text-4xl sm:text-6xl font-semibold tracking-tight" style={{textShadow:"0 2px 8px rgba(0,0,0,0.6)"}}>Bitirme 3D Deneyimi</h1>
                    <p className="mt-3 text-white/90 text-base sm:text-lg" style={{textShadow:"0 1px 6px rgba(0,0,0,0.6)"}}>Doğa ve Sürdürülebilirlik temalı 3D anlatım</p>
                  </div>
                </div>

                <div className="mt-[80vh] mx-auto max-w-4xl px-6">
                  <div className="rounded-xl border border-white/15 bg-[color:rgb(0,0,0)/0.35] backdrop-blur-md p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                  <h2 className="text-white text-3xl font-semibold" style={{textShadow:"0 2px 8px rgba(0,0,0,0.5)"}}>Proje Bilgileri</h2>
                  <p className="mt-2 text-white/90 text-base" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>Gerçek bir senaryoya dayalı, uçtan uca web uygulaması.</p>
                  <div className="mt-4 grid sm:grid-cols-2 gap-4">
                    {[
                      { name: "Next.js 15", desc: "App Router, RSC, performans" },
                      { name: "React 19", desc: "Concurrent, modern lifecycle" },
                      { name: "TypeScript", desc: "Tür güvenliği ve DX" },
                      { name: "Three.js", desc: "3D sahne ve etkileşim" },
                    ].map((t) => (
                      <div key={t.name} className="p-5 rounded-lg border border-white/15 bg-[color:rgb(0,0,0)/0.25]">
                        <div className="text-white font-medium text-lg" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>{t.name}</div>
                        <div className="text-white/90 text-sm" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>{t.desc}</div>
                      </div>
                    ))}
                  </div>
                  <ul className="mt-4 text-white/90 list-disc ms-5 space-y-1 text-base" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>
                    <li>Mimari: Server/Client bileşen ayrımı, dosya tabanlı yönlendirme</li>
                    <li>UI: Tailwind v4 ile modüler, erişilebilir bileşenler</li>
                    <li>Performans: Lazy yükleme ve 3D optimizasyonları</li>
                  </ul>
                  </div>
                </div>

                <div className="mt-[80vh] mx-auto max-w-5xl px-6">
                  <div className="rounded-xl border border-white/15 bg-[color:rgb(0,0,0)/0.35] backdrop-blur-md p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                  <h2 className="text-white text-2xl font-semibold" style={{textShadow:"0 2px 8px rgba(0,0,0,0.5)"}}>Takım</h2>
                  <p className="mt-2 text-white/90" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>Disiplinler arası ekip çalışması ve sorumluluk paylaşımı.</p>
                  <div className="mt-2 text-white/90 text-sm" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>Toplam üye: <span className="font-medium text-white">{teamMembers.length}</span></div>
                  <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {teamMembers.map((m) => (
                      <div key={m.name} className="p-4 rounded-lg border border-white/15 bg-[color:rgb(0,0,0)/0.25] flex items-start gap-3">
                        {m.avatarUrl ? (
                          <img alt={m.name} src={m.avatarUrl} className="size-10 rounded-full bg-white/10 object-cover" />
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
                </div>

                <div className="mt-[80vh] mx-auto max-w-5xl px-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-white/15 bg-[color:rgb(0,0,0)/0.35] backdrop-blur-md p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                      <h2 className="text-white text-2xl font-semibold" style={{textShadow:"0 2px 8px rgba(0,0,0,0.5)"}}>Raporlar</h2>
                      <p className="mt-2 text-white/90 text-sm" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>PDF dokümanlarınızı burada toplayın.</p>
                      <ul className="mt-3 text-white/90 text-sm list-disc ms-5 space-y-1">
                        <li>Analiz Raporu</li>
                        <li>Tasarım Dökümü</li>
                        <li>Kullanıcı Testi Sonuçları</li>
                      </ul>
                      <p className="mt-2 text-white/70 text-xs">Klasör: <code className="font-mono">public/pdfs</code></p>
                    </div>
                    <div className="rounded-xl border border-white/15 bg-[color:rgb(0,0,0)/0.35] backdrop-blur-md p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                      <h2 className="text-white text-2xl font-semibold" style={{textShadow:"0 2px 8px rgba(0,0,0,0.5)"}}>Fotoğraflar</h2>
                      <p className="mt-2 text-white/90 text-sm" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>Görsel çıktılarınızı buraya ekleyin.</p>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {["/photos/sample1.jpg","/photos/sample2.jpg","/photos/sample3.jpg"].map((src) => (
                          <div key={src} className="aspect-[4/3] rounded bg-white/10 border border-white/10 grid place-items-center text-[10px] text-white/60">Örnek</div>
                        ))}
                      </div>
                      <p className="mt-2 text-white/70 text-xs">Klasör: <code className="font-mono">public/photos</code></p>
                    </div>
                  </div>
                </div>

                <div className="mt-[80vh] mx-auto max-w-4xl px-6">
                  <div className="rounded-xl border border-white/15 bg-[color:rgb(0,0,0)/0.35] backdrop-blur-md p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                  <h2 className="text-white text-2xl font-semibold" style={{textShadow:"0 2px 8px rgba(0,0,0,0.5)"}}>Sürdürülebilir Kalkınma Amaçları</h2>
                  <p className="mt-2 text-white/90" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>Proje; çevresel sürdürülebilirlik ve toplumsal etki perspektifiyle kurgulandı.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["İklim Eylemi (SDG 13)", "Sorumlu Üretim/Tüketim (SDG 12)", "Sağlık ve Kaliteli Yaşam (SDG 3)", "Nitelikli Eğitim (SDG 4)"].map((s) => (
                      <span key={s} className="text-[11px] px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white/90" style={{textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>{s}</span>
                    ))}
                  </div>
                  </div>
                </div>

                <div className="mt-[60vh]" />
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      )}
      {/* Fixed right sidebar (sticky info) */}
      <aside className="pointer-events-auto fixed top-24 right-6 w-[320px] max-w-[86vw] z-30">
        <div className="rounded-xl border border-white/15 bg-[color:rgb(0,0,0)/0.45] backdrop-blur-md p-5 shadow-[0_10px_40px_rgba(0,0,0,0.45)] space-y-4">
          <div>
            <div className="text-white/90 text-sm">Takım Üyeleri</div>
            <div className="text-white text-2xl font-semibold mt-1">{teamMembers.length}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {teamMembers.slice(0,6).map((m) => (
                <span key={m.name} className="text-[10px] px-2 py-0.5 rounded-full border border-white/20 text-white/90">{m.role}</span>
              ))}
            </div>
          </div>
          <div className="h-px bg-white/10" />
          <div>
            <div className="text-white/90 text-sm">Proje</div>
            <ul className="mt-1 text-white/85 text-xs space-y-1">
              <li>Next.js 15 • React 19 • TS</li>
              <li>App Router • RSC</li>
              <li>Three.js 3D sahne</li>
            </ul>
          </div>
          <div className="h-px bg-white/10" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-white/90 text-sm">Raporlar</div>
              <p className="text-white/70 text-xs mt-1">public/pdfs</p>
            </div>
            <div>
              <div className="text-white/90 text-sm">Fotoğraflar</div>
              <p className="text-white/70 text-xs mt-1">public/photos</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Scroll hint */}
      <div className="pointer-events-none fixed bottom-16 left-1/2 -translate-x-1/2 z-30">
        <div className="rounded-full border border-white/20 bg-[color:rgb(0,0,0)/0.45] backdrop-blur-md px-4 py-2 text-white/90 text-xs shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          Kaydırarak sahneyi hareket ettirebilirsiniz
        </div>
      </div>

      {/* Fixed footer at absolute bottom */}
      <div className="pointer-events-none fixed bottom-2 left-0 right-0 z-20 flex items-center justify-center px-4">
        <div className="pointer-events-auto text-white/70 text-xs sm:text-sm rounded-full border border-white/15 bg-[color:rgb(0,0,0)/0.45] backdrop-blur-md px-3 py-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
          © {new Date().getFullYear()} Bitirme Takımı • Hazırlayan: Berk Kaya
        </div>
      </div>

      {/* Hide default scrollbars globally */}
      <style jsx global>{`
        ::-webkit-scrollbar { width: 0; height: 0; }
        * { scrollbar-width: none; }
      `}</style>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.10),transparent_60%)]" />
    </div>
  );
}


