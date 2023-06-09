import markup from "./markup/index.js"
import {refs} from "./variables/refs.js"
import localStorage from "./services/index.js"
import {SELECTED_SHOP_KEY, CHOSEN_GOODS_KEY} from "./variables/constants.js"

let shops = [];

//Робота з розміткою
async function insertShopMarkup() {
    const response = await fetch(`https://delivery-app-yurii.herokuapp.com/api/shops`);
    shops = (await response.json()).map(shop => ({id: shop._id, shopName: shop.shopName, goods: shop.goods}));

    const shopsMarkup = markup.createShopMarkup(shops);
    markup.addMarkup(shopsMarkup, refs.shopListRef);
}

function insertGoodsMarkup() {
    const shopId = localStorage.getFromLocalStorage(SELECTED_SHOP_KEY);
    const currentShop = shops.find(shop => shop.id === shopId);
    const goodsMarkup = markup.createGoodsMarkup(currentShop);
    markup.addMarkup(goodsMarkup, refs.goodsListWrapRef);
}

//Обробники подій
function onShopsListClick(event) {
    if (event.target === event.currentTarget) {
        return
    }

    const shopId = event.target.dataset.id;

    const cartGoods = localStorage.getFromLocalStorage(CHOSEN_GOODS_KEY);

    if (Array.isArray(cartGoods) && cartGoods.length > 0) {
        if (shopId !== cartGoods[0].shopId) {
            alert("You can select goods only from 1 shop")
            return
        }
    }

    localStorage.addToLocalStorage(SELECTED_SHOP_KEY, shopId);
    insertGoodsMarkup();
}

function onAddToCartClick(event) {
    if (event.target.classList.value !== "addToCart") {
        return
    }


    const shopId = localStorage.getFromLocalStorage(SELECTED_SHOP_KEY);
    const goodsId = Number(event.target.parentNode.dataset.id);

    const shop = shops.find(item => item.id === shopId);
    const selectedGoods = shop.goods.find(item => item.id === goodsId);

    const cartObj = {
        quantity: 1,
        shopId: shopId,
        ...selectedGoods
    }
    localStorage.addToLocalStorage(CHOSEN_GOODS_KEY, [cartObj]);
}

async function init() {
    await insertShopMarkup();
    insertGoodsMarkup();
}

//Оголошення слхачів подій
refs.shopListRef.addEventListener('click', onShopsListClick);
refs.goodsListWrapRef.addEventListener('click', onAddToCartClick)


init();