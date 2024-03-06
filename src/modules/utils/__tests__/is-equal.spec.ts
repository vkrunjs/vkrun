import { isEqual } from '../is-equal'

describe('isEqual', () => {
  it('Should return true for equal strings', () => {
    expect(isEqual('hello', 'hello')).toBeTruthy()
  })

  it('Should return false for different strings', () => {
    expect(isEqual('hello', 'world')).toBeFalsy()
  })

  it('Should return true for equal boolean', () => {
    expect(isEqual(true, true)).toBeTruthy()
  })

  it('Should return false for different boolean', () => {
    expect(isEqual(true, false)).toBeFalsy()
  })

  it('Should return true for equal date', () => {
    const date = new Date()
    expect(isEqual(date, date)).toBeTruthy()
  })

  it('Should return false for different date', () => {
    const dateA = new Date()
    const dateB = new Date('2000-20-03')
    expect(isEqual(dateA, dateB)).toBeFalsy()
  })

  it('Should return true for equal arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBeTruthy()
  })

  it('Should return false for arrays with different lengths', () => {
    expect(isEqual([1, 2, 3], [1, 2])).toBeFalsy()
  })

  it('Should return true for equal arrays of objects', () => {
    const arr1 = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
    const arr2 = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
    expect(isEqual(arr1, arr2)).toBeTruthy()
  })

  it('Should return false for different arrays of objects', () => {
    const arr1 = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]
    const arr2 = [{ name: 'John', age: 30 }, { name: 'Jake', age: 28 }]
    expect(isEqual(arr1, arr2)).toBeFalsy()
  })

  it('Should return false for arrays with different elements', () => {
    expect(isEqual([1, 2, 3], [3, 2, 1])).toBeFalsy()
  })

  it('Should return true if arrays are not equal', () => {
    const arr1 = [[1, 2], [3, 4]]
    const arr2 = [[1, 2], [3, 4]]
    expect(isEqual(arr1, arr2)).toBeTruthy()
  })

  it('Should return false for arrays with nested different elements', () => {
    const arr1 = [[1, 2], [3, 4]]
    const arr2 = [[1, 2], [3, 5]]
    expect(isEqual(arr1, arr2)).toBeFalsy()
  })

  it('Should return true if arrays are equal', () => {
    const arr1 = [[[1]], [[2]]]
    const arr2 = [[[1]], [[2]]]
    expect(isEqual(arr1, arr2)).toBeTruthy()
  })

  it('Should return true for equal objects', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeTruthy()
  })

  it('Should return false for objects with different keys', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, c: 3 })).toBeFalsy()
  })

  it('Should return true for deeply nested equal objects', () => {
    const obj1 = { a: { b: { c: 1 } } }
    const obj2 = { a: { b: { c: 1 } } }
    expect(isEqual(obj1, obj2)).toBeTruthy()
  })

  it('Should return false for deeply nested different objects', () => {
    const obj1 = { a: { b: { c: 1 } } }
    const obj2 = { a: { b: { c: 2 } } }
    expect(isEqual(obj1, obj2)).toBeFalsy()
  })

  it('Should return false for different types', () => {
    expect(isEqual('hello', 123)).toBeFalsy()
  })

  it('Should return false for array vs. non-array', () => {
    expect(isEqual([1, 2, 3], { a: 1, b: 2 })).toBeFalsy()
  })

  it('Should return false for array vs. non-array (value is array)', () => {
    expect(isEqual([1, 2, 3], { a: 1, b: 2 })).toBeFalsy()
  })

  it('Should return false for array vs. non-array (valueToCompare is array)', () => {
    expect(isEqual({ a: 1, b: 2 }, [1, 2, 3])).toBeFalsy()
  })
})
