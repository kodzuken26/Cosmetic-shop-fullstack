import { useEffect, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import './style.scss';

const Product: FC = () => {
    const { id } = useParams();
    const { fetchProductById } = useActions();
    
    // Получаем данные из Redux
    const { data: productsData, loading, error } = useTypedSelector(state => state.product);
    
    // Находим нужный продукт по id
    const product = productsData?.find(p => p.id === Number(id)) || null;
    
    useEffect(() => {
        if (id && !productsData) {
            fetchProductById(Number(id));
        }
    }, [id, fetchProductById, productsData]);
    
    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }
    
    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }
    
    if (!product) {
        return <div className="not-found">Товар не найден</div>;
    }
    
    return (
        <div className="card-page">
            <div className="img-wrap2">
                <img src={String(product.image)} alt={product.name} />
            </div>
            
            <div className="text-card">
                <p className="description-first">{product.description}</p>
                <h1 className="product-name">{product.name}</h1>
                <p className="product-price">{product.price} ₽</p>
                <button className="product-btn">В КОРЗИНУ</button>
                <p><b>Объем:</b> {product.size} мл</p>
                <p className="second-text">{product.full_description}</p>
                <p><b>Применение</b> <br /> <span className="second-text">{product.use}</span></p>
                <p className="product-text"><b>Состав</b> <br /> <span className="second-text">{product.ingredients}</span></p>
            </div>
        </div>
    );
};

export default Product;

// import react, { useEffect, useState, type FC } from 'react';
// import type { IProduct } from '../../types/types';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './style.scss';

// const API_URL = 'http://127.0.0.1:8000/api/'

// interface CatalogProps {
//     initialProduct?: IProduct;
// }

// const Product: FC<CatalogProps> = ({ initialProduct }) => {

//     const { id } = useParams();
//     const [product, setProduct] = useState<IProduct | null>(initialProduct || null);

//     useEffect(() => {
//         axios.get(`${API_URL}products/${id}/`)
//             .then(response => {
//                 setProduct(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching product:', error);
//             });
//     }, [id]);

//     return (
//         <>
//             <div>
//                 <div className="card-page">
                    
//                         <img src={String(product?.image)} alt={product?.name} />
                    

//                     <div className="text-card">
//                         <p className="description-first">{product?.description}</p>
//                         <h1 className="product-name">{product?.name}</h1>
//                         <p className="product-price">{product?.price} ₽</p>
//                         <button className="product-btn">В КОРЗИНУ</button>
//                         <p> <b>Объем: </b>  {product?.size} мл</p>
//                         <p className="second-text">{product?.full_description}</p>
//                         <p><b>Применение</b> <br /> <span className="second-text">{product?.use}</span></p>
//                         <p className="product-text"><b>Состав</b> <br /> <span className="second-text">{product?.ingredients}</span> </p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Product;