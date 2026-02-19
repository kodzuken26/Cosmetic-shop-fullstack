import react, { useEffect, useState, type FC } from 'react';
import type { IProduct } from '../types/types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style.scss';

const API_URL = 'http://127.0.0.1:8000/api/'

interface CatalogProps {
    initialProduct?: IProduct;
}

const Product: FC<CatalogProps> = ({ initialProduct }) => {

    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(initialProduct || null);

    useEffect(() => {
        axios.get(`${API_URL}products/${id}/`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    return (
        <>
            <div>
                <div className="card-page">
                    <div className="img-wrap2">
                        <img src={String(product?.image)} alt={product?.name} />
                    </div>

                    <div className="text-card">
                        <p>{product?.description}</p>
                        <h1 className="product-name">{product?.name}</h1>
                        <p className="product-price">{product?.price} ₽</p>
                        <p> <b>Объем:</b>{product?.size} мл</p>
                        <p className="">{product?.full_description}</p>
                        <p><b>Применение:</b>{product?.use}</p>
                        <p className="product-text"><b>Состав:</b> {product?.ingredients}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;