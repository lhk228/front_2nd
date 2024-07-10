import { createCartView } from "./createCartView";
import { products } from "./data";
import { CartItem } from "./templates";

//데이터 핸들링
export const createShoppingCart = () => {
    const items = {};

    //상품 추가하기
    const addItem = (product) => {
        const $cart = document.querySelector("#cart-items");
        const $itemContainer = document.createElement("div");
        $itemContainer.id = product.id;
        $itemContainer.className = "flex justify-between items-center";
        $itemContainer.innerHTML = CartItem(product);
        $cart.appendChild($itemContainer);

        // 추가된 상품에 이벤트 리스너 추가
        const $newCartItem = document.getElementById(product.id);

        const $removeBtn = $newCartItem.querySelector(".remove-item");
        $removeBtn.addEventListener("click", () => updateQuantity("remove", product.id));

        const $plusBtn = $newCartItem.querySelector(".plus-item");
        $plusBtn.addEventListener("click", () => updateQuantity("plus", product.id));

        const $minusBtn = $newCartItem.querySelector(".minus-item");
        $minusBtn.addEventListener("click", () => updateQuantity("minus", product.id));
    };

    //상품 수량 업데이트
    const updateQuantity = (updateType, productId) => {
        const selectedProduct = products.find((item) => item.id === productId);

        switch (updateType) {
            case "plus":
                selectedProduct.quantity++;
                break;
            case "minus":
                selectedProduct.quantity--;
                break;
            case "remove":
                selectedProduct.quantity = 0;
                break;
            case "add":
                selectedProduct.quantity = 1;
                break;
        }

        createCartView(targetId);
    };

    //상품 삭제 : 선택상품 삭제 후 수량 초기화
    const removeItem = (productId) => {
        const $target = document.getElementById(productId);

        $target && $target.remove();

        const selectedProduct = products.find((item) => item.id === productId);

        selectedProduct.quantity = 0;
    };

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
        const selectedProduct = products.find((item) => item.id === productId);

        const { name, price, quantity } = selectedProduct;

        return { selectedProduct, name, price, quantity };
    };

    return { addItem, removeItem, updateQuantity, getItems, getTotal, getItemData };
};
