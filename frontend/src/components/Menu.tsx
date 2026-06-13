import { type FC, useState } from "react";
import logo from "/logo1.png";
import "./style.scss";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Menu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

   const access = useTypedSelector((state) => state.auth.access);
  const isAuth = !!access;  // true, если access есть
  const profileLink = isAuth ? "/profile/me" : "/auth";
  const cartLink = "/profile/cart"; // ссылка на корзину


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
        <Link className="link" to={profileLink}>
          ПРОФИЛЬ
        </Link>
        
        {/* 👇 Ссылка на корзину — только для авторизованных */}
        {isAuth && (
          <Link className="link" to={cartLink}>
            КОРЗИНА
          </Link>
        )}
      </div>
    </div>
  );
};

export default Menu;

// import { type FC, useState } from "react";
// import logo from "/logo1.png";
// import "./style.scss";
// import { Link } from "react-router-dom";

// const Menu: FC = () => {
//   const [isOpen, setIsOpen] = useState(false);

    
//     const profileLink = localStorage.getItem("access") ? "/profile/me" : "/auth";

//   return (
//     <div className="menu-top">
//       <div className="menu-header">
//         <div className="left" /> 
//         <div className="logo">
//           <img src={logo} alt="" />
//         </div>
//         <div
//           className={`burger ${isOpen ? "active" : ""}`}
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </div>

//       <div className={`menu-list ${isOpen ? "open" : ""}`}>
//         <Link className="link" to="/">
//           ГЛАВНАЯ
//         </Link>
//         <Link className="link" to="/catalog">
//           КАТАЛОГ
//         </Link>
//         <Link className="link" to="/blog">
//           БЛОГ
//         </Link>
//         <Link className="link" to={profileLink}>
//           ПРОФИЛЬ
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Menu;
