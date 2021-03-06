import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./App";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter(){
      return document.getElementById("app")
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
