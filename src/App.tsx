import { useState } from "react";
import { SearchWrap } from "./components/search/SearchWrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SideBar } from "./components/sidebar/SideBar";

export const App = () => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [page, setPage] = useState(1);

  const toggleSideBar = () => {
    setSideBarOpen((prevState) => !prevState);
  };

  const searchWrapWidth = isSideBarOpen ? "65%" : "100%";

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="search/page/:page/*"
            element={
              <SearchWrap
                isSideBarOpen={isSideBarOpen}
                toggleSideBar={toggleSideBar}
                searchWrapWidth={searchWrapWidth}
                page={page}
                setPage={setPage}
              />
            }
          >
            <Route
              path="details/:id"
              element={
                <SideBar
                  isSideBarOpen={isSideBarOpen}
                  toggleSideBar={toggleSideBar}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
