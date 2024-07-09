const products = [
    { id: "p1", name: "상품1", price: 10000 },
    { id: "p2", name: "상품2", price: 20000 },
    { id: "p3", name: "상품3", price: 30000 },
];

//전역 핸들링 elements
const { el_Cart, el_Total, el_Box, el_SelectBox, el_AddButton } = createCartBaseElements();

//장바구니 기본요소 생성
function createCartBaseElements() {
    const container = document.getElementById("app");

    const htmlContent = `
        <div class="bg-gray-100 p-8">
            <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
                <h1 class="text-2xl font-bold my-4">장바구니</h1>
                <div id="cart-items"></div>
                <div id="cart-total" class="text-xl font-bold my-4"></div>
                <select id="product-select" class="border rounded p-2 mr-2"></select>
                <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
            </div>
        </div>
    `;

    container.innerHTML = htmlContent;

    const el_Cart = container.querySelector("#cart-items");
    const el_Total = container.querySelector("#cart-total");
    const el_SelectBox = container.querySelector("#product-select");
    const el_AddButton = container.querySelector("#add-to-cart");

    return { el_Cart, el_Total, el_SelectBox, el_AddButton };
}

//장바구니 내 버튼 생성
const createButtonElement = (className, text, id, changeFunc) => {
    const button = document.createElement("button");
    button.className = className;
    button.textContent = text;
    button.dataset.productId = id;
    button.dataset.change = changeFunc;
    return button;
};

//장바구니 목록 생성
function createCartItemElements(item) {
    const { name, id, price } = item;

    const el_itemContainer = document.createElement("div");
    el_itemContainer.id = id;
    el_itemContainer.className = "flex justify-between items-center";

    const el_itemInfo = document.createElement("span");

    el_itemInfo.textContent = `${name} - ${price}원 x 1`;

    const el_buttonWrap = document.createElement("div");

    const el_minusButton = createButtonElement(
        "quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1",
        "-",
        id,
        "-1"
    );

    const el_plusButton = createButtonElement(
        "quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1",
        "+",
        id,
        "1"
    );

    const el_removeButton = createButtonElement(
        "remove-item bg-red-500 text-white px-2 py-1 rounded",
        "삭제",
        id,
        "remove"
    );

    el_buttonWrap.appendChild(el_minusButton);
    el_buttonWrap.appendChild(el_plusButton);
    el_buttonWrap.appendChild(el_removeButton);

    el_itemContainer.appendChild(el_itemInfo);
    el_itemContainer.appendChild(el_buttonWrap);

    el_Cart.appendChild(el_itemContainer);
}

//상품 옵션 생성
function createProductOptions(el_SelectBox) {
    for (var i = 0; i < products.length; i++) {
        var elOption = document.createElement("option");
        elOption.value = products[i].id;
        elOption.textContent = products[i].name + " - " + products[i].price + "원";
        el_SelectBox.appendChild(elOption);
    }
}

//할인율 계산
function calculateDiscountRate(itemType) {
    switch (itemType) {
        case "p1":
            return 0.1;
        case "p2":
            return 0.15;
        case "p3":
            return 0.2;
    }
}

//추가 할인 계산
function calculateAdditionalDiscount(totalQuantity, totalDiscountPrice, totalOriginalPrice) {
    let discountRate = (totalOriginalPrice - totalDiscountPrice) / totalOriginalPrice;
    let finalPrice = totalDiscountPrice;

    // 30개 이상일 경우 높은 할인율 적용
    if (totalQuantity >= 30) {
        finalPrice = totalOriginalPrice * 0.75;
        discountRate = 0.25;
    }

    return { discountRate, finalPrice };
}

//최종 계산결과 표시
function displayCartResult(discountRate, price) {
    el_Total.textContent = "총액: " + Math.round(price) + "원";

    if (discountRate > 0) {
        var dspan = document.createElement("span");
        dspan.className = "text-green-500 ml-2";
        dspan.textContent = "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)";
        el_Total.appendChild(dspan);
    }
}

//장바구니 상품별 계산
function calculateCartItemDetails(el_CartItems) {
    let totalQuantity = 0;
    let totalOriginalPrice = 0;
    let totalDiscountedPrice = 0;
    Array.from(el_CartItems).forEach((item) => {
        const target = products.find((product) => product.id === item.id);
        const itemType = target.id;

        let quantity = parseInt(item.querySelector("span").textContent.split("x ")[1]);
        let calPrice = target.price * quantity;

        totalQuantity += quantity;
        totalOriginalPrice += calPrice;

        const discountRate = quantity >= 10 ? calculateDiscountRate(itemType) : 0;

        totalDiscountedPrice += calPrice * (1 - discountRate);
    });

    return { totalQuantity, totalDiscountedPrice, totalOriginalPrice };
}

//장바구니 업데이트
function updateCart() {
    const el_CartItems = el_Cart.children;

    //장바구니 상품 계산
    const { totalQuantity, totalDiscountedPrice, totalOriginalPrice } = calculateCartItemDetails(el_CartItems);

    //추가할인 계산
    let { discountRate, finalPrice } = calculateAdditionalDiscount(
        totalQuantity,
        totalDiscountedPrice,
        totalOriginalPrice
    );

    //최종 계산결과 표시
    displayCartResult(discountRate, finalPrice);
}

//상품 수량 표시
function displayItemQuantity(targetElement, targetProduct) {
    const { name, price } = targetProduct;
    const quantity = parseInt(targetElement.querySelector("span").textContent.split("x ")[1]) + 1;
    targetElement.querySelector("span").textContent = `${name} - ${price}원 x ${quantity}`;
}

//장바구니에 상품 추가
function addCartItem() {
    var selectedValue = el_SelectBox.value;
    var targetProduct = products.find((product) => product.id === selectedValue);

    if (targetProduct) {
        const cartItem = document.getElementById(targetProduct.id);
        cartItem ? displayItemQuantity(cartItem, targetProduct) : createCartItemElements(targetProduct);
        updateCart();
    }
}

//담긴상품정보 추출
function getCartItemStatus(targetText) {
    const itemInfo = targetText[0];
    const itemQuantity = parseInt(targetText[1]);
    return { itemInfo, itemQuantity };
}

//장바구니 상품 관리
function manageCartItem(event) {
    const target = event.target;
    const isChangeButton = target.classList.contains("quantity-change");
    const isRemoveButton = target.classList.contains("remove-item");

    if (!isChangeButton && !isRemoveButton) return;

    const productId = target.dataset.productId;
    const el_targetItem = document.getElementById(productId);

    const targetText = el_targetItem.querySelector("span").textContent.split("x ");
    const { itemInfo, itemQuantity } = getCartItemStatus(targetText);

    if (isChangeButton) {
        const quantityChange = parseInt(target.dataset.change);
        let quantity = itemQuantity + quantityChange;

        quantity <= 0
            ? el_targetItem.remove()
            : (el_targetItem.querySelector("span").textContent = `${itemInfo}x ${quantity}`);
    }

    isRemoveButton && el_targetItem.remove();

    updateCart();
}

function main() {
    //상품 목록 Option 생성
    createProductOptions(el_SelectBox);

    //추가버튼 클릭
    el_AddButton.addEventListener("click", addCartItem);

    //추가된 상품목록 내 버튼 클릭
    el_Cart.addEventListener("click", manageCartItem);
}

main();
