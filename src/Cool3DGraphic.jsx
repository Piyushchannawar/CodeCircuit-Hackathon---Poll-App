import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function PieSlice({ startAngle, endAngle, color }) {
  const shape = new THREE.Shape();

  const radius = 2;
  const angleToRad = (angle) => (angle * Math.PI) / 180;

  shape.moveTo(0, 0);
  shape.absarc(0, 0, radius, angleToRad(startAngle), angleToRad(endAngle), false);
  shape.lineTo(0, 0);

  const geometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshBasicMaterial({ color });

  return <mesh geometry={geometry} material={material} rotation={[-Math.PI / 2, 0, 0]} />;
}

export default function Pie3DChart({ data }) {
  let total = data.reduce((sum, d) => sum + d.value, 0);
  let start = 0;

  return (
    <Canvas camera={{ position: [0, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <OrbitControls />
      {data.map((slice, index) => {
        const angle = (slice.value / total) * 360;
        const component = (
          <PieSlice
            key={index}
            startAngle={start}
            endAngle={start + angle}
            color={slice.color}
          />
        );
        start += angle;
        return component;
      })}
    </Canvas>
  );
}
