import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { fetchUserOrders } from "../../../store/slices/orderSlice";
import "./orders.scss";

const Orders = () => {
  const dispatch = useAppDispatch();
  const { items: orders, loading } = useTypedSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  if (loading) return <div className="orders-loading">Загрузка заказов...</div>;

  return (
    <div className="orders-page">
      <h1>Мои заказы</h1>
      {orders.length === 0 && <p>У вас пока нет заказов</p>}
      {orders.map((order: any) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <span className="order-id">Заказ №{order.id}</span>
            <span className={`order-status status-${order.status}`}>
              {order.status === "pending" && "В обработке"}
              {order.status === "processing" && "Собирается"}
              {order.status === "shipped" && "В пути"}
              {order.status === "delivered" && "Доставлен"}
              {order.status === "cancelled" && "Отменён"}
            </span>
            <span className="order-date">
              {new Date(order.created_at).toLocaleDateString("ru-RU")}
            </span>
          </div>
          <div className="order-items">
            {order.items.map((item: any) => (
              <div key={item.id} className="order-item">
                <span>{item.product_name}</span>
                <span>{item.quantity} шт.</span>
                <span>{item.product_price} ₽</span>
              </div>
            ))}
          </div>
          <div className="order-footer">
            <span>
              Сумма: <strong>{order.total_price} ₽</strong>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
