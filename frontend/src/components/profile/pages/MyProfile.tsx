import { useEffect } from "react";
// import api from "../../../api/api";
// import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import "./style.scss"

const MyProfile = () => {
    const { fetchProfile } = useActions();

  const { user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <h3>Загрузка...</h3>;

  return (
    <div>
      {/* <h1>Профиль</h1>
          <div className="profile-card">
              <div className="avatar">
                  
              </div>
              <div className="info-item">
                  <p className="info-value">{user.name}</p>
                    <p className="info-value">{user.email}</p>
                    <p className="info-value">{user.phone}</p>
              </div>
              
        </div> */}
      
        <div className="profile-page">

  <div className="profile-card">

    <div className="profile-top">

      <div className="avatar">
        {user.name?.charAt(0)}
      </div>

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
      
    </div>
  );
};

export default MyProfile;