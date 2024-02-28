import React from "react";
import { Animator, Text } from "@arwes/react";
export const Step2: React.FC = () => {
  return (
    <Animator duration={{ enter: 5 }}>
      <Text as="p">
        Let's face the truth. Going thru someone's CV is boring AF. so I decided
        to create mine with a little interactive touch.As a note, I don't really
        enjoy frontend development so please check some resources used to make
        building this resume possible.
      </Text>
      <h6>Resources</h6>
      <blockquote>
        The{" "}
        <a href="https://threejs.org/" target="_blank">
          Three JS
        </a>{" "}
        Library
      </blockquote>
      <blockquote>
        Drone Design by{" "}
        <a
          href="https://sketchfab.com/3d-models/bot-drone-winter-501ecbc217c84aecaf05375aca2fcf45"
          target="_blank"
        >
          Reikan
        </a>
      </blockquote>
      <blockquote>
        The{" "}
        <a href="https://github.com/arwes/arwes" target="_blank">
          Arwes
        </a>{" "}
        component library (I shamelessly basically copy pasted their{" "}
        <a href="https://arwes.dev/" target="_blank">
          docs page
        </a>
        and did some modifications)
      </blockquote>
      <blockquote>
        <a
          href="https://www.youtube.com/watch?v=EkPfhzIbp2g&ab_channel=SimonDev"
          target="_blank"
        >
          Simon Dev
        </a>{" "}
        's work
      </blockquote>
    </Animator>
  );
};
