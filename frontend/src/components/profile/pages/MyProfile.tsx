import { useEffect } from "react";
// import api from "../../../api/api";
// import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";

const MyProfile = () => {
    const { fetchProfile } = useActions();

  const { user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <h3>Загрузка...</h3>;

  return (
    <div>
      <h1>Профиль</h1>

      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>

      
    </div>
  );
};

export default MyProfile;