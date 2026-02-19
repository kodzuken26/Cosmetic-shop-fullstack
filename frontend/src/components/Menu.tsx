import react, { type FC } from 'react';
import logo from '../../public/logo1.png';
import './style.scss';
import { Link } from 'react-router-dom';

const Menu: FC = () => {
    return (
        <>
            <div className="menu-top">
                <img src={logo} alt="" />
                <div className="menu-list">
                    <Link className="link" to="/">ГЛАВНАЯ</Link>
                    <Link className="link" to="/catalog">КАТАЛОГ</Link>
                    <Link className="link" to="">БЛОГ</Link>
                </div>
            </div>
        </>
    )
}

export default Menu;