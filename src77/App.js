import React from "react";
import { SideNavigationBar } from "./SideNavigationBar.js";
import { HeaderBar } from "./HeaderBar.js";

function App() {
  return (
    <div className="flex column w-100p mh-93p">
      <HeaderBar />
      <SideNavigationBar />
    </div>
  );
}

export default App;
