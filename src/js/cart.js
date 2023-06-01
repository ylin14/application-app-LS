import localStorage from "./services/index.js";
import {CHOSEN_GOODS_KEY} from "./variables/constants.js";
import markup from "./markup/index.js";
import {refs} from "./variables/refs.js";
import orders from "../dataBaseImitation/orders.json" assert { type: "json" };

// Робота з розміткою
function insertGoodsMarkup () {
    const cartItems = localStorage.getFromLocalStorage(CHOSEN_GOODS_KEY);
    const goods = cartItems ? cartItems : [];
    const totalAmount = `Total amount: ${totalAmountCounter(goods)}$`;

    refs.totalAmount.textContent = totalAmount;
    const cartMarkup = markup.createCartGoodsMarkup(goods);
    markup.addMarkup(cartMarkup, refs.cartListRef);

}

// Обробники подій
function onButtonClickHandler(event) {
    let updatedGoods;
    const selectedGoods = localStorage.getFromLocalStorage(CHOSEN_GOODS_KEY);
    if(event.target.classList.value === "removeItemButton") {
        const clickedGood = Number(event.target.parentNode.dataset.goodsid);
        const clickedShop = event.target.parentNode.dataset.shopid;
        updatedGoods = selectedGoods.filter(({id, shopId}) => id !== clickedGood || shopId !== clickedShop);
        localStorage.updateLocalStorage(CHOSEN_GOODS_KEY, updatedGoods)
        insertGoodsMarkup ();
    }

    if (event.target.classList[0] === "button") {
        const goodsId = event.target.parentNode.parentNode;

        const clickedGood = Number(goodsId.dataset.goodsid);
        const clickedShop = goodsId.dataset.shopid;

        const goods = localStorage.getFromLocalStorage(CHOSEN_GOODS_KEY);
        const elementIndex = goods.findIndex(({id, shopId}) => id === clickedGood && shopId === clickedShop);
        if (event.target.classList.value === "button increment") {
            goods[elementIndex].quantity += 1;
        } else if (event.target.classList.value === "button decrement") {
            if (goods[elementIndex].quantity > 1) {
                goods[elementIndex].quantity -= 1;
            }
        }
        updatedGoods = [...goods];
        localStorage.updateLocalStorage(CHOSEN_GOODS_KEY, updatedGoods)
        insertGoodsMarkup ();
    }


}

function onClearCartBtnClick() {
    localStorage.deleteFromLocalStorage(CHOSEN_GOODS_KEY);
    insertGoodsMarkup();
}

async function onSubmit (event) {
    event.preventDefault();
    const form = refs.formRef.elements;
    const goods = localStorage.getFromLocalStorage(CHOSEN_GOODS_KEY);

    if (!goods || !goods.length) {
        alert("Please, chose some goods, bro")
        return
    }

    const order = {
        goods,
        customer: {
            name: form[0].value,
            email: form[1].value,
            phone: form[2].value,
            address: form[3].value
        }
    }

    const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    }
    await fetch("https://delivery-app-yurii.herokuapp.com/api/orders", options);
    onClearCartBtnClick();
    alert("Your order is successful! :)")
}

//Хелперси
function totalAmountCounter(goodsArr) {
    return goodsArr.reduce((acc, currentGoods) => {
        acc += currentGoods.price * currentGoods.quantity;
        return acc;
    }, 0)
}

function init () {
    insertGoodsMarkup();
}

// Додавання слухачів
refs.cartGoods.addEventListener("click", onButtonClickHandler);
refs.clearCartBtnRef.addEventListener("click", onClearCartBtnClick);
refs.formRef.addEventListener("submit", onSubmit);


init ();