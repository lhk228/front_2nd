import { CartItem } from "./templates";
import { createCartView } from "./createCartView";

//데이터 핸들링
export const createShoppingCart = () => {
    const items = {};

    //상품 추가하기
    const addItem = ($cart, product, handleFunc) => {
        const $itemContainer = document.createElement("div");
        const { handleRemoveClick, handlePlusClick, handleMinusClick } = handleFunc;
        $itemContainer.id = product.id;
        $itemContainer.className = "flex justify-between items-center";
        $itemContainer.innerHTML = CartItem(product);
        $itemContainer.dataset.product = JSON.stringify(product);
        $itemContainer.dataset.quantity = 1;

        $cart.appendChild($itemContainer);

        // 추가된 상품에 이벤트 리스너 추가
        const $newCartItem = document.getElementById(product.id);

        const $removeBtn = $newCartItem.querySelector(".remove-item");
        $removeBtn.addEventListener("click", handleRemoveClick);

        const $plusBtn = $newCartItem.querySelector(".plus-item");
        $plusBtn.addEventListener("click", handlePlusClick);

        const $minusBtn = $newCartItem.querySelector(".minus-item");
        $minusBtn.addEventListener("click", handleMinusClick);
    };

    //상품 수량 업데이트
    const updateQuantity = (product) => {
        const { id } = product;
        const target = document.querySelector(`#${id}`);

        target.dataset.quantity++;

        createCartView(id);
    };

    //상품 삭제
    const removeItem = () => {};

    const getItems = () => [];

    const calculateDiscount = () => {
        return 0;
    };

    const getTotalQuantity = () => 0;

    const getTotal = () => ({
        total: 0,
        discountRate: 0,
    });

    //상품 정보 가져오기
    const getItemData = (productId) => {
        const target = document.querySelector(`#${productId}`);
        const product = target.dataset.product;
        const quantity = Number(target.dataset.quantity);
        const { name, price } = JSON.parse(product);

        return { target, name, price, quantity };
    };

    return { addItem, removeItem, updateQuantity, getItems, getTotal, getItemData };
};
