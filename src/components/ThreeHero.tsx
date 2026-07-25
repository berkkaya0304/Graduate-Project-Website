"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function SpinningIcosahedron() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.3;
      ref.current.rotation.y += delta * 0.4;
    }
  });
  return (
    <mesh ref={ref} scale={1.2} castShadow receiveShadow>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#2563eb" metalness={0.4} roughness={0.2} />
    </mesh>
  );
}

export default function ThreeHero() {
  return (
    <div className="relative h-[340px] sm:h-[420px] rounded-xl overflow-hidden border border-[var(--border)]">
      <Canvas shadows camera={{ position: [2.4, 1.8, 2.4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={1.2} castShadow />
        <group position={[0, 0, 0]}>
          <SpinningIcosahedron />
        </group>
        <Stars radius={80} depth={50} count={3000} factor={4} fade speed={1} />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate autoRotate autoRotateSpeed={0.6} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_60%)]" />
    </div>
  );
}


