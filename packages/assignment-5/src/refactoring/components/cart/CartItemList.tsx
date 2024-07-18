import { CartItem } from '../../../types';
import { useCart } from '../../hooks/index.ts';

interface CartItemListProps {
  cart: CartItem[];
}
export const CartItemList = ({ cart }: CartItemListProps) => {
  //*Hooks
  const { removeFromCart, updateQuantity } = useCart();

  //*Function
  const getAppliedDiscount = (item: CartItem) => {
    const { discounts } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;
    for (const discount of discounts) {
      if (quantity >= discount.quantity) {
        appliedDiscount = Math.max(appliedDiscount, discount.rate);
      }
    }
    return appliedDiscount;
  };

  //*Event Handler
  const handleClickRemove = (item: CartItem) => {
    removeFromCart(item.product.id);
  };

  const handleClickUpdateQuantity = (item: CartItem, action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      updateQuantity(item.product.id, item.quantity + 1);
    } else if (action === 'decrease') {
      updateQuantity(item.product.id, item.quantity - 1);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

      <div className="space-y-2">
        {cart.map((item) => {
          const appliedDiscount = getAppliedDiscount(item);
          return (
            <div key={item.product.id} className="flex justify-between items-center bg-white p-3 rounded shadow">
              <div>
                <span className="font-semibold">{item.product.name}</span>
                <br />
                <span className="text-sm text-gray-600">
                  {item.product.price}원 x {item.quantity}
                  {appliedDiscount > 0 && (
                    <span className="text-green-600 ml-1">({(appliedDiscount * 100).toFixed(0)}% 할인 적용)</span>
                  )}
                </span>
              </div>
              <div>
                <button
                  onClick={() => handleClickUpdateQuantity(item, 'decrease')}
                  className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
                >
                  -
                </button>
                <button
                  onClick={() => handleClickUpdateQuantity(item, 'increase')}
                  className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
                >
                  +
                </button>
                <button
                  onClick={() => handleClickRemove(item)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
