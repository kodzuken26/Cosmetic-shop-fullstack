import plusImg from '/plus_img.png';
import minusImg from '/minus_img.png';

import { useEffect, useState, type FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import './style.scss';
import ProductGallery from './ProductGallery';
import RatingStars from '../common/RatingStars';

const Product: FC = () => {
    const { id } = useParams();
    const { fetchProductById } = useActions();
    
    const [isUseOpen, setIsUseOpen] = useState(false);
    const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
    
    const { data: productsData, loading, error } = useTypedSelector(state => state.product);
    
    
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
                {/* <img src={String(product.image)} alt={product.name} /> */}
                <ProductGallery images={product.images || []} />
            </div>
            
            <div className="text-card">
                <p className="description-first">{product.description}</p>
                <h1 className="product-name">{product.name}</h1>
                <p className="product-price">{product.price} ₽</p>
                {product.rating !== undefined && (
    <RatingStars rating={product.rating} />
                )}
                <br></br>
                <br></br>
                <button className="product-btn">В КОРЗИНУ</button>
                <p>В наличии: {product.stock ?? 0} шт.</p>
                <p ><b>Объем:</b> {product.size} мл</p>
                <p className="second-text">{product.full_description}</p>
                <div>
                    <div className="product-group">
                        <p><b className="title">Применение</b></p>
                        <div>
                            <img onClick={() => setIsUseOpen(!isUseOpen)} 
                            src={isUseOpen ? minusImg : plusImg}
                            alt={isUseOpen ? "свернуть" : "развернуть"}
                            style={{ cursor: 'pointer' }} />
                        </div>
                        
                    </div>
                    {isUseOpen && (
                        <div>
                            <p className="second-text">{product.use}</p>
                        </div>
                    )}
                </div>
                <div>
                    <div className="product-group">
                        <p><b className="title">Состав</b></p>
                        <div>
                              <img onClick={() => setIsIngredientsOpen(!isIngredientsOpen)} 
                            src={isIngredientsOpen ? minusImg : plusImg}
                            alt={isIngredientsOpen ? "свернуть" : "развернуть"}
                            style={{ cursor: 'pointer' }} />
                        </div>
                      
                    </div>
                    {isIngredientsOpen && (
                        <div>
                            <p className="second-text">{product.ingredients}</p>
                        </div>
                    )}
                </div>
                <button className="button__reset"><Link className="link" to={`/catalog`}>Обратно в каталог</Link></button>
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