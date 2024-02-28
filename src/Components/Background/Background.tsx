import { type ReactElement } from "react";
import {
  type AnimatedProp,
  Animator,
  Animated,
  Dots,
  Puffs,
  aa,
  cx,
} from "@arwes/react";

import backgroundLargeJpg from "../../assets/images/background-large.jpg";
import backgroundLargeWebp from "../../assets/images/background-large.webp";
import backgroundMediumJpg from "../../assets/images/background-medium.jpg";
import backgroundMediumWebp from "../../assets/images/background-medium.webp";
import backgroundSmallJpg from "../../assets/images/background-small.jpg";
import backgroundSmallWebp from "../../assets/images/background-small.webp";

import * as classes from "./Background.css";

interface BackgroundProps {
  className?: string;
  animated?: AnimatedProp;
}

const Background = (props: BackgroundProps): ReactElement => {
  const { className, animated } = props;

  const isIndex = true;

  return (
    <Animator merge combine>
      <Animated
        role="presentation"
        className={cx(classes.root, className)}
        animated={animated}
      >
        <Animator>
          <Animated
            as="picture"
            role="presentation"
            className={classes.layer1}
            style={{
              filter: `brightness(${isIndex ? 0.4 : 0.3}) blur(${
                isIndex ? 0 : 10
              }px)`,
            }}
            animated={[aa("opacity", 0.8, 1), aa("scale", 1.05, 1)]}
          >
            <source
              media="(min-width:1280px)"
              srcSet={backgroundLargeWebp}
              type="image/webp"
            />
            <source
              media="(min-width:1280px)"
              srcSet={backgroundLargeJpg}
              type="image/jpeg"
            />
            <source
              media="(min-width:768px)"
              srcSet={backgroundMediumWebp}
              type="image/webp"
            />
            <source
              media="(min-width:768px)"
              srcSet={backgroundMediumJpg}
              type="image/jpeg"
            />
            <source
              media="(max-width:767px)"
              srcSet={backgroundSmallWebp}
              type="image/webp"
            />
            <img
              className={classes.layer1Image}
              src={backgroundSmallJpg}
              alt="Background"
            />
          </Animated>
        </Animator>

        <Animator duration={{ enter: 2 }} unmountOnDisabled>
          <Dots
            className={classes.layer2}
            color="hsla(180, 29%, 72%, 0.15)"
            size={2}
            distance={40}
            originInverted
          />
        </Animator>

        <Animator duration={{ enter: 2, interval: 4 }} unmountOnDisabled>
          <Puffs
            className={classes.layer3}
            color="hsla(180, 29%, 72%, 0.25)"
            quantity={20}
          />
        </Animator>
      </Animated>
    </Animator>
  );
};

export type { BackgroundProps };
export { Background };
