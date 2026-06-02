import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductImage from "../components/ProductImage";
import { getProductImageUrl } from "../utils/productImage";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
} from "../store/cartSlice";
import type { AppDispatch } from "../store/store";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch<AppDispatch>();

  if (cartItems.length === 0) {
    return (
      <div
        className="animate-fade-in rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm"
        data-testid="empty-cart"
      >
        <p className="text-xl font-semibold text-slate-800">Your cart is empty</p>
        <p className="mt-2 text-slate-600">Add products to get started.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          aria-label="Continue shopping"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-slide-up" data-testid="cart-page">
      <h1 className="mb-8 text-left text-3xl font-bold text-slate-900">
        Shopping Cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2" aria-label="Cart items">
          {cartItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
              data-testid={`cart-item-${item.id}`}
            >
              <ProductImage
                src={getProductImageUrl(item.image ? [item.image] : [])}
                alt={item.title}
                className="h-28 w-28 shrink-0 rounded-lg object-cover"
              />

              <div className="min-w-0 flex-1 text-left">
                <h2 className="font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-1 text-brand-600 font-bold">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div
                  className="flex items-center rounded-lg border border-slate-200"
                  role="group"
                  aria-label={`Quantity for ${item.title}`}
                >
                  <button
                    type="button"
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="rounded-l-lg px-3 py-2 text-lg font-medium text-slate-700 transition hover:bg-slate-100"
                    aria-label={`Decrease quantity of ${item.title}`}
                    data-testid={`decrease-qty-${item.id}`}
                  >
                    −
                  </button>
                  <span
                    className="min-w-[2.5rem] px-2 text-center font-semibold"
                    data-testid={`cart-qty-${item.id}`}
                  >
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="rounded-r-lg px-3 py-2 text-lg font-medium text-slate-700 transition hover:bg-slate-100"
                    aria-label={`Increase quantity of ${item.title}`}
                    data-testid={`increase-qty-${item.id}`}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                  aria-label={`Remove ${item.title} from cart`}
                  data-testid={`remove-item-${item.id}`}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside
          className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-lg"
          aria-label="Order summary"
        >
          <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-600">Total Items</dt>
              <dd className="font-semibold" data-testid="cart-total-items">
                {totalItems}
              </dd>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-3 text-base">
              <dt className="font-semibold text-slate-900">Total Price</dt>
              <dd
                className="font-bold text-brand-600"
                data-testid="cart-total-price"
              >
                ${totalPrice.toFixed(2)}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 hover:shadow-md active:scale-[0.98]"
            aria-label="Proceed to checkout"
            data-testid="checkout-btn"
          >
            Checkout
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
