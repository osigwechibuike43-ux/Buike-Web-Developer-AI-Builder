import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BROWN = '#8B654A';
const CHOCOLATE = '#30241E';
const BEIGE = '#F4EFEA';

/** Pointer position in normalised device coordinates, shared without re-rendering React. */
const pointer = { x: 0, y: 0 };

/** Eases the whole scene toward the pointer for a subtle parallax. */
function Rig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-dt * 3);
    g.rotation.y += (pointer.x * 0.35 - g.rotation.y) * k;
    g.rotation.x += (-pointer.y * 0.22 - g.rotation.x) * k;
  });
  return <group ref={group}>{children}</group>;
}

/** Slow bob and spin around a fixed position. */
function Floating({ position, speed = 1, spin = 0.2, children }: { position: [number, number, number]; speed?: number; spin?: number; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame(({ clock }, dt) => {
    const g = ref.current;
    if (!g) return;
    g.position.y = position[1] + Math.sin(clock.elapsedTime * speed + phase) * 0.18;
    g.rotation.y += dt * spin;
    g.rotation.x += dt * spin * 0.5;
  });
  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        pos: new THREE.Vector3((Math.random() - 0.5) * 6.4, (Math.random() - 0.5) * 6, -1.5 + Math.random() * 2.5),
        s: 0.04 + Math.random() * 0.07,
        speed: 0.4 + Math.random() * 0.8,
        phase: Math.random() * 6.28,
        brown: i % 3 === 0,
      })),
    [],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    items.forEach((it, i) => {
      dummy.position.set(it.pos.x, it.pos.y + Math.sin(clock.elapsedTime * it.speed + it.phase) * 0.25, it.pos.z);
      dummy.scale.setScalar(it.s);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  useEffect(() => {
    const m = ref.current;
    if (!m) return;
    const c = new THREE.Color();
    items.forEach((it, i) => m.setColorAt(i, c.set(it.brown ? BROWN : BEIGE)));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [items]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial roughness={0.5} />
    </instancedMesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.3} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#fff4e8" />
      <pointLight position={[-5, -2, 3]} intensity={18} color={BROWN} distance={14} />

      <Rig>
        {/* Chocolate sphere, lower left, partly behind the portrait card */}
        <Floating position={[-2.35, -1.7, -1]} speed={0.7} spin={0.08}>
          <mesh>
            <sphereGeometry args={[0.72, 48, 48]} />
            <meshPhysicalMaterial color={CHOCOLATE} roughness={0.28} metalness={0.1} clearcoat={0.8} clearcoatRoughness={0.2} />
          </mesh>
        </Floating>

        {/* Brown ring, upper right */}
        <Floating position={[2.3, 1.8, -0.6]} speed={0.9} spin={0.35}>
          <mesh rotation={[1.1, 0.3, 0]}>
            <torusGeometry args={[0.6, 0.17, 32, 72]} />
            <meshPhysicalMaterial color={BROWN} roughness={0.32} metalness={0.35} clearcoat={0.5} />
          </mesh>
        </Floating>

        {/* Beige slab, upper left */}
        <Floating position={[-2.65, 1.9, -0.4]} speed={1.1} spin={0.25}>
          <mesh rotation={[0.4, 0.5, 0.2]}>
            <boxGeometry args={[0.7, 0.7, 0.22]} />
            <meshStandardMaterial color={BEIGE} roughness={0.55} metalness={0.05} />
          </mesh>
        </Floating>

        {/* Wireframe polyhedron around a solid core, lower right */}
        <Floating position={[2.3, -1.9, -0.2]} speed={0.8} spin={0.3}>
          <mesh>
            <icosahedronGeometry args={[0.6, 1]} />
            <meshBasicMaterial color={BROWN} wireframe />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.36, 0]} />
            <meshStandardMaterial color={CHOCOLATE} roughness={0.4} flatShading />
          </mesh>
        </Floating>

        <Particles />
      </Rig>
    </>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      aria-hidden
    >
      <Scene />
    </Canvas>
  );
}
