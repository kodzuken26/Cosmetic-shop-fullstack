import react, { type FC } from 'react';
import '../style.scss';
import Categories from './Categories';
import { Link } from 'react-router-dom';

const Main: FC = () => {
    return (
        <>
            <div className="main">
                <div className="main_p">
                    <h1>Интернет - магазин SEULMATE</h1>
                    <p>Продаем лучшую корейскую косметику</p>
                    <button className="main-btn"><Link className="link" to="/catalog">КАТАЛОГ</Link></button>
                </div>
                <img src="https://i.pinimg.com/1200x/28/0a/5e/280a5ef74776c17c9406f32241a57e13.jpg" alt="" />
            </div>
            <Categories/>
        </>
    )
}

export default Main;