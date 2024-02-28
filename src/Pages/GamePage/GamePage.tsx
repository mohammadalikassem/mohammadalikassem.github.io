import { StatsGl } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Drone } from "./Drone";
import { Sky } from "./Sky/Sky";

const GamePage: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ fov: 45 }}>
        <ambientLight />
        <StatsGl />
        {/* <OrbitControls /> */}
        <Sky />
        {/* <CameraShake /> */}
        <Drone />
      </Canvas>
    </div>
  );
};

export default GamePage;
