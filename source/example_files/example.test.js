const example = require('./example');
const { Timer } = require("../js/timer")

console.log(Timer)
// tests for hello (msg)
test('print hello msg', () => {
    console.log = jest.fn();
    example.hello('hello');
    expect(console.log.mock.calls[0][0]).toBe('hello');
});

// tests for sum (a, b)
test('adds 1 + 2 to equal 3', () => {
    expect(example.sum(1, 2)).toBe(3);
});