import { createShoppingCart } from "./createShoppingCart";

const { addItem, removeItem, updateQuantity, getItems, getTotal, getItemData } = createShoppingCart();

//뷰 렌더링
export const createCartView = (productId) => {
    const { product, name, price, quantity } = getItemData(productId);

    //수량이 1보다 작으면 삭제
    if (quantity <= 0) {
        removeItem(productId);
        return;
    }

    //타겟 유무로 Update or Add
    const $target = document.querySelector(`#${productId}`);

    $target
        ? ($target.querySelector(".product-info").textContent = `${name} - ${price}원 x ${quantity}`)
        : addItem(product);

    //합계 렌더링
};
