import React from "react";
import { Animator, Text } from "@arwes/react";
export const Step1: React.FC = () => {
  return (
    <Animator duration={{ enter: 1 }}>
      <Text as="p">
        My name is Mohammad Ali Kassem aka MAK, and I tried to make this CV as
        intresting as possible. So I hope You'll enjoy it.
      </Text>
    </Animator>
  );
};
