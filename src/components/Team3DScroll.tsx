"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Image as DreiImage, ScrollControls, useScroll, Text } from "@react-three/drei";
import { teamMembers } from "@/data/team";
import Image from "next/image";
import * as THREE from "three";

type Member3D = typeof teamMembers[number];

function MemberBillboard({ member, position, index, onSelect }: { member: Member3D; position: [number, number, number]; index: number; onSelect: () => void }) {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!ref.current) return;
    // Each member appears slightly later using scroll offset
    const appearAt = index / Math.max(1, teamMembers.length);
    const offset = scroll.offset; // 0..1
    const visible = Math.min(1, Math.max(0, (offset - appearAt) * 6));
    const scale = 0.5 + visible * 0.8 + (hovered ? 0.2 : 0);
    ref.current.scale.set(scale, scale, scale);
    ref.current.position.y = position[1] + (1 - visible) * 0.6;
    ref.current.rotation.z = (1 - visible) * 0.4;
  });

  return (
    <group position={position}>
      <Billboard follow>
        <group ref={ref}>
          {member.avatarUrl ? (
            <group scale={[1.2, 1.2, 1]}>
              <DreiImage url={member.avatarUrl} toneMapped={false} />
            </group>
          ) : null}
          <Text position={[0, -1, 0]} fontSize={0.16} color="#e6f0ff" anchorX="center" anchorY="top" maxWidth={2}>
            {member.name}\n{member.role}
          </Text>
          <mesh
            position={[0, 0, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(true);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHovered(false);
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            <circleGeometry args={[0.8, 48]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </group>
      </Billboard>
    </group>
  );
}

function TeamRig({ onSelect }: { onSelect: (index: number) => void }) {
  const rig = useRef<THREE.Group>(null);
  const scroll = useScroll();

  const positions = useMemo(() => {
    const radius = 3.2;
    return teamMembers.map((_, i) => {
      const t = (i / Math.max(1, teamMembers.length)) * Math.PI * 2;
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;
      const y = 0;
      return [x, y, z] as [number, number, number];
    });
  }, []);

  useFrame(() => {
    if (!rig.current) return;
    const offset = scroll.offset; // 0..1
    // Rotate the circle and dolly in as we scroll
    rig.current.rotation.y = offset * Math.PI * 2 * 0.5; // half turn over the section
    const baseY = 0;
    rig.current.position.y = baseY + Math.sin(offset * Math.PI) * 0.2;
  });

  return (
    <group ref={rig}>
      {teamMembers.map((m, i) => (
        <MemberBillboard key={m.name} member={m} position={positions[i]} index={i} onSelect={() => onSelect(i)} />
      ))}
    </group>
  );
}

export default function Team3DScroll() {
  const [mounted, setMounted] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member3D | null>(null);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative h-[180vh] rounded-xl overflow-hidden border border-[var(--border)]">
      {!mounted ? null : (
      <Canvas key="team3d-canvas" camera={{ position: [0, 2.4, 7], fov: 50 }}>
        <color attach="background" args={["#0a0f1a"]} />
        <hemisphereLight intensity={0.6} groundColor="#0b1220" />
        <directionalLight position={[5, 6, 3]} intensity={1} />
        <ScrollControls pages={2.2} damping={0.18} distance={1}>
          <TeamRig onSelect={(index) => setSelectedMember(teamMembers[index])} />
        </ScrollControls>
      </Canvas>
      )}

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
            className="relative max-w-lg w-full rounded-xl border border-white/15 bg-[color:rgb(0,0,0)/0.45] backdrop-blur-md p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
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
    </div>
  );
}


