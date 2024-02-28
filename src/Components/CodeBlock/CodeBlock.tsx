/* eslint-disable @typescript-eslint/no-explicit-any */
import { type HTMLProps, type ReactElement } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Highlight, themes } from "prism-react-renderer";
import { type AnimatedProp, Animated, cx } from "@arwes/react";

import { theme as t } from "../../theme";
import * as classes from "./CodeBlock.css";

interface CodeBlockProps extends HTMLProps<HTMLPreElement> {
  className?: string;
  animated?: AnimatedProp;
  code: string;
}

const CodeBlock = (props: CodeBlockProps): ReactElement => {
  const { className, animated, code, ...otherProps } = props;

  // TODO: Fix type.

  return (
    <Animated<HTMLPreElement, HTMLProps<HTMLPreElement>>
      {...(otherProps as any)}
      animated={animated}
      className={cx(classes.root, className)}
    >
      <Highlight theme={themes.vsDark} code={code} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
          <pre
            className={cx(classes.pre, className)}
            style={{
              ...style,
              background: t.dark
                ? `linear-gradient(
                  to right,
                  ${t.colors.primary.text(6, { alpha: 0.1 })},
                  ${t.colors.primary.text(9, { alpha: 0.1 })}
                )`
                : t.colors.primary.bg(2),
            }}
          >
            {tokens.map((line: any, i: any) => {
              // TODO: Fix overflow content parent resize.
              const tokenProps = getLineProps({ line });
              return (
                <div
                  key={i}
                  {...tokenProps}
                  className={cx(classes.line, tokenProps.className)}
                >
                  {line.map((token: any, key: any) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </Animated>
  );
};

export type { CodeBlockProps };
export { CodeBlock };
