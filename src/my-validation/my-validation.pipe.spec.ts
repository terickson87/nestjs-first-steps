import { MyValidationPipe } from './my-validation.pipe';

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(new MyValidationPipe()).toBeDefined();
  });
});
