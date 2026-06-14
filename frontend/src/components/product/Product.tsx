import plusImg from "/plus_img.png";
import minusImg from "/minus_img.png";

import { useEffect, useState, type FC } from "react";
import { Link, useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import "./style.scss";
import ProductGallery from "./ProductGallery";
import RatingStars from "../common/RatingStars";
import { addToCart } from "../../store/slices/cartSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Product: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { fetchProductById } = useActions();

  const [isUseOpen, setIsUseOpen] = useState(false);
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);

  const {
    data: productsData,
    loading,
    error,
  } = useTypedSelector((state) => state.product);
  const cartItems = useTypedSelector((state) => state.cart.items);

  const product = productsData?.find((p) => p.id === Number(id)) || null;

  useEffect(() => {
    if (id && !productsData) {
      fetchProductById(Number(id));
    }
  }, [id, fetchProductById, productsData]);

  const getCartQuantity = (productId: number) => {
    const item = cartItems.find((i) => i.product === productId);
    return item?.quantity || 0;
  };

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
        <ProductGallery images={product.images || []} />
      </div>

      <div className="text-card">
        <p className="description-first">{product.description}</p>
        <h1 className="product-name">{product.name}</h1>
        <p className="product-price">{product.price} ₽</p>
        {product.rating !== undefined && (
          <RatingStars rating={product.rating} />
        )}
        <br />
        <br />

        <button
          className="product-btn"
          onClick={() =>
            dispatch(addToCart({ product_id: product.id, quantity: 1 }))
          }
        >
          В КОРЗИНУ
          {getCartQuantity(product.id) > 0 && (
            <span className="cart-quantity">{getCartQuantity(product.id)}</span>
          )}
        </button>

        <p className="first-info">В наличии: {product.stock ?? 0} шт.</p>
        <p className="first-info">
          <b>Объем:</b> {product.size} мл
        </p>
        <p className="second-text">{product.full_description}</p>

        <div>
          <div className="product-group">
            <p>
              <b className="title">Применение</b>
            </p>
            <div>
              <img
                onClick={() => setIsUseOpen(!isUseOpen)}
                src={isUseOpen ? minusImg : plusImg}
                alt={isUseOpen ? "свернуть" : "развернуть"}
                style={{ cursor: "pointer" }}
              />
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
            <p>
              <b className="title">Состав</b>
            </p>
            <div>
              <img
                onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
                src={isIngredientsOpen ? minusImg : plusImg}
                alt={isIngredientsOpen ? "свернуть" : "развернуть"}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          {isIngredientsOpen && (
            <div>
              <p className="second-text">{product.ingredients}</p>
            </div>
          )}
        </div>

        <button className="button__reset">
          <Link className="link" to="/catalog">
            Обратно в каталог
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Product;
