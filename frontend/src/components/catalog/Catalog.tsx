import searchIcon from "../../assets/images/search-icon.png";

import { useEffect, useState, type FC } from "react";
import "./style.scss";
import type { ICategory } from "../../types/types";
import { Link, useSearchParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import type { ProductState } from "../../types/product";
import { TextLimiter } from "../common/TextLimiter";
import { CATEGORY_ID_MAP } from "../common/categories";
import { addToCart } from "../../store/slices/cartSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../store/slices/favoriteSlice";

interface CatalogProps {
  initialProducts?: ProductState["data"];
}

const Catalog: FC<CatalogProps> = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    loading,
    data: productsFromRedux,
  } = useTypedSelector((state) => state.product);
  const cartItems = useTypedSelector((state) => state.cart.items);
  const { fetchProducts } = useActions();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const favorites = useTypedSelector((state) => state.favorites.items);
  const isFavorite = (productId: number) =>
    favorites.some((f: any) => f.product.id === productId);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setFetchError(null);
        await fetchProducts();
      } catch (err) {
        console.error("Ошибка загрузки:", err);
        setFetchError("Не удалось загрузить товары. Попробуйте позже.");
      }
    };

    loadProducts();
  }, []);

  const products = Array.isArray(productsFromRedux) ? productsFromRedux : [];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (selectedCategory === "all") {
      return matchesSearch;
    }

    const productCategoryId =
      typeof product.category === "object"
        ? (product.category as ICategory).id
        : product.category;

    const matchesCategory =
      productCategoryId ===
      CATEGORY_ID_MAP[selectedCategory as keyof typeof CATEGORY_ID_MAP];

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const getCartQuantity = (productId: number) => {
    const item = cartItems.find((i) => i.product === productId);
    return item?.quantity || 0;
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleProducts.length < filteredProducts.length;

  const handleFavoriteClick = (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite(productId)) {
      dispatch(removeFromFavorite(productId));
    } else {
      dispatch(addToFavorite(productId));
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  if (loading) {
    return <h1>Идет загрузка...</h1>;
  }

  if (error || fetchError) {
    return (
      <div className="error-container">
        <h1>{error || fetchError}</h1>
        <button onClick={() => window.location.reload()}>
          Повторить попытку
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="catalog-block">
        <div className="catalog-top">
          <div className="filter-container">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option className="select-item" value="all">
                Все товары
              </option>
              <option className="select-item" value="uhod-za-licom">
                Уход за лицом
              </option>
              <option className="select-item" value="uhod-za-volosami">
                Уход за волосами
              </option>
              <option className="select-item" value="uhod-za-telom">
                Уход за телом
              </option>
              <option className="select-item" value="kosmetika">
                Косметика
              </option>
              <option className="select-item" value="aksessuary">
                Аксессуары
              </option>
            </select>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="clear-btn"
              >
                Сбросить категорию
              </button>
            )}
          </div>
          <div className="search-container">
            <img src={searchIcon} alt="search" className="search-icon" />
            <input
              type="text"
              placeholder="Поиск товаров"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-btn" onClick={() => setSearchTerm("")}>
                Отменить
              </button>
            )}
          </div>
        </div>
        <div className="catalog">
          {visibleProducts.length > 0 ? (
            <>
              {visibleProducts.map((element) => (
                <div key={element.id} className="product-card">
                  <Link
                    to={`/catalog/products/${element.id}`}
                    className="card-link-el"
                  >
                    <div className="img-wrap">
                      <img
                        src={String(element.image)}
                        alt={element.name}
                        className="img-catalog"
                      />
                      <div
                        className="favorite-icon"
                        onClick={(e) => handleFavoriteClick(element.id, e)}
                      >
                        {isFavorite(element.id) ? "❤️" : "🤍"}
                      </div>
                    </div>
                    <p className="catalog-p"></p>
                    <p className="catalog-name">
                      <TextLimiter text={element.name} limit={30} />
                    </p>
                    <p className="catalog-price">{element.price} ₽</p>
                  </Link>
                  <button
                    className="catalog-btn"
                    onClick={() =>
                      dispatch(
                        addToCart({ product_id: element.id, quantity: 1 }),
                      )
                    }
                  >
                    В КОРЗИНУ
                    {getCartQuantity(element.id) > 0 && (
                      <span className="cart-quantity">
                        {getCartQuantity(element.id)}
                      </span>
                    )}
                  </button>
                </div>
              ))}

              {hasMore && (
                <div className="show-more-container">
                  <button onClick={handleShowMore} className="clear-btn">
                    Показать ещё
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <p className="text-result">
                По запросу <b>"{searchTerm}"</b> ничего не найдено
              </p>
              <button
                className="clear-btn"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Показать все товары
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Catalog;
