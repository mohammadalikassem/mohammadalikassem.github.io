import React from "react";

import { Text, Animator } from "@arwes/react";
import { Stack } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";
interface AboutProps {
  id?: string;
}
export const About: React.FC<AboutProps> = ({ id }) => {
  return (
    <div id={id}>
      <Animator duration={{ enter: 1 }}>
        <Text as="h3" easing="inBounce" fixed>
          About
        </Text>
        <Stack spacing={3}>
          <Stack direction={"row"} spacing={2}>
            <PlaceIcon />
            <Text easing="inBounce" fixed>
              Lebanon
            </Text>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <EmailIcon />
            <Text
              as="a"
              href="mailto:kassem.mohammad.ali.cv@gmail.com"
              easing="inBounce"
              fixed
            >
              kassem.mohammad.ali.cv@gmail.com
            </Text>
          </Stack>
        </Stack>
        <br />
        <Text easing="inBounce" fixed>
          I am a motivated person who likes to "get his hands dirty" and work on
          creating and troubleshooting projects. I do not think that I can
          objectively describe myself so I usually let my work do the talk. And
          I would prefer to prove my skills on the field rather than listing
          them.
        </Text>
      </Animator>
    </div>
  );
};
