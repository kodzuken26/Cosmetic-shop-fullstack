import cat1 from '/cat1.jpeg';
import cat2 from '/cat2.jpg';
import cat3 from '/cat3.png';
import cat4 from '/cat4.jpg';
import cat5 from '/cat5.png';

import { type FC } from 'react';
import { Link } from 'react-router-dom';  
import './styles.scss';

const categories = [
    { slug: 'uhod-za-licom', label: 'Уход за лицом', img: cat1 },
    { slug: 'kosmetika', label: 'Декоративная косметика', img: cat2 },
    { slug: 'uhod-za-volosami', label: 'Волосы', img: cat3 },
    { slug: 'uhod-za-telom', label: 'Уход за телом', img: cat4 },
    { slug: 'aksessuary', label: 'Аксессуары', img: cat5 },
];

const Categories: FC = () => {
    
    return (
        <div className="category-main">
            <h2>Categories</h2>
            <div className="category-list">
                {categories.map((cat) => (
                    <Link
                        key={cat.slug}
                        to={`/catalog?category=${cat.slug}`}
                        className="category-icon"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <img className="img-cat" src={cat.img} alt={cat.label} />
                        <p>{cat.label}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;


// import cat1 from '/cat1.jpeg';
// import cat2 from '/cat2.jpg';
// import cat3 from '/cat3.png';
// import cat4 from '/cat4.jpg';
// import cat5 from '/cat5.png';

// import { type FC } from 'react';
// import './styles.scss';


// const Categories: FC = () => {
//     return (
//         <>
//             <div className="category-main">
//                 <h2>Categories</h2>
//                 <div className="category-list">
//                     <div className="category-icon">
//                         <img className="img-cat" src={cat1} alt="" />
//                         <p>Уход за лицом</p>
//                     </div>
//                     <div className="category-icon">
//                         <img className="img-cat" src={cat2} alt="" />
//                         <p>Декоративная <br/> косметика</p>
//                     </div>
//                     <div className="category-icon">
//                         <img className="img-cat" src={cat3} alt="" />
//                         <p>Волосы</p>
//                     </div>
//                     <div className="category-icon">
//                         <img className="img-cat" src={cat4} alt="" />
//                         <p>Уход за телом</p>
//                     </div>
//                     <div className="category-icon">
//                         <img className="img-cat" src={cat5} alt="" />
//                         <p>Аксессуары</p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Categories;