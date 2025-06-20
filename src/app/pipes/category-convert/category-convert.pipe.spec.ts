import { CategoryConvertPipe } from './category-convert.pipe';

describe('CategoryConvertPipe', () => {
  let pipe: CategoryConvertPipe;

  beforeEach(() => {
    pipe = new CategoryConvertPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not transform', () => {
    const startValue = 'category';
    const result = pipe.transform(startValue);
    expect(result).toBe(startValue);
  });

  it('should transform', () => {
    const result = pipe.transform('mock-category');
    expect(result).toBe('mock category');
  });
});
