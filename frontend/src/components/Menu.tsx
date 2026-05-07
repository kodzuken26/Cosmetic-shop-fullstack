import { type FC, useState } from "react";
import logo from "/logo1.png";
import "./style.scss";
import { Link } from "react-router-dom";

const Menu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="menu-top">
      <div className="menu-header">
        <div className="left" /> 
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div
          className={`burger ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`menu-list ${isOpen ? "open" : ""}`}>
        <Link className="link" to="/">
          ГЛАВНАЯ
        </Link>
        <Link className="link" to="/catalog">
          КАТАЛОГ
        </Link>
        <Link className="link" to="/blog">
          БЛОГ
        </Link>
        <Link className="link" to="/registration">
          ПРОФИЛЬ
        </Link>
      </div>
    </div>
  );
};

export default Menu;
