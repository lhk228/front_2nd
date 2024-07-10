import { createShoppingCart } from "./createShoppingCart";

const { addItem, removeItem, updateQuantity, getItems, getTotal, getItemData } = createShoppingCart();

//뷰 렌더링
export const createCartView = (productId, render = false) => {
    //수량 업데이트에 따른 렌더링
    const { product, name, price, quantity } = getItemData(productId);

    //수량이 1보다 작으면 삭제
    if (quantity <= 0) {
        removeItem(productId);
        return;
    }

    //타겟이 있으면 업데이트
    const target = document.querySelector(`#${productId}`);
    if (target) target.querySelector(".product-info").textContent = `${name} - ${price}원 x ${quantity}`;
    else {
        addItem(product);
    }
    //합계 렌더링
};
