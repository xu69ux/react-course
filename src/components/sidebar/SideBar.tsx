import { useEffect, useState, FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const { loadingDetails, setLoadingDetails, isSideBarOpen, setSideBarOpen } =
    useSearch();
  const [philosopher, setPhilosopher] = useState<IPhilosopher | null>(null);
  const params = useParams();
  const { id, page } = params;
  const navigate = useNavigate();

  if (!isSideBarOpen) {
    const currentUrl = window.location.pathname;
    const detailsIndex = currentUrl.indexOf("/details/");
    if (detailsIndex !== -1) {
      const newUrl = currentUrl.substring(0, detailsIndex);
      window.history.pushState(null, "", newUrl);
    }
  }

  useEffect(() => {
    const fetchPhilosopher = async () => {
      setLoadingDetails(true);
      try {
        const result = await getPhilosopherById(Number(id));
        setPhilosopher(result);
        setLoadingDetails(false);
      } catch (error) {
        console.error("Error fetching philosopher data:", error);
      }
    };

    if (id) {
      navigate(`/search/page/${page || 1}/details/${id}`);
      setSideBarOpen(true);
      fetchPhilosopher();
    } else {
      setSideBarOpen(false);
      navigate("/search/page/1");
    }
  }, [id, setLoadingDetails, setSideBarOpen, navigate, page]);

  const handleCloseSideBar = () => {
    setSideBarOpen(false);
  };

  const renderPhilosopher = () => {
    return (
      <>
        {isSideBarOpen && (
          <div data-testid="sidebar" className="sidebar open">
            <Button
              data-testid="close-btn"
              text="&#10005;"
              className="sidebar__btn-close"
              onClick={handleCloseSideBar}
            />
            <h1 className="sidebar__title">details:</h1>
            <div className="sidebar__content">
              <div className="sidebar__data">name: {philosopher?.name}</div>
              <div className="sidebar__data">
                born: {philosopher?.birth_year}
              </div>
              <div className="sidebar__data">
                died: {philosopher?.death_year}
              </div>
              <div className="sidebar__data">idea: {philosopher?.idea}</div>
              <div className="sidebar__data">
                famous work: {philosopher?.famous_work}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderLoading = () => {
    return (
      <>
        {isSideBarOpen && (
          <div data-testid="sidebar" className="sidebar open">
            <Button
              data-testid="close-btn"
              text="&#10005;"
              className="sidebar__btn-close"
              onClick={handleCloseSideBar}
            />
            <h1 className="sidebar__title">details:</h1>
            <Loader />
          </div>
        )}
      </>
    );
  };

  if (loadingDetails) {
    return renderLoading();
  }
  return renderPhilosopher();
};
