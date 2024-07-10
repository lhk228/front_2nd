import { CartTotal } from "./templates";
import { createShoppingCart } from "./createShoppingCart";
import { numComma } from "./utils";

//뷰 렌더링
export const createCartView = (productId) => {
    const { addItem, removeItem, getTotal, getItemData } = createShoppingCart();
    const { name, price, quantity } = getItemData(productId);

    //수량이 1보다 작으면 삭제
    quantity <= 0 && removeItem(productId);

    //타겟 유무로 Update or Add
    const $target = document.querySelector(`#${productId}`);

    $target
        ? ($target.querySelector(".product-info").textContent = `${name} - ${numComma(price)}원 x ${numComma(
              quantity
          )}`)
        : addItem(productId, quantity);

    //합계 렌더링
    const html = CartTotal(getTotal());
    const $cartTotal = document.querySelector(`#cart-total`);
    $cartTotal.innerHTML = html;
};
