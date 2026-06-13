import leaveImg from '/leaves-main.png';
import heartImg from '/heart-main.png';
import circleImg from '/circle-main.png';
import carImg from '/car-main.png';

import type { FC } from "react";
import './styles-main.scss'

const StartInfo: FC = () => {
    return (
        <>
            <div className="info-block">
                <div className="info-list">
                    <div className="info-element">
                        <img src={leaveImg} />
                        <div>
                            <p>Натуральные составы</p>
                            <p>Только проверенные ингредиенты</p>
                        </div>
                    </div>
                    <div className="info-element">
                        <img src={carImg} />
                        <div>
                            <p>Быстрая доставка</p>
                            <p>Доставим заказ от 5 дней</p>
                        </div>
                    </div>
                    <div className="info-element">
                        <img src={circleImg} />
                        <div>
                            <p>Корейские бренды</p>
                            <p>Оригинальная продукция прямо из Кореи</p>
                        </div>
                    </div>
                    <div className="info-element">
                        <img src={heartImg} />
                        <div>
                            <p>Для всех типов кожи</p>
                            <p>Подберем уход именно для вас</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default StartInfo;