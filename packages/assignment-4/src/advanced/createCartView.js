import { createShoppingCart } from "./createShoppingCart";

const { addItem, removeItem, updateQuantity, getItems, getTotal, getItemData } = createShoppingCart();

//뷰 렌더링
export const createCartView = (productId) => {
    const { target, name, price, quantity } = getItemData(productId);

    target.querySelector(".product-info").textContent = `${name} - ${price}원 x ${quantity}`;
};
