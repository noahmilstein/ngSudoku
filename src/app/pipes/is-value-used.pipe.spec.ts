import { IsValueUsedPipe } from './is-value-used.pipe';

describe('IsValueUsedPipe', () => {
  it('create an instance', () => {
    const pipe = new IsValueUsedPipe();
    expect(pipe).toBeTruthy();
  });
});
