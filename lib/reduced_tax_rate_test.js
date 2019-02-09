const assert = require("assert").strict;
const ReducedTaxRater = require("./reduced_tax_rate");

let reducedTaxRater;
beforeEach(() => {
    reducedTaxRater = new ReducedTaxRater();
})

describe('商品名を渡すと商品カテゴリを返す', () => {
    test("紅ジャケを渡すと食料品と判定する", () => {
      assert.equal('food', reducedTaxRater.getCategory('手巻直火焼き紅しゃけ'));
    });
    test("からあげ棒を渡すと食料品と判定する", () => {
      assert.equal('food', reducedTaxRater.getCategory('からあげ棒'));
    });
    test("オロナミンCを渡すと飲料品と判定する", () => {
      assert.equal('beverage', reducedTaxRater.getCategory('オロナミンC'));
    })
    test("リポビタンDを渡すと医薬部外品と判定する", () => {
      assert.equal('quasi_drug', reducedTaxRater.getCategory('リポビタンD'));
    })
    test("DBにない商品を渡すと「none」と判定する", () => {
      assert.equal('none', reducedTaxRater.getCategory('いろはす'));
    })
});

describe('カテゴリーが軽減税率の対象かどうか判定する', () => {
    test("食料品だったらTrueを返す", () => {
        assert.equal(true, reducedTaxRater.isReducedTax('food'))
    })
    test("飲料品だったらTrue", () => {
        assert.equal(true, reducedTaxRater.isReducedTax('beverage'))
    })
    test("医薬部外品だったらFalse", () => {
        assert.equal(false, reducedTaxRater.isReducedTax('quasi_drug'))
    })
})

describe('商品名が軽減税率の対象かどうか判定する', () => {
    test('紅ジャケを渡すとtrueと判定する', () => {
        assert.equal(true, reducedTaxRater.judge('手巻直火焼き紅しゃけ'))
    }) 
    test('リポビタンDを渡すとfalseと判定する', () => {
        assert.equal(false, reducedTaxRater.judge('リポビタンD'))
    })
})

describe('商品の単価を出す', () => {
    test('紅しゃけを購入したら139を返す', () => {
        assert.equal(139, reducedTaxRater.getPrice('手巻直火焼き紅しゃけ'))
    })
    test('氷結を購入したら141を返す ', () => {
        assert.equal(141, reducedTaxRater.getPrice('キリンチューハイ氷結グレープフルーツ350ml缶'))
    })
})

describe('商品単価 * 個数 を計算', () => {
    test('紅しゃけを2個購入したら278', () => {
        assert.equal(278, reducedTaxRater.getItemTotal('手巻直火焼き紅しゃけ', 2))
    })
    test('氷結を3本購入したら423', () => {
        assert.equal(423, reducedTaxRater.getItemTotal('キリンチューハイ氷結グレープフルーツ350ml缶', 3))
    })
})

describe('税率を判定する', () => {
    test('軽減対象商品の税率は 8%', () => {
        assert.equal(1.08, reducedTaxRater.getTaxRate('手巻直火焼き紅しゃけ')) 
    })
    test('軽減対象外の商品の税率は 10%', () => {
        assert.equal(1.10, reducedTaxRater.getTaxRate('キリンチューハイ氷結グレープフルーツ350ml缶'))
    })
})

describe('税込価格を計算する', () => {
    test('紅しゃけを2個購入したら300.24', () => {
        assert.equal(300.24, reducedTaxRater.getSubTotal('手巻直火焼き紅しゃけ', 2))
    })
    test('氷結を3本購入したら465.3', () => {
        assert.equal(465.3, reducedTaxRater.getSubTotal('キリンチューハイ氷結グレープフルーツ350ml缶', 3))
    })
})
describe('端数は切り捨てとします', () => {
    test('300.24円の場合300', () => {
        assert.equal(300, reducedTaxRater.roundDown(300.24))
    })
    test('465.3円の場合465', () => {
        assert.equal(465, reducedTaxRater.roundDown(465.3))
    })
})

describe('合計金額を出力', () => {
    test('紅しゃけを2個と氷結を3本を購入すると765', () => {
        assert.equal(765, reducedTaxRater.buy([
            {name: '手巻直火焼き紅しゃけ', count: 2},
            {name: 'キリンチューハイ氷結グレープフルーツ350ml缶', count: 3}
        ]))
    })
    test('紅しゃけを1個と氷結を1本とリポビタンDを１本を購入すると', () => {
        assert.equal(465, reducedTaxRater.buy([
            {name: '手巻直火焼き紅しゃけ', count: 1},
            {name: 'キリンチューハイ氷結グレープフルーツ350ml缶', count: 1},
            {name: "リポビタンD", count: 1}
        ]))
    })
})

