import { products } from "./data";
import { ProductOption, MainLayout } from "./templates";
import { createShoppingCart } from "./createShoppingCart";

const { updateQuantity } = createShoppingCart();

//추가버튼 클릭
const handleAddClick = () => {
    const productId = document.querySelector("#product-select").value;
    const selectedProduct = products.find((item) => item.id === productId);

    if (!selectedProduct) return;

    //상품추가 or 업데이트
    const $cartItem = document.getElementById(productId);
    $cartItem ? updateQuantity("plus", productId) : updateQuantity("add", productId);
};

function main() {
    //초기 렌더링
    const initLayout = () => {
        const $app = document.querySelector("#app");
        $app.innerHTML = MainLayout();

        const $select = document.querySelector("#product-select");
        $select.innerHTML = ProductOption(products);
    };

    initLayout();

    //추가버튼 이벤트
    const $addBtn = document.querySelector("#add-to-cart");
    $addBtn.addEventListener("click", handleAddClick);
}

main();
