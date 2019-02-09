class ReducedTaxRater {
    constructor() {
        this.ITEM_LIST = this.initDB();
        this.REDUCED_TAX_CATEGORY_LIST = ['food', 'beverage'];
    }

    judge(itemName) {
        return this.isReducedTax(this.getCategory(itemName))
    }

    isReducedTax(categoryName) {
        return this.REDUCED_TAX_CATEGORY_LIST.includes(categoryName);
    }

    getItemFromDB(itemName) {
        const itemObj = this.ITEM_LIST.find(item => {
            return item.name === itemName;
        });
        if (itemObj === undefined) {
            return {};
        }
        return itemObj;
    }

    getCategory(itemName) {
        return this.getItemFromDB(itemName).category || 'none';
    }

    getPrice(itemName) {
        return this.getItemFromDB(itemName).price || 0;
    }

    getItemTotal(itemName, itemCount) {
        return this.getPrice(itemName) * itemCount;
    }

    getTaxRate(itemName) {
        if (this.judge(itemName)) {
            return 1.08;
        }
        return 1.1;
    }

    getSubTotal(itemName, itemCount) {
        return this.getItemTotal(itemName, itemCount) * this.getTaxRate(itemName)
    }

    roundDown(num) {
        return parseInt(num, 10)
    }

    buy(itemList) {
        return itemList.map(item => {
            return this.roundDown(this.getSubTotal(item.name, item.count));
        }).reduce((acc, current) => {
            return acc + current;
        })
    }

    initDB() {
        return [{
            name: "手巻直火焼き紅しゃけ",
            category: "food",
            price: 139
        }, {
            name: "からあげ棒",
            category: "food",
            price: 114
        }, {
            name: "オロナミンC",
            category: "beverage",
            price: 105
        }, {
            name: "リポビタンD",
            category: "quasi_drug",
            price: 146
        }, {
            name: "キリンチューハイ氷結グレープフルーツ350ml缶",
            category: "liquor",
            price: 141
        }]
    }
  }

  module.exports = ReducedTaxRater;