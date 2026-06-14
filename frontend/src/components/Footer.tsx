import mapImg from "/map.png";
import phoneImg from "/phone.png";
import mailImg from "/gmail.png";

import { type FC } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Footer: FC = () => {
  const access = useTypedSelector((state) => state.auth.access);
  const isAuth = !!access;
  const profileLink = isAuth ? "/profile/me" : "/auth";
  return (
    <>
      <div className="block-footer">
        <div className="footer-text">
          <div className="footer-group-text">
            <h2>SEULMATE</h2>

            <p>
              Корейская косметика для ежедневного ухода, красоты и любви к себе.
            </p>
          </div>

          <div className="footer-group-text">
            <h3>МАГАЗИН</h3>

            <div className="footer-link">
              <Link className="link" to="/">
                Главная
              </Link>

              <Link className="link" to="/catalog">
                Каталог
              </Link>

              <Link className="link" to="/blog">
                Блог
              </Link>

              <Link className="link" to={profileLink}>
                Профиль
              </Link>
            </div>
          </div>

          <div className="footer-group-text">
            <h3>НАШИ КОНТАКТЫ</h3>

            <p className="footer-list">
              <img src={mapImg} alt="map-icon" />
              ул. Гончарова, 1
            </p>

            <p className="footer-list">
              <img src={phoneImg} alt="phone-icon" />
              +7 (123) 456-78-99
            </p>

            <p className="footer-list">
              <img src={mailImg} alt="mail-icon" />
              seulmate@mail.ru
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>2026 © SEULMATE — All Rights Reserved</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
