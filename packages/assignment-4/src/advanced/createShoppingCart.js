import { PRODUCTS } from "./data";
import { CartItem } from "./templates";
import { createCartView } from "./createCartView";
import { BULK_DISCOUNT_RATE, DISCOUNT_THRESHOLD, BULK_DISCOUNT_THRESHOLD } from "./constants";

//데이터 핸들링
export const createShoppingCart = () => {
    //상품 추가하기
    const addItem = (productId, quantity) => {
        if (quantity === 0) return;

        const $cart = document.querySelector("#cart-items");
        const $itemContainer = document.createElement("div");
        $itemContainer.id = productId;
        $itemContainer.className = "flex justify-between items-center mt-5 border-b-2 pb-2";
        $itemContainer.innerHTML = CartItem(productId);
        $cart.appendChild($itemContainer);

        // 추가된 상품에 이벤트 리스너 추가
        const $newCartItem = document.getElementById(productId);

        const $removeBtn = $newCartItem.querySelector(".remove-item");
        $removeBtn.addEventListener("click", () => updateQuantity("remove", productId));

        const $plusBtn = $newCartItem.querySelector(".plus-item");
        $plusBtn.addEventListener("click", () => updateQuantity("plus", productId));

        const $minusBtn = $newCartItem.querySelector(".minus-item");
        $minusBtn.addEventListener("click", () => updateQuantity("minus", productId));
    };

    //상품 수량 업데이트
    const updateQuantity = (updateType, productId) => {
        const selectedProduct = PRODUCTS.find((item) => item.id === productId);

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

        createCartView(productId);
    };

    //상품 삭제 : 선택상품 삭제 후 수량 초기화
    const removeItem = (productId) => {
        const $target = document.getElementById(productId);

        $target && $target.remove();

        const selectedProduct = PRODUCTS.find((item) => item.id === productId);

        selectedProduct.quantity = 0;
    };

    //수량, 할인율 합계
    const getTotal = () => {
        let totalQuantity = 0;
        let originPriceTotal = 0;
        let discountPriceTotal = 0;

        PRODUCTS.forEach((item) => {
            const { id, price, quantity, discountRate } = item;

            originPriceTotal += quantity * price;

            switch (id) {
                case "p1":
                    discountPriceTotal +=
                        quantity >= DISCOUNT_THRESHOLD ? quantity * price * (1 - discountRate) : quantity * price;
                    break;
                case "p2":
                    discountPriceTotal +=
                        quantity >= DISCOUNT_THRESHOLD ? quantity * price * (1 - discountRate) : quantity * price;
                    break;
                case "p3":
                    discountPriceTotal +=
                        quantity >= DISCOUNT_THRESHOLD ? quantity * price * (1 - discountRate) : quantity * price;
                    break;
                default:
                    discountPriceTotal += quantity * price;
                    break;
            }

            totalQuantity += quantity;
        });

        // 30개 이상일 경우 고정 할인
        const bulkDiscountPrice = originPriceTotal * (1 - BULK_DISCOUNT_RATE);

        // 개별 할인과 고정 할인 중 더 저렴한 가격 선택
        discountPriceTotal =
            totalQuantity >= BULK_DISCOUNT_THRESHOLD
                ? Math.min(bulkDiscountPrice, discountPriceTotal)
                : discountPriceTotal;

        let discountRate = (originPriceTotal - discountPriceTotal) / originPriceTotal;

        return { total: discountPriceTotal, discountRate };
    };

    //상품 정보 가져오기
    const getItemData = (productId) => {
        const selectedProduct = PRODUCTS.find((item) => item.id === productId);
        const { name, price, quantity } = selectedProduct;

        return { name, price, quantity };
    };

    return {
        addItem,
        removeItem,
        updateQuantity,
        getTotal,
        getItemData,
    };
};
