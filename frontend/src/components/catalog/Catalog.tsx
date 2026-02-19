import react, { useEffect, useState, type FC } from 'react';
import './style.scss';
import axios from 'axios';
import type { IProduct, ICategory } from '../types/types';
import { Link } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000/api/products/'

interface CatalogProps {
    initialProducts?: IProduct[];
}
interface Limited {
    text: string;
    limit: number;
}

const Catalog: FC<CatalogProps> = ({ initialProducts = [] }) => {
    const [products, setProducts] = useState<IProduct[]>(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get<IProduct[]>(API_URL);
            setProducts(response.data);
        }
        fetchProducts();
    }, []);

    const TextLimiter: FC<Limited> = ({ text, limit }) => {
        if (text.length <= limit) return <p>{text}</p>;
        return <p>{text.slice(0, limit)}...</p>;
    };

    const categoryIdMap = {
        'uhod-za-licom': 1,
        'uhod-za-volosami': 2,
        'uhod-za-telom': 3,
        'kosmetika': 4,
        'aksessuary': 5
    };

    const filteredProducts = products.filter(product => {

        const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());


        if (selectedCategory === 'all') {
            return matchesSearch;
        }


        const productCategoryId = typeof product.category === 'object'
            ? (product.category as ICategory).id
            : product.category;


        const matchesCategory = productCategoryId === categoryIdMap[selectedCategory as keyof typeof categoryIdMap];

        return matchesSearch && matchesCategory;
    });





    return (
        <>
            <div className="catalog-block">
                <div className="catalog-top">
                    <div className="filter-container">
                        <select value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="all" >Все товары</option>
                            <option value="uhod-za-licom">Уход за лицом</option>
                            <option value="uhod-za-volosami">Уход за волосами</option>
                            <option value="uhod-za-telom">Уход за телом</option>
                            <option value="kosmetika">Косметика</option>
                            <option value="aksessuary">Аксессуары</option>
                        </select>
                        {selectedCategory !== 'all' && (
                            <button onClick={() => setSelectedCategory('all')} className="clear-btn">
                                Сбросить категорию
                            </button>
                        )}
                    </div>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Поиск товаров"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        {searchTerm && (
                            <button className="clear-btn" onClick={() => setSearchTerm('')}>Отменить</button>
                        )}
                    </div>
                </div>
                <div className="catalog">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(element => (
                            <div key={element.id} className="product-card">
                                <Link to={`/catalog/products/${element.id}`}>
                                <div className="img-wrap">
                                    <img src={String(element.image)} alt={element.name} className="img-catalog" />
                                </div>
                                <p className="catalog-p"> <TextLimiter text={element.description} limit={35} /> </p>
                                <p className="catalog-name"> <TextLimiter text={element.name} limit={40} />  </p>
                                <p className="catalog-price"> {element.price} ₽</p>
                                <button className="catalog-btn">В КОРЗИНУ</button>
                                </Link>
                                
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>По запросу "{searchTerm}" ничего не найдено</p>
                            <button
                                className="show-all-btn"
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('all');
                                }}
                            >
                                Показать все товары
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default Catalog;