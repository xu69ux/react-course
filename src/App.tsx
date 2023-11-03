import { useState } from "react";
import { SearchWrap } from "./components/search/SearchWrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setSideBarOpen((prevState) => !prevState);
  };

  const searchWrapWidth = isSideBarOpen ? "65%" : "100%";

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <SearchWrap
                isSideBarOpen={isSideBarOpen}
                toggleSideBar={toggleSideBar}
                searchWrapWidth={searchWrapWidth}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
