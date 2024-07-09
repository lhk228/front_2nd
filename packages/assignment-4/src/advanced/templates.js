const ProductOption = (products) => {
    const $select = document.querySelector("#product-select");
    let optionHtml = "";

    products.forEach((item) => (optionHtml += `<option value="${item.id}">${item.name} - ${item.price}원</option>`));

    $select.innerHTML = optionHtml;
};

const MainLayout = () => {
	const $app = document.querySelector("#app");
    const html = ` <div class="bg-gray-100 p-8">
            <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
                <h1 class="text-2xl font-bold my-4">장바구니</h1>
                <div id="cart-items"></div>
                <div id="cart-total" class="text-xl font-bold my-4"></div>
                <select id="product-select" class="border rounded p-2 mr-2"></select>
                <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
            </div>
        </div>`;
    $app.innerHTML = html;
}

const CartItem = () => ``;

const CartTotal = () => ``;

export { ProductOption, MainLayout, CartItem, CartTotal };
