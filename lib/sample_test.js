const assert = require("assert").strict;
const Sample = require("./sample");
const rewire = require("rewire");

test("exported class", () => {
  let ret = "";
  const print = str => (ret = str);
  const sample = new Sample(print);
  sample.say();
  assert.equal(ret, "Hello TDDBC!");
  assert.equal("a", "a");
});

const SampleImpl = rewire("./sample");
test("private function", () => {
  const hello = SampleImpl.__get__("hello");
  expect(hello()).toBe("Hello TDDBC!");
});
