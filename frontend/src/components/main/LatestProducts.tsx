import starImg from '/star.png';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchLatestProducts } from '../../store/slices/latestSlice';
import './styles-main.scss';

const LatestProducts = () => {
    const dispatch = useAppDispatch();
    const { items, loading } = useTypedSelector((state) => state.latest);

    useEffect(() => {
        dispatch(fetchLatestProducts());
    }, []);

    if (loading) return <div className="latest-loading">Загрузка новинок...</div>;
    if (!items.length) return null;

    return (
        <div className="latest-products">
            <div className="head-block">
                <img src={starImg} /><h2>Новинки</h2><img src={starImg}/>
            </div>
            
            <div className="latest-grid">
                {items.map((product: any) => (
                    <Link key={product.id} to={`/catalog/products/${product.id}`} className="latest-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p className="price">{product.price} ₽</p>
                    </Link>
                ))}
            </div>
            <Link className="latest-btn" to="/catalog">Посмотреть все товары</Link>
        </div>
    );
};

export default LatestProducts;