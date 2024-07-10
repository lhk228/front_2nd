import { ProductOption, MainLayout, CartTotal } from "./templates";
import { products } from "./data";
import { createCartView } from "./createCartView";
import { createShoppingCart } from "./createShoppingCart";

const { addItem, removeItem, updateQuantity, getItems, getTotal, getItemData } = createShoppingCart();
//추가버튼 클릭
const handleAddClick = () => {
    const $cart = document.querySelector("#cart-items");
    const selected = document.querySelector("#product-select").value;
    const product = products.find((item) => item.id === selected);

    if (!product) return;

    //상품추가 or 업데이트
    const $cartItem = document.getElementById(product.id);
    $cartItem
        ? updateQuantity(product)
        : addItem($cart, product, { handleRemoveClick, handlePlusClick, handleMinusClick });
};

//더하기 버튼 클릭
const handlePlusClick = (e) => {
    const productId = e.target.dataset.productId;
    const target = document.querySelector(`#${productId}`);

    target.dataset.quantity++;

    createCartView(productId);
};

//빼기 버튼 클릭
const handleMinusClick = (e) => {
    const productId = e.target.dataset.productId;
    const target = document.querySelector(`#${productId}`);

    target.dataset.quantity--;

    if (target.dataset.quantity < 1) {
        handleRemoveClick(e);
        return;
    }

    createCartView(productId);
};

//삭제버튼 클릭 : 선택상품 삭제
const handleRemoveClick = (e) => {
    const productId = e.target.dataset.productId;
    const $targetItem = document.getElementById(productId);

    $targetItem && $targetItem.remove();
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
