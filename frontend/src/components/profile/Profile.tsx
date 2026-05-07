import { type FC } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./style.scss";



const ProfileLayout: FC = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/logout/", {
        refresh: localStorage.getItem("refresh"),
      });
    } catch (e) {
      console.log(e);
    }

    localStorage.clear();
    navigate("/auth");
  };

  return (
    <div className="profile-layout">
      
      
      <div className="sidebar">
        <h2>Личный кабинет</h2>

        <NavLink to="/profile/me">Мой профиль</NavLink>
        <NavLink to="/profile/favorites">Избранное</NavLink>
        <NavLink to="/profile/cart">Корзина</NavLink>

        <button onClick={logout} className="logout-btn">
          Выйти
        </button>
      </div>

    
      <div className="content">
        <Outlet />
      </div>

    </div>
  );
};

export default ProfileLayout;