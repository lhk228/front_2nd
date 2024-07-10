import { CartTotal } from "./templates";
import { createShoppingCart } from "./createShoppingCart";

//뷰 렌더링
export const createCartView = (productId) => {
    const { addItem, removeItem, getTotal, getItemData } = createShoppingCart();
    const { selectedProduct, name, price, quantity } = getItemData(productId);

    //수량이 1보다 작으면 삭제
    quantity <= 0 && removeItem(productId);

    //타겟 유무로 Update or Add
    const $target = document.querySelector(`#${productId}`);

    $target
        ? ($target.querySelector(".product-info").textContent = `${name} - ${price}원 x ${quantity}`)
        : addItem(selectedProduct);

    //합계 렌더링
    const html = CartTotal(getTotal());
    const $cartTotal = document.querySelector(`#cart-total`);
    $cartTotal.innerHTML = html;
};
