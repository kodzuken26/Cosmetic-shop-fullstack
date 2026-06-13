import cosmeticImg from '/cosmetic-main.png';

import type { FC } from "react";
import './styles-main.scss'

const AboutInfo: FC = () => {
    return (
        <>
            <div className="about-block">
                
                    <div className="about-text">
                        <h2> О SEULMATE</h2>
                        <p>Seulmate - магазин корейской косметики, где собраны лучшие средства для ежедневного ухода, красоты и любви к себе. </p>
                        <p>Мы выбираем продукты с безопасными составами и современными формулами, чтобы вы чувствовали себя уверенно каждый день.</p>
                    </div>
                    <img src={cosmeticImg} />
                
            </div>
        </>
    )
}

export default AboutInfo;