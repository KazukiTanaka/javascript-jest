const assert = require("assert").strict;
const FizzBuzz = require("./fizz_buzz");

test("isFizz function", () => {
    var array = [...Array(37).keys()].map(element => {
        return element * 3
    })
    array.shift()

    const fizzBuzz = new FizzBuzz()
    array.forEach(element => {
        assert.equal(true, fizzBuzz.isFizz(element))
    });
})

test("isBuzz function", () => {
    var array = [...Array(37).keys()].map(element => {
        return element * 5
    })
    array.shift()

    const fizzBuzz = new FizzBuzz()
    array.forEach(element => {
        assert.equal(true, fizzBuzz.isBuzz(element))
    });
})

test("isFizzBuzz function", () => {
    var array = [...Array(37).keys()].map(element => {
        return element * 15
    })
    array.shift()

    const fizzBuzz = new FizzBuzz()
    array.forEach(element => {
        assert.equal(true, fizzBuzz.isFizzBuzz(element))
    });
})

test("say function", () => {
    const fizzBuzz = new FizzBuzz()
    var array = [...Array(37).keys()]
    var result = []
    array.shift()

    array.forEach(element => {
        result.push(fizzBuzz.say(element))
    })
    let correctString = '1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16, 17, Fizz, 19, Buzz, Fizz, 22, 23, Fizz, Buzz, 26, Fizz, 28, 29, FizzBuzz, 31, 32, Fizz, 34, Buzz, Fizz'
    assert.equal(correctString, result.join(', '))
})
