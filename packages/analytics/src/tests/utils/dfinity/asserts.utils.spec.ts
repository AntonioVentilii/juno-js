import {
  asNonNullish,
  assertNonNullish,
  assertPercentageNumber,
  InvalidPercentageError,
  NullishError
} from '../../../utils/dfinity/asserts.utils';

describe('asserts-utils', () => {
  describe('assertNonNullish', () => {
    it('should throw an exception if undefined', () => {
      const call = () => assertNonNullish(undefined);

      expect(call).toThrow();
    });

    it('should throw an exception if null', () => {
      const call = () => assertNonNullish(null);

      expect(call).toThrow();
    });

    it('should throw an exception with particular message', () => {
      const call = () => assertNonNullish(undefined, 'Test error');

      expect(call).toThrow(new NullishError('Test error'));
    });

    it('should not throw an exception if valid primitive type', () => {
      const call = () => assertNonNullish(1);
      expect(call).not.toThrow();
    });

    it('should not throw an exception if valid object', () => {
      const call = () => assertNonNullish({});
      expect(call).not.toThrow();
    });

    it('should make value of non-nullable type', () => {
      const getStringOrNull = (): string | null => 'test';
      const value: string | null = getStringOrNull();
      assertNonNullish(value);
    });
  });

  describe('asNonNullish', () => {
    it('should throw an exception if undefined', () => {
      const call = () => asNonNullish(undefined);

      expect(call).toThrow();
    });

    it('should throw an exception if null', () => {
      const call = () => asNonNullish(null);

      expect(call).toThrow();
    });

    it('should throw an exception with particular message', () => {
      const call = () => asNonNullish(undefined, 'Test error');

      expect(call).toThrow(new NullishError('Test error'));
    });

    it('should not throw an exception if valid primitive type', () => {
      const call = () => asNonNullish(1);
      expect(call).not.toThrow();
    });

    it('should not throw an exception if valid object', () => {
      const call = () => asNonNullish({});
      expect(call).not.toThrow();
    });

    it('should return the value if valid', () => {
      const value: string | undefined = 'test';
      const result: string = asNonNullish(value);
      expect(result).toBe(value);
    });
  });

  describe('assertPercentageNumber', () => {
    it('should not throw if valid percentage', () => {
      assertPercentageNumber(30);
    });

    it('should throw if not valid account id', () => {
      const call1 = () => assertPercentageNumber(300);
      expect(call1).toThrow(InvalidPercentageError);
    });
  });
});
