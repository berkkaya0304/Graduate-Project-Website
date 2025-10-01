"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Image as DreiImage, ScrollControls, useScroll, Text } from "@react-three/drei";
import { teamMembers } from "@/data/team";

type Member3D = typeof teamMembers[number];

function MemberBillboard({ member, position, index }: { member: Member3D; position: [number, number, number]; index: number }) {
  const ref = useRef<any>(null);
  const scroll = useScroll();

  useFrame((_, delta) => {
    if (!ref.current) return;
    // Each member appears slightly later using scroll offset
    const appearAt = index / Math.max(1, teamMembers.length);
    const offset = scroll.offset; // 0..1
    const visible = Math.min(1, Math.max(0, (offset - appearAt) * 6));
    const scale = 0.5 + visible * 0.8;
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
        </group>
      </Billboard>
    </group>
  );
}

function TeamRig() {
  const rig = useRef<any>(null);
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

  useFrame((state) => {
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
        <MemberBillboard key={m.name} member={m} position={positions[i]} index={i} />
      ))}
    </group>
  );
}

export default function Team3DScroll() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="relative h-[180vh] rounded-xl overflow-hidden border border-[var(--border)]">
      {!mounted ? null : (
      <Canvas key="team3d-canvas" camera={{ position: [0, 2.4, 7], fov: 50 }}>
        <color attach="background" args={["#0a0f1a"]} />
        <hemisphereLight intensity={0.6} groundColor="#0b1220" />
        <directionalLight position={[5, 6, 3]} intensity={1} />
        <ScrollControls pages={2.2} damping={0.18} distance={1}>
          <TeamRig />
        </ScrollControls>
      </Canvas>
      )}
    </div>
  );
}


