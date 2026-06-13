import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import "./style.scss";

const MyProfile = () => {
//   const location = useLocation();
  const { fetchProfile } = useActions();
  const { user, loading, error } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (!user && !loading) {
      fetchProfile();
    }
  }, [user, loading, fetchProfile]);

  if (loading) return <h3>Загрузка профиля...</h3>;
  if (error) return <h3>Ошибка: {error}</h3>;
  if (!user) return <h3>Пожалуйста, войдите в аккаунт</h3>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <div className="avatar">{user.name?.charAt(0)}</div>
          <div className="profile-head">
            <h1>{user.name}</h1>
            <p>Личный кабинет</p>
          </div>
        </div>
        <div className="profile-info">
          <div className="info-item">
            <p className="info-label">Email</p>
            <p className="info-value">{user.email}</p>
          </div>
          <div className="info-item">
            <p className="info-label">Телефон</p>
            <p className="info-value">{user.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
