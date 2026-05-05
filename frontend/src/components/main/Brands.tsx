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

import { type FC } from 'react';
import './styles.scss';

const Brands: FC = () => {
    return (
        <>
            <div className="brands-block">
                <h2>Наши партнеры</h2>
                <div className="brands-logo">
                    <img src={brand1Img} alt='brand' />
                    <img src={brand2Img} alt='brand' />
                    <img src={brand3Img} alt='brand' />
                    <img src={brand4Img} alt='brand' /> 
                    <img src={brand5Img} alt='brand' />
                    <img src={brand6Img} alt='brand' />
                    <img src={brand7Img} alt='brand' />
                    <img src={brand8Img} alt='brand' /> 
                    <img src={brand9Img} alt='brand' />
                    <img src={brand10Img} alt='brand' />
                    <img src={brand11Img} alt='brand' />
                    <img src={brand12Img} alt='brand' /> 
                    <img src={brand13Img} alt='brand' />
                    <img src={brand14Img} alt='brand' />
                    <img src={brand15Img} alt='brand' />
                    <img src={brand16Img} alt='brand' />
                </div>
            </div>
        </>
    )
}

export default Brands;