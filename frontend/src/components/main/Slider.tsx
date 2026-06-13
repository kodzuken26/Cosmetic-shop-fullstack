import slide1Img from '/slide1.jpg';
import slide2Img from '/slide2.jpg';
import arrowLeftImg from '/arrow-left.png';
import arrowRightImg from '/arrow-right.png';

import { useState, useEffect, type FC, type ReactNode } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

interface Slide {
    content: ReactNode;
}

const extraSlides: Slide[] = [
    {
        content: (
            <div 
                className="main2"
                style={{ backgroundImage: `url(${slide1Img})` }}
            >
                <div className="main-p2">
                    <h2>Уход за лицом</h2>
                    <p>Натуральные ингредиенты из Кореи</p>
                    <button className="main-btn">
                        <Link className="link" to="/catalog">СМОТРЕТЬ</Link>
                    </button>
                </div>
            </div>
        )
    },
    {
        content: (
            <div 
                className="main"
                style={{ backgroundImage: `url(https://i.pinimg.com/1200x/bf/cf/e0/bfcfe06b90ce663d2068464d749f5147.jpg)` }}
            >
                <div className="main-p">
                    <h2>Туториал на макияж</h2>
                    <p>Десятки разных макияжей на любой вкус</p>
                    <button className="main-btn">
                        <Link className="link" to="/blog">ПОСМОТРЕТЬ</Link>
                    </button>
                </div>
            </div>
        )
    },
    {
        content: (
            <div 
                className="main2"
                style={{ backgroundImage: `url(${slide2Img})` }}
            >
                <div className="main-p2">
                    <h2>Аксессуары</h2>
                    <p>Всё для ежедневного ухода</p>
                    <button className="main-btn">
                        <Link className="link" to="/catalog">ПОДРОБНЕЕ</Link>
                    </button>
                </div>
            </div>
        )
    }
];

const Slider: FC = () => {

    const firstSlide = (
        <div 
            className="main"
            style={{ backgroundImage: `url(https://i.pinimg.com/736x/9d/4e/ff/9d4effca1e805961c77e8a2fc6a6f8c3.jpg)` }}
        >
            <div className="main-p">
                <h1>Интернет - магазин SEULMATE</h1>
                <p>Продаем лучшую корейскую косметику</p>
                <button className="main-btn">
                    <Link className="link" to="/catalog">КАТАЛОГ</Link>
                </button>
            </div>
        </div>
    );

    const allSlides = [firstSlide, ...extraSlides.map(s => s.content)];
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideCount = allSlides.length;

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % slideCount);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const timer = setInterval(goToNext, 20000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="slider-container">
            <div className="slider">
                {allSlides.map((content, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                    >
                        {content}
                    </div>
                ))}
            </div>

            <button className="slider-button prev" onClick={goToPrevious}>
                <img src={arrowLeftImg} alt="arrow-left"/>
            </button>
            <button className="slider-button next" onClick={goToNext}>
                <img src={arrowRightImg} alt="arrow-right"/>
            </button>

            <div className="slider-dots">
                {allSlides.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;