import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPhilosopherById } from "../../utils/usefulFuncs";
import { Loader } from "../loader/Loader";
import "../../styles/SideBar.css";

interface SideBarProps {
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
}

interface IPhilosopher {
  name: string;
  birth_year: string;
  death_year: string;
  idea: string;
  famous_work: string;
}

export const SideBar: React.FC<SideBarProps> = (props) => {
  const { isSideBarOpen, toggleSideBar } = props;
  const [philosopher, setPhilosopher] = useState<IPhilosopher | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      const fetchPhilosopher = async () => {
        setLoading(true);
        try {
          getPhilosopherById(Number(id)).then((result) => {
            setPhilosopher(result);
            setLoading(false);
          });
        } catch (error) {
          console.error("Error fetching philosopher data:", error);
        }
      };
      fetchPhilosopher();
    }
  }, [id]);

  const renderCharacter = () => {
    return (
      <div className={isSideBarOpen ? "sidebar open" : "sidebar close"}>
        <button className="sidebar__btn-close" onClick={toggleSideBar}>
          &#10005;
        </button>
        <h1 className="sidebar__title">side bar</h1>
        <div className="sidebar__content">
          <div>name: {philosopher?.name}</div>
          <div>born: {philosopher?.birth_year}</div>
          <div>died: {philosopher?.death_year}</div>
          <div>idea: {philosopher?.idea}</div>
          <div>famous work: {philosopher?.famous_work}</div>
        </div>
      </div>
    );
  };

  const renderLoading = () => {
    return (
      <>
        <div className={isSideBarOpen ? "sidebar open" : "sidebar close"}>
          <button className="sidebar__btn-close" onClick={toggleSideBar}>
            &#10005;
          </button>
          <h1 className="sidebar__title">side bar</h1>
          <div className="sidebar__content">
            <Loader />
          </div>
        </div>
      </>
    );
  };

  if (loading) {
    return renderLoading();
  }
  return renderCharacter();
};
