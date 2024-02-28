/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Animator } from "@arwes/react-animator";

import { aa, Text } from "@arwes/react";
import React, { useEffect, useState } from "react";
import { Button, PageContentLayout } from "../../Components";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step3 } from "./Steps/Step3";
import { useNavigate, useParams } from "react-router-dom";

const components = [Step1, Step2, Step3];

export const WelcomePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.index != null) {
      const paramNum = parseInt(params?.index ?? "0");
      if (isNaN(paramNum) || paramNum < 0) {
        navigate(`/0`);
        return;
      }
      if (paramNum >= components.length) {
        navigate("/");
        return;
      }
      setCurrentIndex(paramNum);
    }
  }, [navigate, params]);
  return (
    <div>
      <Animator combine manager="stagger">
        <PageContentLayout
          animated={aa("y", 12, 0)}
          frame
          style={{ maxHeight: "80vh" }}
        >
          <div>
            <Animator duration={{ enter: 2 }}>
              <Text as="h2">
                Hello There Welcome to my CV. I hope you will enjoy this trip.
              </Text>
              <Text as="h3">Please read the below instructions carefully</Text>
            </Animator>
            {components[currentIndex]({})}
          </div>
        </PageContentLayout>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          {currentIndex === components.length - 1 ? (
            <>
              <Button
                frame="hexagon"
                style={{ paddingRight: 30 }}
                onClick={() => {
                  navigate("/game-cv");
                }}
              >
                <Text manager="decipher" easing="outSine">
                  Go to game
                </Text>
              </Button>
              <Button
                frame="simple"
                style={{ paddingRight: 30 }}
                onClick={() => {
                  navigate("/old-game/index.html");
                }}
              >
                <Text manager="decipher" easing="outSine">
                  Go to old game
                </Text>
              </Button>
            </>
          ) : null}
          <Button
            style={{ paddingRight: 30 }}
            onClick={() => {
              if (currentIndex === components.length - 1) {
                navigate("/cv");
              } else {
                navigate("/" + (currentIndex + 1));
              }
            }}
          >
            <Text manager="decipher" easing="outSine">
              {currentIndex === components.length - 1 ? "Go to Page" : "Next"}
            </Text>
          </Button>
          {currentIndex !== 0 ? (
            <Button
              style={{ paddingRight: 30 }}
              onClick={() => {
                if (currentIndex !== 0) {
                  navigate("/" + (currentIndex - 1));
                }
              }}
            >
              <Text manager="decipher" easing="outSine">
                Back
              </Text>
            </Button>
          ) : null}
        </div>
      </Animator>
    </div>
  );
};
