import { ProductOption, MainLayout, CartTotal } from "./templates";
import { products } from "./data";
import { createCartView } from "./createCartView";
import { createShoppingCart } from "./createShoppingCart";

const { addItem, removeItem, updateQuantity, getItems, getTotal, getItemData } = createShoppingCart();

//추가버튼 클릭
const handleAddClick = () => {
    const selected = document.querySelector("#product-select").value;
    const product = products.find((item) => item.id === selected);

    if (!product) return;

    //상품추가 or 업데이트
    const $cartItem = document.getElementById(product.id);
    $cartItem ? updateQuantity("plus", product.id) : updateQuantity("add", product.id);
};

function main() {
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
