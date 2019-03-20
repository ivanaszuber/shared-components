/* eslint-disable react/jsx-filename-extension */
import { hasDismissedCookie } from './Modal';

describe('Modal hasDismissedCookie', () => {
  it('return true if has dismissed cookie', () => {
    const cookie = hasDismissedCookie('foo=dismissed', 'foo');
    expect(cookie).toBe(true);
  });
  it('return false if no cookie match', () => {
    const cookie = hasDismissedCookie('bar=dismissed', 'foo');
    expect(cookie).toBe(false);
  });
});
