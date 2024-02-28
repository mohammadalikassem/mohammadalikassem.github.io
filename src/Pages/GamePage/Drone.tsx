import { Cloud, Clouds, SpotLight, useFBX } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { Group, Vector3 } from "three";
import { useKeyboard } from "./hooks/useKeyboard";

const cameraOffset = new Vector3(0, 1.5, -3); // Vector representing the offset of the camera from the player's position.
const spotlightOffset = new Vector3(0, -1.5, 3); // Vector representing the offset of the camera from the player's position.

export const Drone: React.FC = () => {
  const fbx = useFBX("game/drone.fbx");
  const mesh = useRef<undefined | Group>(); // Reference to the 3D mesh of the player character.
  const spot = useRef<undefined | Group>();
  //   useLoader();
  const { camera } = useThree();

  //   const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

  const keyboard = useKeyboard();

  useFrame((s) => {
    if (!camera || !mesh?.current || !spot?.current) {
      return;
    }
    camera.manual = true;

    if (keyboard["w"]) {
      mesh.current.position.z += 0.01;
    } else if (keyboard["s"]) {
      mesh.current.position.z -= 0.01;
    }

    if (keyboard["a"]) {
      mesh.current.position.x += 0.01;
    } else if (keyboard["d"]) {
      mesh.current.position.x -= 0.01;
    }

    const newCamPosition = mesh.current.position.clone().add(cameraOffset);
    // mesh.current.quaternion;
    // s.camera.position.lerp(newCamPosition, 0.75);
    // console.log(s.camera.position);

    // s.camera.position.lerp(newCamPosition, 1);
    s.camera.position.lerp(newCamPosition, 0.75);
    spot.current.position.copy(mesh.current.position.clone());
    spot.current.lookAt(
      mesh.current.position.clone().add(spotlightOffset.clone()).clone()
    );

    s.camera.lookAt(mesh.current.position.clone());

    // console.log(s.camera.position);
  });

  return (
    <>
      <Clouds texture="/cloud.png">
        <Cloud />
      </Clouds>
      <group>
        <group>
          <SpotLight ref={spot as never} />
        </group>
        <group scale={0.0011} ref={mesh as never}>
          <primitive object={fbx} />
        </group>
      </group>
    </>
  );
};
