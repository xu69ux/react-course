import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSearch } from "./components/context/SearchContext";
import { SearchWrap } from "./components/indexComponents";
import { SideBar } from "./components/indexComponents";
import { SearchProvider } from "./components/context/SearchContext";

export const App: FC = () => {
  const { isSideBarOpen } = useSearch();

  const searchWrapWidth = isSideBarOpen ? "65%" : "100%";

  if (!isSideBarOpen) {
    const currentUrl = window.location.pathname;
    const detailsIndex = currentUrl.indexOf("/details/");
    if (detailsIndex !== -1) {
      const newUrl = currentUrl.substring(0, detailsIndex);
      window.history.pushState(null, "", newUrl);
    }
  }
  return (
    <div className="App">
      <BrowserRouter>
        <SearchProvider>
          <Routes>
            <Route
              path="search/page/:page/*"
              element={<SearchWrap searchWrapWidth={searchWrapWidth} />}
            >
              <Route path="details/:id" element={<SideBar />} />
            </Route>
            <Route path="*" element={<Navigate to="search/page/1" />}></Route>
          </Routes>
        </SearchProvider>
      </BrowserRouter>
    </div>
  );
};
