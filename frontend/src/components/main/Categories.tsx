import cat1 from '../../../public/cat1.jpeg';
import cat2 from '../../../public/cat2.jpg';
import cat3 from '../../../public/cat3.png';
import cat4 from '../../../public/cat4.jpg';
import cat5 from '../../../public/cat5.png';

import { type FC } from 'react';
import './styles.scss';


const Categories: FC = () => {
    return (
        <>
            <div className="category-main">
                <h2>Categories</h2>
                <div className="category-list">
                    <div className="category-icon">
                        <img className="img-cat" src={cat1} alt="" />
                        <p>Уход за лицом</p>
                    </div>
                    <div className="category-icon">
                        <img className="img-cat" src={cat2} alt="" />
                        <p>Декоративная <br/> косметика</p>
                    </div>
                    <div className="category-icon">
                        <img className="img-cat" src={cat3} alt="" />
                        <p>Волосы</p>
                    </div>
                    <div className="category-icon">
                        <img className="img-cat" src={cat4} alt="" />
                        <p>Уход за телом</p>
                    </div>
                    <div className="category-icon">
                        <img className="img-cat" src={cat5} alt="" />
                        <p>Аксессуары</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories;