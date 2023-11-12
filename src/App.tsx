import { FC } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SearchWrap } from "./components/indexComponents";
import { SideBar } from "./components/indexComponents";
import { SearchProvider } from "./components/context/SearchContext";
import { NotFound } from "./components/pages/NotFoundPage";

export const AppContent: FC = () => {
  return (
    <div className="App">
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Navigate to="search/page/1" replace />} />
          <Route path="search/page/:page/*" element={<SearchWrap />}>
            <Route path="details/:id" element={<SideBar />} />
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </SearchProvider>
    </div>
  );
};

export const App: FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};
