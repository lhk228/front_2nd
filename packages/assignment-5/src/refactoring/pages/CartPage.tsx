import { Coupon, Product } from '../../types.ts';
import { useCart } from '../hooks/index.ts';
import { ProductList, CartItemList, CouponApplyBox, OrderSummary } from "../components/cart"

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const { cart, addToCart  } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<ProductList
              products={products}
              cart={cart}
              addToCart={addToCart}
            />
        <div>
					<CartItemList cart={cart}/>
					<CouponApplyBox coupons={coupons}/>
					<OrderSummary />
        </div>
      </div>
    </div>
  );
};
