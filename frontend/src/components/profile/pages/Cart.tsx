import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import "./style.scss";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { setOpen } from "../../../store/slices/rouletteSlice";
import Roulette from "../../checkout/Roulette";

const API_URL = import.meta.env.DEV
  ? "http://127.0.0.1:8000"
  : "https://kodzuken.pythonanywhere.com";

const Cart = () => {
  const dispatch = useAppDispatch();
  const access = useTypedSelector((state) => state.auth.access);
  const { items, total_price, total_items, loading, error } = useTypedSelector(
    (state) => state.cart,
  );
  const { fetchCart, removeFromCart, updateCartItem } = useActions();

  useEffect(() => {
    if (access) {
      fetchCart();
    }
  }, [access]);

  const handleQuantityChange = (
    itemId: number,
    newQuantity: number,
    isBonus: boolean,
  ) => {
    if (isBonus) return;
    if (newQuantity < 1) return;
    updateCartItem(itemId, newQuantity);
  };

  const handleRemove = (itemId: number) => {
    if (window.confirm("Удалить товар из корзины?")) {
      removeFromCart(itemId);
    }
  };

  if (loading) return <div className="cart-loading">Загрузка корзины...</div>;
  if (error) return <div className="cart-error">Ошибка: {error}</div>;

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Корзина пуста</h2>
        <p>Добавьте товары в корзину, чтобы оформить заказ.</p>
        <Link to="/catalog" className="cart-continue">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Корзина</h1>

      <div className="cart-items">
        {items.map((item) => {
          const price = Number(item.price);
          const isBonus = price === 0;
          return (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img
                  src={`${API_URL}${item.image_url}`}
                  alt={item.product_name}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.png";
                  }}
                />
              </div>

              <div className="cart-item-info">
                <h3>{item.product_name}</h3>
                <p className="cart-item-price">
                  {isBonus ? "Бесплатно" : `${item.price} ₽`}
                </p>
              </div>

              <div className="cart-item-quantity">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1, isBonus)
                  }
                  disabled={item.quantity <= 1 || isBonus}
                >
                  -
                </button>
                <span>
                  {item.quantity} шт. {isBonus}
                </span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1, isBonus)
                  }
                  disabled={isBonus}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                {isBonus ? (
                  <p className="cart-item-price bonus">Бесплатно</p>
                ) : (
                  <p className="cart-item-price">
                    {item.price * item.quantity} ₽
                  </p>
                )}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="cart-item-remove"
                >
                  Удалить
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <p>
          Всего товаров: <strong>{total_items}</strong>
        </p>
        <p>
          Общая сумма: <strong>{total_price} ₽</strong>
        </p>
        <button
          onClick={() => dispatch(setOpen(true))}
          className="cart-checkout"
        >
          Оформить заказ
        </button>
      </div>
      <Roulette />
    </div>
  );
};

export default Cart;
