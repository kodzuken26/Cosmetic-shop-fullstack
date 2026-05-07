import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./style.scss";

const Auth = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await api.post("/auth/login/", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("access", response.data.access);

      localStorage.setItem("refresh", response.data.refresh);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/profile/me");
    } catch (e: any) {
      console.log(e);

      if (e.response?.data) {
        const data = e.response.data;

        const firstKey = Object.keys(data)[0];

        const firstError = data[firstKey];

        if (Array.isArray(firstError)) {
          setError(firstError[0]);
        } else {
          setError(firstError);
        }
      } else {
        setError("Ошибка входа");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="block-forms">
      <div className="block-input">
        <h1>Авторизация</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="form-board">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
        <p>
          Еще нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
