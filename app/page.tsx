'use client'

import { useFrame, Vector3 } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useRef, useState } from "react";
import Map from "react-map-gl/maplibre";
import { Mesh } from "three";
import { Canvas } from "react-three-map/maplibre";

//export default { title: "Canvas" };

const Box: FC<{ position: Vector3 }> = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>(null);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_state, delta) => (ref.current!.rotation.x += delta));
  useFrame((_state, delta) => (ref.current!.rotation.z -= delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

export default function Home() {
  return (
    
      <Map
        antialias
        initialViewState={{
          latitude: 51,
          longitude: 0,
          zoom: 13,
          pitch: 60,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <Canvas latitude={51} longitude={0}>
          <hemisphereLight
            args={["#ffffff", "#60666C",3.14]}
            position={[1, 4.5, 3]}
          />
          <object3D scale={500}>
            <Box position={[-1.2, 1, 0]} />
            <Box position={[1.2, 1, 0]} />
          </object3D>
          <group scale={20}>
            <Environment preset="city" background />
          </group>
        </Canvas>
      </Map>
    
  );
}

/*
export default function Home() {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
      <Map
        antialias
        initialViewState={{
          latitude: 51,
          longitude: 0,
          zoom: 13,
          pitch: 60,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <Canvas latitude={51} longitude={0}>
          <hemisphereLight
            args={["#ffffff", "#60666C",3.14]}
            position={[1, 4.5, 3]}
          />
          <object3D scale={500}>
            <Box position={[-1.2, 1, 0]} />
            <Box position={[1.2, 1, 0]} />
          </object3D>
          <Environment preset="city" background />
        </Canvas>
      </Map>
    </div>
  );
}
*/