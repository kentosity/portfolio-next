"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, RoundedBox } from "@react-three/drei";
import { useEffect, useState, type ReactNode } from "react";
import type { CabinetProject, ObjectKind } from "./projects";

type Vector3 = [number, number, number];
type SceneProps = {
  projects: CabinetProject[];
  inspecting?: boolean;
  rotation?: number;
  onSelect?: (project: CabinetProject) => void;
  onHover?: (link: string | null) => void;
  onReady: () => void;
  onUnavailable: () => void;
};

const ivory = "#f1ecda";
const ink = "#364f50";
const coral = "#d77c57";
const mint = "#76a9a0";

function Block({ position = [0, 0, 0], size, color, radius = 0.04, rotation, children }: {
  position?: Vector3;
  size: Vector3;
  color: string;
  radius?: number;
  rotation?: Vector3;
  children?: ReactNode;
}) {
  return <RoundedBox args={size} position={position} radius={radius} smoothness={2} rotation={rotation} castShadow receiveShadow><meshStandardMaterial color={color} roughness={0.5} />{children}</RoundedBox>;
}

function Disc({ position, radius, depth, color, rotation = [0, 0, 0] }: {
  position: Vector3; radius: number; depth: number; color: string; rotation?: Vector3;
}) {
  return <mesh position={position} rotation={rotation} castShadow receiveShadow><cylinderGeometry args={[radius, radius, depth, 40]} /><meshStandardMaterial color={color} roughness={0.5} metalness={0.08} /></mesh>;
}

function Ring({ position, radius, thickness, color, rotation = [0, 0, 0] }: {
  position: Vector3; radius: number; thickness: number; color: string; rotation?: Vector3;
}) {
  return <mesh position={position} rotation={rotation} castShadow><torusGeometry args={[radius, thickness, 10, 48]} /><meshStandardMaterial color={color} roughness={0.42} /></mesh>;
}

function DataObject() {
  return <group rotation={[0, -0.18, 0]}>
    {[0, 1, 2].map((level) => <group key={level} position={[0, 0.23 + level * 0.43, 0]}>
      <Disc position={[0, 0, 0]} radius={0.55} depth={0.39} color={ivory} />
      <Disc position={[0, -0.145, 0]} radius={0.555} depth={0.045} color={level === 1 ? mint : "#a2b7ad"} />
      <Block position={[0.17, 0.01, 0.525]} size={[0.24, 0.045, 0.025]} color={coral} radius={0.014} />
      <Disc position={[-0.22, 0.01, 0.52]} radius={0.025} depth={0.025} color={ink} rotation={[Math.PI / 2, 0, 0]} />
    </group>)}
    <Ring position={[0, 1.295, 0]} radius={0.31} thickness={0.025} color={mint} rotation={[-Math.PI / 2, 0, 0]} />
    <Disc position={[0, 1.285, 0]} radius={0.12} depth={0.02} color={coral} />
  </group>;
}

function SpeechObject() {
  return <group rotation={[0, -0.24, 0]}>
    <Block position={[0, 0.73, 0]} size={[1.08, 1.4, 0.68]} color={ivory} radius={0.13} />
    <Block position={[0, 1.58, 0]} size={[0.6, 0.1, 0.12]} color={coral} radius={0.045} />
    {[-1, 1].map((side) => <Block key={side} position={[side * 0.28, 1.47, 0]} size={[0.1, 0.27, 0.12]} color={coral} radius={0.04} />)}
    <Disc position={[0, 0.85, 0.35]} radius={0.37} depth={0.055} color={coral} rotation={[Math.PI / 2, 0, 0]} />
    <Disc position={[0, 0.85, 0.39]} radius={0.294} depth={0.035} color={ink} rotation={[Math.PI / 2, 0, 0]} />
    <Ring position={[0, 0.85, 0.416]} radius={0.215} thickness={0.012} color="#88958a" />
    <Disc position={[0, 0.85, 0.418]} radius={0.13} depth={0.055} color="#76867b" rotation={[Math.PI / 2, 0, 0]} />
    <Block position={[-0.1, 0.28, 0.35]} size={[0.32, 0.032, 0.025]} color={ink} radius={0.01} />
    <Disc position={[0.3, 0.28, 0.355]} radius={0.05} depth={0.035} color={coral} rotation={[Math.PI / 2, 0, 0]} />
    {[-1, 1].map((side) => <Block key={side} position={[side * 0.32, 0.03, 0]} size={[0.17, 0.07, 0.38]} color={ink} radius={0.025} />)}
  </group>;
}

function EventObject({ inspecting }: { inspecting: boolean }) {
  const ticketHeight = inspecting ? 0.73 : 0.48;

  return <group rotation={[0, -0.23, 0]}>
    <Block position={[0, 0.75, 0]} size={[1.05, 1.45, 0.72]} color={coral} radius={0.1} />
    <Block position={[0, 1.02, 0.37]} size={[0.73, 0.5, 0.035]} color={ivory} radius={0.04} />
    <Ring position={[-0.13, 1.04, 0.394]} radius={0.09} thickness={0.018} color={ink} />
    <Block position={[0.2, 1.09, 0.397]} size={[0.18, 0.022, 0.008]} color={ink} radius={0.005} />
    <Block position={[0.17, 1, 0.397]} size={[0.12, 0.022, 0.008]} color={ink} radius={0.005} />
    <Block position={[0, 0.865, 0.397]} size={[0.5, 0.022, 0.008]} color={mint} radius={0.005} />
    <Block position={[0, 0.48, 0.376]} size={[0.74, 0.09, 0.055]} color={ink} radius={0.03} />
    <group position={[0, 0.48 - ticketHeight / 2, 0.42]} rotation={[-0.13, 0, 0]}>
      <Block size={[0.51, ticketHeight, 0.012]} color={ivory} radius={0.005} />
      {[0, 1, 2].map((line) => <Block key={line} position={[-0.02, ticketHeight / 2 - 0.15 - line * 0.075, 0.012]} size={[line === 1 ? 0.2 : 0.32, 0.018, 0.005]} color={line === 2 ? mint : ink} radius={0.004} />)}
    </group>
    <Disc position={[0.31, 1.49, 0]} radius={0.08} depth={0.055} color={ivory} />
  </group>;
}

function SearchObject() {
  return <group rotation={[0, -0.28, 0]}>
    <Block position={[0, 0.08, 0.01]} size={[1.15, 0.15, 0.8]} color={ivory} radius={0.06} />
    <group rotation={[0, 0, -0.24]} position={[0.03, 0.09, 0]}>
      <Block position={[0, 0.37, 0]} size={[0.14, 0.65, 0.16]} color="#467d77" radius={0.05} />
      <Disc position={[0, 1.02, 0]} radius={0.57} depth={0.17} color="#467d77" rotation={[Math.PI / 2, 0, 0]} />
      <Disc position={[0, 1.02, 0.1]} radius={0.53} depth={0.08} color={mint} rotation={[Math.PI / 2, 0, 0]} />
      <Disc position={[0, 1.02, 0.148]} radius={0.43} depth={0.025} color="#e6eddb" rotation={[Math.PI / 2, 0, 0]} />
      <Ring position={[0, 1.02, 0.164]} radius={0.27} thickness={0.009} color={mint} />
      <Block position={[0, 1.02, 0.165]} size={[0.65, 0.012, 0.008]} color={mint} radius={0.003} />
      <Block position={[0, 1.02, 0.165]} size={[0.012, 0.65, 0.008]} color={mint} radius={0.003} />
      <Disc position={[0, 1.02, 0.18]} radius={0.055} depth={0.015} color={coral} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  </group>;
}

function WorkingObject({ kind, inspecting = false }: { kind: ObjectKind; inspecting?: boolean }) {
  switch (kind) {
    case "data": return <DataObject />;
    case "speech": return <SpeechObject />;
    case "events": return <EventObject inspecting={inspecting} />;
    case "search": return <SearchObject />;
  }
}

function SceneContents({ projects, inspecting, rotation = 0, onSelect, onHover, onReady, onUnavailable }: SceneProps) {
  const { size, gl } = useThree();
  const isNarrow = window.matchMedia("(max-width: 650px)").matches;
  const columns = isNarrow ? 2 : 4;
  const cameraPosition: Vector3 = inspecting ? [0, 1.7, 6] : [0, isNarrow ? 3.8 : 2.9, 11];
  const cameraZoom = inspecting ? Math.min(size.width / 3.4, size.height / 2.7) : isNarrow ? Math.min(size.width / 4.7, size.height / 5.6) : size.width / 9.9;
  const verticalProjection = Math.cos(Math.atan2(2.9, 11));
  const spacing = size.width / (cameraZoom * columns);
  const rowHeight = size.height / (cameraZoom * 2 * verticalProjection);
  const topShelfHeight = 0.9 + 72 / (cameraZoom * verticalProjection);
  const cabinetWidth = size.width / cameraZoom + (isNarrow ? 0.2 : 0);
  const cabinetHeight = isNarrow ? rowHeight * 2 + 0.4 : 3;

  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      onUnavailable();
    };
    gl.domElement.addEventListener("webglcontextlost", handleContextLost);
    onReady();
    return () => gl.domElement.removeEventListener("webglcontextlost", handleContextLost);
  }, [gl, onReady, onUnavailable]);

  return <>
    <OrthographicCamera makeDefault position={cameraPosition} zoom={cameraZoom} near={0.1} far={100} onUpdate={(camera) => { camera.lookAt(0, inspecting ? 0.75 : isNarrow ? 0.9 : 0.5, 0); camera.updateProjectionMatrix(); }} />
    <ambientLight intensity={2.1} />
    <hemisphereLight args={["#fff9e9", "#6582a1", 1.2]} />
    <directionalLight position={[-3, 6, 5]} intensity={2.3} castShadow shadow-radius={3} shadow-mapSize={[1024, 1024]} shadow-camera-left={-6} shadow-camera-right={6} shadow-camera-top={6} shadow-camera-bottom={-4} shadow-normalBias={0.025} shadow-bias={-0.0002} />
    <directionalLight position={[4, 2, 3]} intensity={0.8} color="#e2efff" />
    {inspecting ? <>
      <group rotation={[0, rotation, 0]}><WorkingObject kind={projects[0].kind} inspecting /></group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow><planeGeometry args={[200, 200]} /><shadowMaterial transparent opacity={0.14} /></mesh>
      <OrbitControls makeDefault target={[0, 0.75, 0]} enablePan={false} enableZoom={false} enableDamping={false} minPolarAngle={0.35} maxPolarAngle={Math.PI * 0.7} />
    </> : <>
      <Block position={[0, 0.75, -0.85]} size={[cabinetWidth, cabinetHeight, 0.18]} color="#a8c1d8" radius={0.01} />
      {projects.map((project, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const x = (column - (columns - 1) / 2) * spacing;
        const y = isNarrow ? topShelfHeight - row * rowHeight : -0.3;

        return <group key={project.link} position={[x, y, 0]}>
          <Block position={[0, -0.11, -0.15]} size={[spacing - 0.02, 0.17, 1.65]} color="#b7ccdf" radius={0.015} />
          <group
            onClick={(event) => { event.stopPropagation(); onSelect?.(project); }}
            onPointerOver={(event) => { event.stopPropagation(); gl.domElement.style.cursor = "pointer"; onHover?.(project.link); }}
            onPointerOut={() => { gl.domElement.style.cursor = "auto"; onHover?.(null); }}
          >
            <WorkingObject kind={project.kind} />
          </group>
        </group>;
      })}
      {Array.from({ length: columns - 1 }, (_, index) => <Block key={index} position={[(index - (columns - 2) / 2) * spacing, isNarrow ? 0.65 : 0.75, -0.22]} size={[0.055, isNarrow ? cabinetHeight : 2.3, 1.45]} color="#b7ccdf" radius={0.01} />)}
    </>}
  </>;
}

export default function CabinetScene(props: SceneProps) {
  const [hovering, setHovering] = useState(false);

  return <Canvas
    orthographic
    camera={{ position: [0, 2.9, 11], near: 0.1, far: 100, zoom: 100 }}
    dpr={[1, 1.5]}
    frameloop="demand"
    shadows="percentage"
    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    style={{ cursor: props.inspecting ? hovering ? "grabbing" : "grab" : "auto", touchAction: props.inspecting ? "none" : "pan-y" }}
    onPointerDown={() => setHovering(true)}
    onPointerUp={() => setHovering(false)}
    fallback={null}
  ><SceneContents {...props} /></Canvas>;
}
