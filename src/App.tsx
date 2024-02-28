import React from "react";

import { WelcomePage } from "./Pages/WelcomePage/WelcomePage";
import { MainLayout } from "./Components";
import { BleepsProvider, BleepsProviderSettings } from "@arwes/react-bleeps";
import { BleepNames } from "./types";
import {
  AnimatorGeneralProvider,
  AnimatorGeneralProviderSettings,
} from "@arwes/react-animator";

import ClickMp3 from "./assets/sounds/click.mp3";
import ClickWebm from "./assets/sounds/click.webm";

import ErrorMp3 from "./assets/sounds/error.mp3";
import ErrorWebm from "./assets/sounds/error.webm";

import InfoMp3 from "./assets/sounds/info.mp3";
import InfoWebm from "./assets/sounds/info.webm";

import IntroMp3 from "./assets/sounds/intro.mp3";
import IntroWebm from "./assets/sounds/intro.webm";

import TypeMp3 from "./assets/sounds/type.mp3";
import TypeWebm from "./assets/sounds/type.webm";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CvPage } from "./Pages/CVPage/CvPage";
import { EmptyPage } from "./Pages/EmptyPage/EmptyPage";

const LazyGamePage = React.lazy(() => import("./Pages/GamePage/GamePage"));

const App: React.FC = () => {
  const animatorsSettings: AnimatorGeneralProviderSettings = {
    duration: {
      enter: 0.15,
      exit: 0.15,
      stagger: 0.05,
    },
  };

  const bleepsSettings: BleepsProviderSettings<BleepNames> = {
    master: { volume: 0.8 },
    categories: {
      background: { volume: 0.3 },
      transition: { volume: 0.5 },
      interaction: { volume: 0.7 },
      notification: { volume: 1 },
    },
    bleeps: {
      click: {
        category: "interaction",
        sources: [
          { src: ClickWebm, type: "audio/webm" },
          { src: ClickMp3, type: "audio/mpeg" },
        ],
      },
      open: {
        category: "interaction",
        sources: [
          { src: "/assets/sounds/open.webm", type: "audio/webm" },
          { src: "/assets/sounds/open.mp3", type: "audio/mpeg" },
        ],
      },
      close: {
        category: "interaction",
        sources: [
          { src: "/assets/sounds/close.webm", type: "audio/webm" },
          { src: "/assets/sounds/close.mp3", type: "audio/mpeg" },
        ],
      },
      info: {
        category: "notification",
        sources: [
          { src: InfoWebm, type: "audio/webm" },
          { src: InfoMp3, type: "audio/mpeg" },
        ],
      },
      error: {
        category: "notification",
        sources: [
          { src: ErrorWebm, type: "audio/webm" },
          { src: ErrorMp3, type: "audio/mpeg" },
        ],
      },
      intro: {
        category: "transition",
        sources: [
          { src: IntroWebm, type: "audio/webm" },
          { src: IntroMp3, type: "audio/mpeg" },
        ],
      },
      content: {
        category: "transition",
        sources: [
          { src: "/assets/sounds/content.webm", type: "audio/webm" },
          { src: "/assets/sounds/content.mp3", type: "audio/mpeg" },
        ],
      },
      type: {
        category: "transition",
        sources: [
          { src: TypeWebm, type: "audio/webm" },
          { src: TypeMp3, type: "audio/mpeg" },
        ],
        loop: true,
      },
      assemble: {
        category: "transition",
        sources: [
          { src: "/assets/sounds/assemble.webm", type: "audio/webm" },
          { src: "/assets/sounds/assemble.mp3", type: "audio/mpeg" },
        ],
        loop: true,
      },
    },
  };

  const router = createBrowserRouter([
    {
      path: "/cv",
      element: (
        <MainLayout>
          <CvPage />
        </MainLayout>
      ),
    },
    {
      path: "/game-cv",
      element: (
        <React.Suspense fallback={<div>Loading...</div>}>
          <LazyGamePage />
        </React.Suspense>
      ),
    },
    {
      path: "/old-game/index.html",
      element: <EmptyPage />,
    },

    {
      path: "/old-cv/index.html",
      element: <EmptyPage />,
    },

    {
      path: "/",
      element: (
        <MainLayout>
          <WelcomePage />
        </MainLayout>
      ),
    },
    {
      path: "/:index",
      element: (
        <MainLayout>
          <WelcomePage />
        </MainLayout>
      ),
    },
  ]);

  return (
    <AnimatorGeneralProvider {...animatorsSettings} disabled={false}>
      <BleepsProvider {...bleepsSettings} common={{ disabled: false }}>
        <RouterProvider router={router} />
      </BleepsProvider>
    </AnimatorGeneralProvider>
  );
};

export default App;
