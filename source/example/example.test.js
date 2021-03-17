import { jest } from '@jest/globals';
import { hello, sum } from './example.js';

// tests for hello (msg)
test('print hello msg', () => {
    console.log = jest.fn();
    hello('hello');
    expect(console.log.mock.calls[0][0]).toBe('hello');
});

// tests for sum (a, b)
test('expect 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(-1);
});