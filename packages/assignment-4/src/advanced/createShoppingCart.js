import { createCartView } from "./createCartView";
import { products } from "./data";
import { CartItem } from "./templates";

//데이터 핸들링
export const createShoppingCart = () => {
    //상품 추가하기
    const addItem = (product) => {
        if (product.quantity === 0) return;

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

        createCartView(productId);
    };

    //상품 삭제 : 선택상품 삭제 후 수량 초기화
    const removeItem = (productId) => {
        const $target = document.getElementById(productId);

        $target && $target.remove();

        const selectedProduct = products.find((item) => item.id === productId);

        selectedProduct.quantity = 0;
    };

    //수량, 할인율 최종
    const getTotal = () => {
        let totalQuantity = 0;
        let originPriceTotal = 0;
        let discountPriceTotal = 0;

        products.forEach((item) => {
            const { id, price, quantity } = item;

            originPriceTotal += quantity * price;

            switch (id) {
                case "p1":
                    discountPriceTotal += quantity >= 10 ? quantity * price * 0.9 : quantity * price;
                    break;
                case "p2":
                    discountPriceTotal += quantity >= 10 ? quantity * price * 0.85 : quantity * price;
                    break;
                case "p3":
                    discountPriceTotal += quantity >= 10 ? quantity * price * 0.8 : quantity * price;
                    break;
                default:
                    discountPriceTotal += quantity * price;
                    break;
            }

            totalQuantity += quantity;
        });

        discountPriceTotal = totalQuantity >= 30 ? originPriceTotal * 0.75 : discountPriceTotal;

        let discountRate = (originPriceTotal - discountPriceTotal) / originPriceTotal;

        return { total: discountPriceTotal, discountRate };
    };

    //상품 정보 가져오기
    const getItemData = (productId) => {
        const selectedProduct = products.find((item) => item.id === productId);
        const { name, price, quantity } = selectedProduct;

        return { selectedProduct, name, price, quantity };
    };

    return {
        addItem,
        removeItem,
        updateQuantity,
        getTotal,
        getItemData,
    };
};
