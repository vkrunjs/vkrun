import { deepEqual } from '../deep-equal'

describe('deepEqual', () => {
  it('Should return true for equal strings', () => {
    expect(deepEqual('hello', 'hello')).toBeTruthy()
  })

  it('Should return false for different strings', () => {
    expect(deepEqual('hello', 'world')).toBeFalsy()
  })

  it('Should return true for equal boolean', () => {
    expect(deepEqual(true, true)).toBeTruthy()
  })

  it('Should return false for different boolean', () => {
    expect(deepEqual(true, false)).toBeFalsy()
  })

  it('Should return true for equal date', () => {
    const date = new Date()
    expect(deepEqual(date, date)).toBeTruthy()
  })

  it('Should return false for different date', () => {
    const dateA = new Date()
    const dateB = new Date('2000-20-03')
    expect(deepEqual(dateA, dateB)).toBeFalsy()
  })

  it('Should return true for equal arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBeTruthy()
  })

  it('Should return false for arrays with different lengths', () => {
    expect(deepEqual([1, 2, 3], [1, 2])).toBeFalsy()
  })

  it('Should return false for arrays with different elements', () => {
    expect(deepEqual([1, 2, 3], [3, 2, 1])).toBeFalsy()
  })

  it('Should return true for deeply nested equal arrays', () => {
    const arr1 = [[1, 2], [3, 4]]
    const arr2 = [[1, 2], [3, 4]]
    expect(deepEqual(arr1, arr2)).toBeTruthy()
  })

  it('Should return false for arrays with nested different elements', () => {
    const arr1 = [[1, 2], [3, 4]]
    const arr2 = [[1, 2], [3, 5]]
    expect(deepEqual(arr1, arr2)).toBeFalsy()
  })

  it('Should return true for deeply nested equal arrays', () => {
    const arr1 = [[[1]], [[2]]]
    const arr2 = [[[1]], [[2]]]
    expect(deepEqual(arr1, arr2)).toBeTruthy()
  })

  it('Should return true for equal objects', () => {
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeTruthy()
  })

  it('Should return false for different objects', () => {
    expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBeTruthy()
  })

  it('Should return false for objects with different keys', () => {
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, c: 3 })).toBeFalsy()
  })

  it('Should return true for deeply nested equal objects', () => {
    const obj1 = { a: { b: { c: 1 } } }
    const obj2 = { a: { b: { c: 1 } } }
    expect(deepEqual(obj1, obj2)).toBeTruthy()
  })

  it('Should return false for deeply nested different objects', () => {
    const obj1 = { a: { b: { c: 1 } } }
    const obj2 = { a: { b: { c: 2 } } }
    expect(deepEqual(obj1, obj2)).toBeFalsy()
  })

  it('Should return false for different types', () => {
    expect(deepEqual('hello', 123)).toBeFalsy()
  })

  it('Should return false for array vs. non-array', () => {
    expect(deepEqual([1, 2, 3], { a: 1, b: 2 })).toBeFalsy()
  })

  it('Should return false for array vs. non-array (value is array)', () => {
    expect(deepEqual([1, 2, 3], { a: 1, b: 2 })).toBeFalsy()
  })

  it('Should return false for array vs. non-array (valueToCompare is array)', () => {
    expect(deepEqual({ a: 1, b: 2 }, [1, 2, 3])).toBeFalsy()
  })
})
