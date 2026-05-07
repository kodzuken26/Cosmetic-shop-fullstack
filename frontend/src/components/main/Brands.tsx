import { type FC } from 'react';
import './styles.scss';

import brand1Img from '/brand1.jfif';
import brand2Img from '/brand2.jpg';
import brand3Img from '/brand3.png';
import brand4Img from '/brand4.jpg';
import brand5Img from '/brand5.png';
import brand6Img from '/brand6.png';
import brand7Img from '/brand7.png';
import brand8Img from '/brand8.jpeg';
import brand9Img from '/brand9.png';
import brand10Img from '/brand10.png';
import brand11Img from '/brand11.webp';
import brand12Img from '/brand12.png';
import brand13Img from '/brand13.jpg';
import brand14Img from '/brand14.webp';
import brand15Img from '/brand15.webp';
import brand16Img from '/brand16.png';

const brands = [
    brand1Img, brand2Img, brand3Img, brand4Img,
    brand5Img, brand6Img, brand7Img, brand8Img,
    brand9Img, brand10Img, brand11Img, brand12Img,
    brand13Img, brand14Img, brand15Img, brand16Img
];

const Brands: FC = () => {
    return (
        <div className="brands-block">
            <h2>Наши партнеры</h2>

            <div className="brands-marquee">
                <div className="brands-track">
                    {[...brands, ...brands].map((img, index) => (
                        <div className="brand-item" key={index}>
                            <img src={img} alt="brand" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Brands;