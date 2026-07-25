"use client";
import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Image as DreiImage, OrbitControls, Text } from "@react-three/drei";
import { teamMembers } from "@/data/team";
import * as THREE from "three";
import Image from "next/image";

type Member3D = typeof teamMembers[number];

function MemberBillboard({ member, position, selected, onSelect }: {
  member: Member3D;
  position: [number, number, number];
  selected: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = hovered || selected ? 1.15 : 1;
    ref.current.scale.x += (target - ref.current.scale.x) * Math.min(1, delta * 8);
    ref.current.scale.y = ref.current.scale.x;
    ref.current.scale.z = ref.current.scale.x;
  });

  return (
    <group position={position}>
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <group ref={ref}>
          {member.avatarUrl ? (
            <group scale={[1.4, 1.4, 1]}>
              <DreiImage url={member.avatarUrl} toneMapped={false} />
            </group>
          ) : (
            <mesh>
              <circleGeometry args={[0.7, 48]} />
              <meshStandardMaterial color="#1f2937" />
            </mesh>
          )}
          <Text
            position={[0, -1.1, 0]}
            fontSize={0.18}
            color="#e6f0ff"
            anchorX="center"
            anchorY="top"
            maxWidth={2}
          >
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

function TeamScene({ onSelect, selectedIndex }: { onSelect: (i: number) => void; selectedIndex: number | null }) {
  const positions = useMemo(() => {
    const radius = 3.2;
    const yStep = 0.0; // flat circle; can adjust for spiral
    return teamMembers.map((_, i) => {
      const t = (i / Math.max(1, teamMembers.length)) * Math.PI * 2;
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;
      const y = ((i % 5) - 2) * yStep; // slight vertical variety if yStep>0
      return [x, y, z] as [number, number, number];
    });
  }, []);

  const rig = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!rig.current) return;
    const t = state.clock.getElapsedTime();
    rig.current.rotation.y = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <group ref={rig}>
      {teamMembers.map((m, i) => (
        <MemberBillboard
          key={m.name}
          member={m}
          position={positions[i]}
          selected={selectedIndex === i}
          onSelect={() => onSelect(i)}
        />
      ))}
    </group>
  );
}

export default function Team3D() {
  const [selected, setSelected] = useState<number | null>(null);
  const member = selected != null ? teamMembers[selected] : null;

  return (
    <div className="relative h-[420px] rounded-xl overflow-hidden border border-[var(--border)]">
      <Canvas camera={{ position: [0, 2.2, 7], fov: 50 }}>
        <color attach="background" args={["#0a0f1a"]} />
        <hemisphereLight intensity={0.6} groundColor="#0b1220" />
        <directionalLight position={[5, 6, 3]} intensity={1} />
        <TeamScene onSelect={setSelected} selectedIndex={selected} />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate />
      </Canvas>

      {member ? (
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="card p-4 backdrop-blur">
            <div className="flex items-start gap-3">
              {member.avatarUrl ? (
                <Image alt={member.name} src={member.avatarUrl} width={48} height={48} className="size-12 rounded-full bg-[var(--muted)] object-contain p-1" unoptimized />
              ) : null}
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{member.name}</div>
                    <div className="opacity-80 text-sm truncate">{member.role}</div>
                  </div>
                  <button
                    className="text-xs border border-[var(--color-border)] rounded px-2 py-1 hover:border-[var(--color-primary-600)]"
                    onClick={() => setSelected(null)}
                  >
                    Close
                  </button>
                </div>
                {member.bio ? <p className="mt-2 text-sm opacity-90">{member.bio}</p> : null}
                {member.skills && member.skills.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {member.skills.map((s) => (
                      <span key={s} className="text-xs px-2 py-1 rounded-full border border-[var(--color-border)] bg-[color:var(--muted)/0.6]">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="flex items-center gap-3 mt-2 text-sm">
                  {member.github ? (
                    <a className="hover:underline opacity-90" href={member.github} target="_blank" rel="noreferrer">GitHub</a>
                  ) : null}
                  {member.linkedin ? (
                    <a className="hover:underline opacity-90" href={member.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}


