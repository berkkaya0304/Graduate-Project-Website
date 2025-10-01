"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Scroll, OrbitControls } from "@react-three/drei";

function SpinningShape() {
  const ref = useRef<any>(null);
  const scroll = useScroll();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const offset = scroll.offset; // 0..1 across all pages

    const baseRotationX = t * 0.15;
    const baseRotationY = t * 0.25;

    if (ref.current) {
      // Smooth, scroll-driven transforms
      ref.current.rotation.x = baseRotationX + offset * Math.PI * 1.25;
      ref.current.rotation.y = baseRotationY + offset * Math.PI * 2.0;
      ref.current.position.y = (offset - 0.5) * 1.6; // small vertical travel

      const scale = 1 + offset * 0.8; // grow while scrolling
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#2563eb" metalness={0.35} roughness={0.25} />
    </mesh>
  );
}

export default function ScrollHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Keep the wrapper height large so that the canvas stays pinned while we scroll through pages
  // The Canvas itself is sticky via drei's ScrollControls
  const lightPosition = useMemo<[number, number, number]>(() => [3, 4, 2], []);

  return (
    <div className="relative h-[180vh] rounded-xl overflow-hidden border border-[var(--border)]">
      {!mounted ? null : (
      <Canvas key="scroll-hero-canvas" shadows camera={{ position: [2.4, 1.6, 2.6], fov: 50 }}>
        <color attach="background" args={["#060a12"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={lightPosition} intensity={1.1} castShadow />

        {/* pages: total virtual scroll length; 2.5 means ~250vh of scroll inside pinned canvas */}
        <ScrollControls pages={2.5} damping={0.18} distance={1}>
          <SpinningShape />
          {/* Optional: lock camera orbit for subtle parallax while allowing touch rotate if desired */}
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />

          {/* Overlay HTML content that scrolls on top of 3D */}
          <Scroll html>
            <div className="h-[250vh] w-full pointer-events-none">
              <div className="sticky top-10 mx-auto max-w-2xl px-6">
                <h2 className="text-2xl sm:text-3xl font-semibold">Bitirme Projesi</h2>
                <p className="mt-2 opacity-90">Aşağı kaydırdıkça 3D sahne akıcı şekilde ilerler.</p>
              </div>
              <div className="mt-[60vh] mx-auto max-w-2xl px-6">
                <h3 className="text-xl font-medium">Proje Odakları</h3>
                <p className="mt-2 opacity-80 text-sm">Teknoloji yığını, tasarım prensipleri ve ekip çalışma biçimi.</p>
              </div>
              <div className="mt-[60vh] mx-auto max-w-2xl px-6">
                <h3 className="text-xl font-medium">Sonuçlar</h3>
                <p className="mt-2 opacity-80 text-sm">Prototip, raporlar ve sunum materyalleri.</p>
              </div>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12),transparent_60%)]" />
    </div>
  );
}


