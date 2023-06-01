export function createGoodsMarkup (shop) {
    const goodsItems = shop
        ?  shop.goods.map(({id, name, link, price})=> `<li class="goodsItem" data-id="${id}">
                    <img src="${link}" alt="${name}" class="image">
                    <p class="title">${name}</p>
                    <p class="price">$ ${price}</p>
                    <button type="button" class="addToCart">Add to cart</button>
                </li>`).join('')
        : `<p> There are no goods yet </p>`;


    return `
                ${goodsItems}
            `
}

