import { useEffect, FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/slices/searchSlice";
import { RootState } from "../../redux/store";
import { getPhilosopherByIdQuery } from "../../services/api";
import { IPhilosopher } from "../../types/types";
import { Loader } from "../indexComponents";
import { Button } from "../indexComponents";

import "../../styles/SideBar.css";

export const SideBar: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadingDetails, isSideBarOpen } = useSelector(
    (state: RootState) => state.search,
  );
  const params = useParams();
  const { id, page } = params;
  const philosopherResult = getPhilosopherByIdQuery(Number(id)) as {
    data?: IPhilosopher;
    isLoading: boolean;
  };
  const { data: philosopher } = philosopherResult;

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
      navigate(`/search/page/${page || 1}/details/${id}`);
      dispatch(actions.setSideBarOpen(true));
    } else {
      dispatch(actions.setSideBarOpen(false));
      navigate("/search/page/1");
    }
  }, [id, navigate, page, dispatch]);

  const handleCloseSideBar = () => {
    dispatch(actions.setSideBarOpen(false));
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
