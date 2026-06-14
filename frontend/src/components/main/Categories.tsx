import cat1 from "/cat1.jpeg";
import cat2 from "/cat2.jpg";
import cat3 from "/cat3.png";
import cat4 from "/cat4.jpg";
import cat5 from "/cat5.png";
import starImg from "/star.png";

import { type FC } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const categories = [
  { slug: "uhod-za-licom", label: "Уход за лицом", img: cat1 },
  { slug: "kosmetika", label: "Декоративная косметика", img: cat2 },
  { slug: "uhod-za-volosami", label: "Волосы", img: cat3 },
  { slug: "uhod-za-telom", label: "Уход за телом", img: cat4 },
  { slug: "aksessuary", label: "Аксессуары", img: cat5 },
];

const Categories: FC = () => {
  return (
    <div className="category-main">
      <div className="head-block">
        <img src={starImg} />
        <h2>Категории</h2>
        <img src={starImg} />
      </div>

      <div className="category-list">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/catalog?category=${cat.slug}`}
            className="category-icon"
            style={{ textDecoration: "none", color: "inherit" }}
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
