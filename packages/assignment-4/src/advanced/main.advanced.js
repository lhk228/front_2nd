import { PRODUCTS } from "./data";
import { ProductOption, MainLayout } from "./templates";
import { createShoppingCart } from "./createShoppingCart";

const { updateQuantity } = createShoppingCart();

//장바구니 상품별 버튼 클릭
const handleCartItemButtnClick = (event) => {
    const $target = event.target;
    const productId = $target.dataset.productId;

    if ($target.classList.contains("remove-item")) {
        updateQuantity("remove", productId);
    } else if ($target.classList.contains("plus-item")) {
        updateQuantity("plus", productId);
    } else if ($target.classList.contains("minus-item")) {
        updateQuantity("minus", productId);
    }
};

//추가버튼 클릭
const handleAddClick = () => {
    const productId = document.querySelector("#product-select").value;
    const selectedProduct = PRODUCTS.find((item) => item.id === productId);

    if (!selectedProduct) return;

    //상품추가 or 업데이트
    const $cartItem = document.getElementById(productId);
    $cartItem ? updateQuantity("plus", productId) : updateQuantity("add", productId);
};

function main() {
    //기본 레이아웃 추가
    const $app = document.querySelector("#app");
    $app.innerHTML = MainLayout();

    //select option 생성
    const $select = document.querySelector("#product-select");
    $select.innerHTML = ProductOption(PRODUCTS);

    //추가버튼 이벤트 바인딩
    const $addBtn = document.querySelector("#add-to-cart");
    $addBtn.addEventListener("click", handleAddClick);

    //장바구니 상품별 버튼 이벤트 바인딩
    const $cartList = document.querySelector("#cart-items");
    $cartList.addEventListener("click", handleCartItemButtnClick);
}

main();
