export function createShopMarkup (shops) {
    const shopItem = shops.map(({id, shopName})=> `<li class="shopItem" data-id="${id}">
        ${shopName}
    </li>`).join('');

    return `${shopItem}`
}