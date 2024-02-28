import React from "react";
import { Text } from "@arwes/react";
import { Rating } from "../../../Components/CV/Rating/Rating";

export const Skills: React.FC = () => {
  return (
    <div>
      <Text as="h3" easing="linear">
        Skills
      </Text>
      <div>
        <Rating num={3} />
      </div>
      <ul>
        <li>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est deserunt
          beatae quo. Ipsa culpa beatae accusamus praesentium, ipsam quibusdam
          architecto distinctio porro cupiditate earum fugit laborum! Harum iure
          dolorem amet!
        </li>
        <li>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est deserunt
          beatae quo. Ipsa culpa beatae accusamus praesentium, ipsam quibusdam
          architecto distinctio porro cupiditate earum fugit laborum! Harum iure
          dolorem amet!
        </li>
        <li>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est deserunt
          beatae quo. Ipsa culpa beatae accusamus praesentium, ipsam quibusdam
          architecto distinctio porro cupiditate earum fugit laborum! Harum iure
          dolorem amet!
        </li>
      </ul>
    </div>
  );
};
