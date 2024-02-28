import React from "react";
import Stack from "@mui/material/Stack";

interface RatingProps {
  num: number;
}

const MAX = 5;

export const Rating: React.FC<RatingProps> = ({ num }) => {
  const r = num > MAX ? MAX : num;

  return (
    <Stack direction={"row"} spacing={1}>
      {Array.from({ length: r }).map(() => (
        <h1>hello</h1>
      ))}
      {Array.from({ length: MAX - r }).map(() => (
        <h1>hi</h1>
      ))}
    </Stack>
  );
};
