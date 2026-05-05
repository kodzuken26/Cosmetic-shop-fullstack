import { type FC } from 'react';
import './styles.scss';
import Categories from './Categories';
import Slider from './Slider';
import Brands from './Brands';

const Main: FC = () => {
    return (
        <>
            <Slider/>
            <Categories />
            <Brands/>
        </>
    );
}

export default Main;

