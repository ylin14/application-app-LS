export function createCartGoodsMarkup (goods) {

    const goodsMarkup = goods.length
       ? goods.map(({goodsName, price, link, id, shopId, quantity}) => {
        return `
        <li class="goodItemInCart" data-goodsId="${id}" data-shopId="${shopId}">
            <img src="${link}" alt="${goodsName}" class="cartImage">
                <p class="goodTitle">${goodsName}</p>
                <p class="goodPrice">Ціна товару: ${price}</p>
                <div class="quantityCounter">
                    <input type="number" class="goodQuantity" value="${quantity}">
                        <button type="button" class="button increment" >+</button>
                        <button type="button" class="button decrement">-</button>
                </div>
                <button type="button" class="removeItemButton">X</button>
        </li>`
    }).join('') : `<p>Cart is empty. Please, chose some goods.</p>`

    return `${goodsMarkup}`
}


