import { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  fetchRouletteProducts,
  startSpin,
  stopSpin,
  closeRoulette,
} from "../../store/slices/rouletteSlice";
import { addToCart } from "../../store/slices/cartSlice";
import "./roulette.scss";

const Roulette = () => {
  const dispatch = useAppDispatch();
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [hasSpun, setHasSpun] = useState(() => {
    return localStorage.getItem("roulette_spun") === "true";
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const rouletteState = useTypedSelector((state) => state.roulette) as {
    products: { id: number; name: string; image: string; price: number }[];
    spinning: boolean;
    prize: { id: number; name: string; image: string; price: number } | null;
    open: boolean;
  };

  const { products, spinning, prize, open } = rouletteState;

  useEffect(() => {
    if (open && !products.length) {
      dispatch(fetchRouletteProducts());
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        dispatch(closeRoulette());
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, dispatch]);

  const spin = () => {
    if (spinning || hasSpun) {
      alert("Вы уже крутили рулетку! Бонус можно получить только один раз.");
      return;
    }
    if (!products.length) {
      alert("Товары для рулетки не загружены");
      return;
    }

    dispatch(startSpin());
    let counter = 0;
    const interval = setInterval(() => {
      setHighlightIndex(Math.floor(Math.random() * products.length));
      counter++;
      if (counter > 20) {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * products.length);
        const prizeProduct = products[finalIndex];
        setHighlightIndex(finalIndex);
        dispatch(stopSpin(prizeProduct));
        dispatch(
          addToCart({ product_id: prizeProduct.id, quantity: 1, price: 0 }),
        );

        localStorage.setItem("roulette_spun", "true");
        setHasSpun(true);

        setTimeout(() => {
          alert(
            ` Вы выиграли: ${prizeProduct.name}! Он уже добавлен в корзину. `,
          );
        }, 200);
      }
    }, 100);
  };

  const proceedToCheckout = () => {
    dispatch(closeRoulette());
    window.location.href = "/checkout";
  };

  if (!open) return null;

  return (
    <div className="roulette-overlay">
      <div className="roulette-modal" ref={modalRef}>
        <h2>Бонус-рулетка</h2>
        <p>Крутите и получите подарок к заказу!</p>

        <div className="roulette-grid">
          {products.map((p, idx) => (
            <div
              key={p.id}
              className={`roulette-item ${highlightIndex === idx ? "highlight" : ""}`}
            >
              <img src={p.image} alt={p.name} />
            </div>
          ))}
        </div>

        {!hasSpun ? (
          <button onClick={spin} disabled={spinning} className="spin-btn">
            {spinning ? "Крутится..." : "Крутить"}
          </button>
        ) : (
          <div className="already-spun">
            <p> Вы уже получили свой бонус!</p>
            <button onClick={proceedToCheckout} className="checkout-btn">
              Перейти к оформлению →
            </button>
          </div>
        )}

        {prize && !hasSpun && (
          <div className="prize">
            Ваш приз: <strong>{prize.name}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roulette;
