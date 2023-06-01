// import shops from "../../dataBaseImitation/shops.json" assert { type: "json" };


export function goodsCounter(goodsArr) {
    return goodsArr.reduce((acc, currentGoods) => {
        const existingIndex = acc.findIndex(item => item.id === currentGoods.id && item.shopId === currentGoods.shopId);
        if (existingIndex >= 0) {
            acc[existingIndex].quantity += 1;
        } else {
            acc.push({...currentGoods});
        }
        return acc;
    }, []);
}



