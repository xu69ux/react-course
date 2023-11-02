import { useState } from "react";
import { SearchWrap } from "./components/search/SearchWrap";
import { SideBar } from "./components/sidebar/SideBar";

export const App = () => {
  const [isSideBarOpen, setSideBarOpen] = useState(true);

  const toggleSideBar = () => {
    setSideBarOpen((prevState) => !prevState);
  };

  const searchWrapWidth = isSideBarOpen ? "65%" : "100%";

  return (
    <div className="App">
      <SearchWrap searchWrapWidth={searchWrapWidth} />
      <SideBar isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
    </div>
  );
};
