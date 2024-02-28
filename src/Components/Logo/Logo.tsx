import { type ReactElement, type ReactNode } from "react";
import { type AnimatedProp, Animated, cx, useBleeps } from "@arwes/react";

import * as classes from "./Logo.css";
import { BleepNames } from "../../types";

interface LogoProps {
  className?: string;
  animated?: AnimatedProp;
  children?: ReactNode;
}

const Logo = (props: LogoProps): ReactElement => {
  const { className, animated, children } = props;

  const bleeps = useBleeps<BleepNames>();

  return (
    <Animated
      as="h1"
      className={cx(classes.root, className)}
      animated={animated}
      onClick={() => bleeps.click?.play()}
    >
      <a className={classes.link} href="/" title="Arwes Project">
        <img className={classes.logo} src="/logo.png" alt="Arwes Project" />
        {children}
      </a>
    </Animated>
  );
};

export type { LogoProps };
export { Logo };
