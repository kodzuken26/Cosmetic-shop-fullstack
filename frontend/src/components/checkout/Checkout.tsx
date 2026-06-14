import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { createOrder } from "../../store/slices/orderSlice";
import "./Checkout.scss";

const API_URL = import.meta.env.DEV
  ? "http://127.0.0.1:8000"
  : "https://kodzuken.pythonanywhere.com";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const { items, total_price } = useTypedSelector((state) => state.cart);
  const { fetchCart } = useActions();
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    full_name: "",
    phone: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
    postal_code: "",
  });

  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (
      !address.full_name ||
      !address.phone ||
      !address.city ||
      !address.street ||
      !address.house
    ) {
      alert("Пожалуйста, заполните все обязательные поля адреса");
      return;
    }

    if (!card.number || !card.expiry || !card.cvc) {
      alert("Пожалуйста, заполните данные карты");
      return;
    }

    setLoading(true);

    try {
      await dispatch(createOrder(address)).unwrap();
      alert("Заказ успешно оформлен!");
      window.location.href = "/profile/orders";
    } catch (error: any) {
      alert(error.message || "Ошибка оформления заказа");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <h1>Корзина пуста</h1>
        <p>Добавьте товары в корзину, чтобы оформить заказ.</p>
        <button onClick={() => (window.location.href = "/catalog")}>
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Оформление заказа</h1>
      <div className="checkout-grid">
        <div className="checkout-items">
          <h2>Ваши товары</h2>
          {items.map((item) => (
            <div key={item.id} className="checkout-item">
                      <img 
    src={`${API_URL}${item.image_url}`}  
    alt={item.product_name}
    onError={(e) => {
        e.currentTarget.src = '/placeholder.png';
    }}
/>
              <div>
                <h4>{item.product_name}</h4>
                <p>
                  {item.quantity} шт. ×{" "}
                  {item.price === 0 ? "бесплатно" : `${item.price} ₽`}
                </p>
              </div>
            </div>
          ))}
          <p className="total">Итого: {total_price} ₽</p>
        </div>

        <div className="checkout-form">
          <div className="form-section">
            <h2>Адрес доставки</h2>
            <input
              type="text"
              name="full_name"
              placeholder="ФИО *"
              value={address.full_name}
              onChange={handleAddressChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Телефон *"
              value={address.phone}
              onChange={handleAddressChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="Город *"
              value={address.city}
              onChange={handleAddressChange}
              required
            />
            <div className="address-row">
              <input
                type="text"
                name="street"
                placeholder="Улица *"
                value={address.street}
                onChange={handleAddressChange}
                required
              />
              <input
                type="text"
                name="house"
                placeholder="Дом *"
                value={address.house}
                onChange={handleAddressChange}
                required
              />
              <input
                type="text"
                name="apartment"
                placeholder="Квартира"
                value={address.apartment}
                onChange={handleAddressChange}
              />
            </div>
            <input
              type="text"
              name="postal_code"
              placeholder="Индекс"
              value={address.postal_code}
              onChange={handleAddressChange}
            />
          </div>

          <div className="form-section">
            <h2>Данные карты</h2>
            <input
              type="text"
              name="number"
              placeholder="Номер карты *"
              value={card.number}
              onChange={handleCardChange}
              maxLength={16}
              required
            />
            <div className="card-row">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY *"
                value={card.expiry}
                onChange={handleCardChange}
                maxLength={5}
                required
              />
              <input
                type="text"
                name="cvc"
                placeholder="CVC *"
                value={card.cvc}
                onChange={handleCardChange}
                maxLength={3}
                required
              />
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="pay-btn"
            disabled={loading}
          >
            {loading ? "Оформление..." : "Оплатить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
