import { useEffect, useState, FC } from "react";
import { useParams } from "react-router-dom";
import { getPhilosopherById } from "../../utils/usefulFuncs";
import { useSearch } from "../context/SearchContext";
import { Loader } from "../indexComponents";
import { Button } from "../indexComponents";

import "../../styles/SideBar.css";

interface IPhilosopher {
  name: string;
  birth_year: string;
  death_year: string;
  idea: string;
  famous_work: string;
}

export const SideBar: FC = () => {
  const {
    loadingDetails,
    setLoadingDetails,
    isSideBarOpen,
    setSideBarOpen,
    setSearchWrapWidth,
  } = useSearch();
  const [philosopher, setPhilosopher] = useState<IPhilosopher | null>(null);
  const params = useParams();
  const id = params.id;

  if (!isSideBarOpen) {
    const currentUrl = window.location.pathname;
    const detailsIndex = currentUrl.indexOf("/details/");
    if (detailsIndex !== -1) {
      const newUrl = currentUrl.substring(0, detailsIndex);
      window.history.pushState(null, "", newUrl);
    }
  }

  useEffect(() => {
    if (id) {
      const fetchPhilosopher = async () => {
        setLoadingDetails(true);
        try {
          getPhilosopherById(Number(id)).then((result) => {
            setPhilosopher(result);
            setLoadingDetails(false);
          });
        } catch (error) {
          console.error("Error fetching philosopher data:", error);
        }
      };
      fetchPhilosopher();
    }
  }, [id, setLoadingDetails, setSearchWrapWidth]);

  const handleCloseSideBar = () => {
    setSideBarOpen(false);
    setSearchWrapWidth("100%");
  };

  const renderPhilosopher = () => {
    return (
      <div className={isSideBarOpen ? "sidebar open" : "sidebar close"}>
        <Button
          text="&#10005;"
          className="sidebar__btn-close"
          onClick={handleCloseSideBar}
        />
        <h1 className="sidebar__title">details:</h1>
        <div className="sidebar__content">
          <div className="sidebar__data">name: {philosopher?.name}</div>
          <div className="sidebar__data">born: {philosopher?.birth_year}</div>
          <div className="sidebar__data">died: {philosopher?.death_year}</div>
          <div className="sidebar__data">idea: {philosopher?.idea}</div>
          <div className="sidebar__data">
            famous work: {philosopher?.famous_work}
          </div>
        </div>
      </div>
    );
  };

  const renderLoading = () => {
    return (
      <>
        <div className={isSideBarOpen ? "sidebar open" : "sidebar close"}>
          <button className="sidebar__btn-close" onClick={handleCloseSideBar}>
            &#10005;
          </button>
          <h1 className="sidebar__title">side bar</h1>
          <Loader />
        </div>
      </>
    );
  };

  if (loadingDetails) {
    return renderLoading();
  }
  return renderPhilosopher();
};
