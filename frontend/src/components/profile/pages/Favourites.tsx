import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { fetchFavorites } from "../../../store/slices/favoriteSlice";
import { useNavigate } from "react-router-dom";
import "./styles-favorite.scss";

const Favorites = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useTypedSelector((state) => state.favorites);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);

  if (loading) return <h3>Загрузка...</h3>;

  return (
    <div className="favorites-page">
      <h1>Избранное</h1>
      {items.length === 0 && (
        <p className="empty-text">Нет избранных товаров</p>
      )}
      <div className="favorites-grid">
        {items.map((fav: any) => (
          <div
            key={fav.product.id}
            onClick={() => navigate(`/catalog/products/${fav.product.id}`)}
            className="favorite-card-link"
          >
            <div className="favorite-card">
              <img src={fav.product.image} alt={fav.product.name} />
              <h3>{fav.product.name}</h3>
              <p>{fav.product.price} ₽</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
