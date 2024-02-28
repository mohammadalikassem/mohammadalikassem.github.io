import React, { useEffect } from "react";
import { PageContentLayout } from "../../Components";
import { About } from "../Sections/About/About";
import { Education } from "./../Sections/Education/Education";
import { Experience } from "../Sections/Experience/Experience";
import { Projects } from "../Sections/Projects/Projects";
import { Skills } from "../Sections/Skills/Skills";
import { Animator, Text } from "@arwes/react";
import { useLocation } from "react-router-dom";
export const CvPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        document
          .getElementById(location.hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      history.pushState(null, "", "#");
    }
  }, [location]);

  return (
    <div
      style={
        {
          // minWidth: "80vw",
          // minHeight: "90vh",
          // maxWidth: "99vw",
          // maxHeight: "99vh",
        }
      }
    >
      <PageContentLayout
        style={{
          minWidth: "80vw",
          minHeight: "90vh",
          maxWidth: "99vw",
          maxHeight: "99vh",
          width: "100%",
        }}
      >
        <div style={{ width: "95%", height: "95%" }}>
          <Animator duration={{ enter: 1 }}>
            <Text as="h1" manager="decipher" easing="inBounce" fixed>
              Mohammad ALi Kassem
            </Text>
          </Animator>

          <Animator manager="parallel" duration={{ enter: 1 }}>
            <About id="about" />
            <br />
            <hr />
            <Education />
            <br />
            <hr />
            <Experience />
            <br />
            <hr />
            <Projects />
            <br />
            <hr />
            <Skills />
            <a href="#about">About</a>
          </Animator>
        </div>
      </PageContentLayout>
    </div>
  );
};
