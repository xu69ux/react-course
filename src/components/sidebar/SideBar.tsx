import "../../styles/SideBar.css";

interface SideBarProps {
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
}

export const SideBar: React.FC<SideBarProps> = (props) => {
  const { isSideBarOpen, toggleSideBar } = props;

  return (
    <div className={isSideBarOpen ? "sidebar open" : "sidebar close"}>
      <button className="sidebar__btn-close" onClick={toggleSideBar}>
        &#10005;
      </button>
      <h1 className="sidebar__title">side bar</h1>
    </div>
  );
};
