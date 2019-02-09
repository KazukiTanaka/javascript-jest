module.exports = class FizzBuzz {
  isZero(n) {
    return (n === 0)
  }
  isFizz(n) {
    if (this.isZero(n)) return false;
    return (n % 3 === 0)
  }
  isBuzz(n) {
    if (this.isZero(n)) return false;
    return (n % 5 === 0)
  }
  isFizzBuzz(n) {
    if (this.isZero(n)) return false;
    return this.isFizz(n) && this.isBuzz(n)
  }
  say(n) {
    if (this.isFizzBuzz(n)) {
      return 'FizzBuzz'
    } else if (this.isFizz(n)) {
      return 'Fizz'
    } else if (this.isBuzz(n)) {
      return 'Buzz'
    } else {
      return n
    }
  }
}
