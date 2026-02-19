import React, { type FC } from 'react';
import '../style.scss';


const Categories: FC = () => {
    return (
        <>
            <div className="category-main">
                <h2>Categories</h2>
                <div className="category-list">
                    <div className="category-icon">
                        <img className="img-cat" src="../../public/cat1.jpeg" alt="" />
                        <p>Уход за лицом</p>
                    </div>
                    <div className="category-icon">
                        <img className="img-cat" src="../../public/cat2.jpg" alt="" />
                        <p>Декоративная <br/> косметика</p>
                    </div>
                    <div className="category-icon">
                        <img className="img-cat" src="../../public/cat3.png" alt="" />
                        <p>Волосы</p>
                    </div>
                    <div className="category-icon">
                        <img className="img-cat" src="../../public/cat4.jpg" alt="" />
                        <p>Уход за телом</p>
                    </div>
                    <div className="category-icon">
                        <img className="img-cat" src="../../public/cat5.png" alt="" />
                        <p>Аксессуары</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories;