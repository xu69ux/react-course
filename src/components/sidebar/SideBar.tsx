import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCharacterById } from "../../utils/usefulFuncs";
import { Loader } from "../loader/Loader";
import "../../styles/SideBar.css";

interface SideBarProps {
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
}

interface ICharacter {
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

export const SideBar: React.FC<SideBarProps> = (props) => {
  const { isSideBarOpen, toggleSideBar } = props;
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchCharacter = async () => {
        setLoading(true);
        try {
          getCharacterById(Number(id)).then((result) => {
            setCharacter(result);
            setLoading(false);
          });
        } catch (error) {
          console.error("Error fetching character data:", error);
        }
      };
      fetchCharacter();
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
          <div>name: {character?.name}</div>
          <div>status: {character?.status}</div>
          <div>species: {character?.species}</div>
          <div>gender: {character?.gender}</div>
          <div>
            <img src={character?.image} alt={character?.name} />
          </div>
        </div>
      </div>
    );
  };

  const renderLoading = () => {
    return (
      <div className={isSideBarOpen ? "sidebar open" : "sidebar close"}>
        <button className="sidebar__btn-close" onClick={toggleSideBar}>
          &#10005;
        </button>
        <h1 className="sidebar__title">side bar</h1>
        <div className="sidebar__content">
          <Loader />
        </div>
      </div>
    );
  };

  if (loading) {
    return renderLoading();
  }
  return renderCharacter();
};
