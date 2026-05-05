import { type FC } from 'react';
import './styles.scss';
import Categories from './Categories';
import Slider from './Slider';

const Main: FC = () => {
    return (
        <>
            <Slider/>
            <Categories />
        </>
    );
}

export default Main;

