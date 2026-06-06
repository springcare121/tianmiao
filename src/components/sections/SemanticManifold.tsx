'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 自定义 OrbitControls（不依赖 @react-three/drei）
function CustomOrbitControls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef<ThreeOrbitControls | null>(null);

  useEffect(() => {
    const controls = new ThreeOrbitControls(camera, gl.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.5;
    controls.dampingFactor = 0.1;
    controls.enableDamping = true;
    controlsRef.current = controls;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  useFrame(() => {
    controlsRef.current?.update();
  });

  return null;
}

// 正弦曲面流形
function ManifoldSurface({ dragOffset }: { dragOffset: [number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const size = 2.4;
    const segments = 48;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    const positions = geo.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      // 完整正弦曲面：sin(x) * cos(y) 形成波浪地形
      const freq = Math.PI / (size / 2);
      let z = 0.5 * Math.sin(x * freq) * Math.cos(y * freq);
      z += 0.2 * Math.sin(x * freq * 2) * Math.sin(y * freq * 1.5);

      // 拖拽影响：轻微变形
      z += dragOffset[0] * 0.08 * Math.sin(x * 3);
      z += dragOffset[1] * 0.08 * Math.cos(y * 3);

      positions.setZ(i, z);
    }

    geo.computeVertexNormals();
    return geo;
  }, [dragOffset]);

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
      <meshStandardMaterial
        color="#a5b4fc"
        emissive="#c7d2fe"
        emissiveIntensity={0.4}
        transparent
        opacity={0.75}
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  );
}

// 棱锥节点和连线
function PyramidNodes({ dragOffset }: { dragOffset: [number, number] }) {
  const size = 2.4;
  const freq = Math.PI / (size / 2);
  const surfaceOffset = -0.3;

  // 计算正弦曲面上的点位置
  const getSurfaceZ = (x: number, y: number) => {
    let z = 0.5 * Math.sin(x * freq) * Math.cos(y * freq);
    z += 0.2 * Math.sin(x * freq * 2) * Math.sin(y * freq * 1.5);
    z += dragOffset[0] * 0.08 * Math.sin(x * 3);
    z += dragOffset[1] * 0.08 * Math.cos(y * 3);
    return z;
  };

  // 4个底面节点（在正弦曲面上）+ 1个顶点
  const nodes = useMemo(() => {
    const basePositions: [number, number][] = [
      [-0.8, -0.8],
      [0.8, -0.8],
      [0.8, 0.8],
      [-0.8, 0.8],
    ];

    const points: [number, number, number][] = [];
    
    // 4个底面节点
    basePositions.forEach(([px, py]) => {
      const z = getSurfaceZ(px, py);
      // 平面旋转后：(px, z + surfaceOffset, -py)
      points.push([px, z + surfaceOffset, -py]);
    });

    // 顶点（在顶部中央）
    points.push([0, 1.0, 0]);

    return points;
  }, [dragOffset]);

  // 棱锥连线：4个底面节点互相连接 + 都连接到顶点
  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const linePoints: number[] = [];
    
    // 底面四边形（4条边）
    for (let i = 0; i < 4; i++) {
      const next = (i + 1) % 4;
      linePoints.push(...nodes[i], ...nodes[next]);
    }

    // 4条棱线连接到底面节点到顶点
    const apex = nodes[4];
    for (let i = 0; i < 4; i++) {
      linePoints.push(...nodes[i], ...apex);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    return geometry;
  }, [nodes]);

  return (
    <group>
      {/* 底面4个节点 */}
      {nodes.slice(0, 4).map((pos, i) => (
        <mesh key={`base-${i}`} position={pos}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color="#F97316"
            emissive="#FB923C"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
      
      {/* 顶点（更大更亮） */}
      <mesh position={nodes[4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#FB923C"
          emissive="#F97316"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* 棱锥连线 */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color="#6366F1" transparent opacity={0.6} linewidth={2} />
      </lineSegments>
    </group>
  );
}

// 虚线立方体 + 磨砂玻璃面
function DashedCube() {
  const geometry = useMemo(() => {
    const size = 2.8;
    const half = size / 2;
    const vertices = [
      [-half, -half, -half], [half, -half, -half], [half, half, -half], [-half, half, -half],
      [-half, -half, half], [half, -half, half], [half, half, half], [-half, half, half]
    ];
    const edgeIndices = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    const points: number[] = [];
    edgeIndices.forEach(([a, b]) => {
      points.push(...vertices[a], ...vertices[b]);
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  const size = 2.8;
  const half = size / 2;

  return (
    <group>
      {/* 虚线边缘 - 更清晰可见 */}
      <lineSegments geometry={geometry}>
        <lineDashedMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
          dashSize={0.08}
          gapSize={0.04}
        />
      </lineSegments>

      {/* 磨砂玻璃面 - 三个正交面 */}
      {/* XY平面 (底面) */}
      <mesh position={[0, -half, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial
          color="#4F46E5"
          transparent
          opacity={0.15}
          roughness={0.9}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* YZ平面 (侧面) */}
      <mesh position={[-half, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial
          color="#6366F1"
          transparent
          opacity={0.12}
          roughness={0.9}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* XZ平面 (背面) */}
      <mesh position={[0, 0, -half]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial
          color="#F97316"
          transparent
          opacity={0.1}
          roughness={0.9}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// 场景内容
function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const [dragOffset, setDragOffset] = useState<[number, number]>([0, 0]);

  useFrame(() => {
    if (groupRef.current) {
      // 轻微自动旋转
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <DashedCube />
      <ManifoldSurface dragOffset={dragOffset} />
      <PyramidNodes dragOffset={dragOffset} />
    </group>
  );
}

export default function SemanticManifold() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="w-full h-[400px] md:h-[500px] relative">
      <Canvas
        camera={{ position: [4, 3, 4], fov: 45 }}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F97316" />

        <SceneContent />

        <CustomOrbitControls />
      </Canvas>

      {/* 交互提示 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-60">
        {isDragging ? '拖动旋转中...' : '点击拖动旋转'}
      </div>
    </div>
  );
}
