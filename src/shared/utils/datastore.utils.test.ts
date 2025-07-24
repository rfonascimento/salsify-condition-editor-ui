import { describe, it, expect } from 'vitest';
import { OPERATOR_HANDLER_BY_TYPE } from './datastore.utils.ts';

describe('OPERATOR_HANDLER_BY_TYPE', () => {
  describe('equals operator', () => {
    it('should return true when search value is empty', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['equals']('')).toBe(true);
    });
    it('should return true when search value is the same has the product value', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['equals']('FOO', 'FOO')).toBe(true);
    });
    it('should return false when search value is the same has the product value', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['equals']('FOO', 'foo')).toBe(false);
    });
    it('should return false when search value is set but product value is undefined', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['equals']('FOO', undefined)).toBe(false);
    });
  });

  describe('greater_than operator', () => {
    it('should return true when search value is empty', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['greater_than']('', '2')).toBe(true);
    });

    it('should return true when product value is greater than the search value', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['greater_than']('1', '2')).toBe(true);
    });

    it('should return true when product value is greater than the search value with type number', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['greater_than']('1', 2)).toBe(true);
    });

    it('should return false when product value is not greater than the search value', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['greater_than']('2', '1')).toBe(false);
    });

    it('should return false when product value is the same has the the search value', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['greater_than']('1', '1')).toBe(false);
    });
  });

  describe('less_than operator', () => {
    it('should return true when search value is empty', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['less_than']('', '2')).toBe(true);
    });

    it('should return true when product value is less than the search value', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['less_than']('2', '1')).toBe(true);
    });

    it('should return true when product value is less than the search value with type number', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['less_than']('2', 1)).toBe(true);
    });

    it('should return false when product value is not less than the search value', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['less_than']('1', '2')).toBe(false);
    });

    it('should return false when product value is the same has the the search value', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['less_than']('1', '1')).toBe(false);
    });
  });

  describe('any operator', () => {
    it('should return true when product number is defined', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['any']('', '')).toBe(true);
    });

    it('should return false when product number is not defined', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['any']('', undefined)).toBe(false);
    });
  });

  describe('none operator', () => {
    it('should return true when product number is not defined', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['none']('', undefined)).toBe(true);
    });

    it('should return false when product number is defined', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['none']('', '')).toBe(false);
    });
  });

  describe('in operator', () => {
    it('should return true when search value is empty', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['in']('', '')).toBe(true);
    });

    it('should return true when search value has values equal to the product value', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['in']('CELLPHONE,KEY,CUP', 'KEY')).toBe(
        true,
      );
    });

    it('should return false when search value does not have values equal to the product value', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['in']('CELL PHONE ,CUP', 'KEY')).toBe(
        false,
      );
    });
  });

  describe('contains operator', () => {
    it('should return true when search value is empty and product value is empty', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['contains']('', '')).toBe(true);
    });

    it('should return true when product value contains search value', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['contains']('phone', 'CELLPHONE')).toBe(
        true,
      );
    });

    it('should return false when product value does not contain search value', () => {
      expect(OPERATOR_HANDLER_BY_TYPE['contains']('cup', 'CELLPHONE')).toBe(
        false,
      );
    });
  });
});
