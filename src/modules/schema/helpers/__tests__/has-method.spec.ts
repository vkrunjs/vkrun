import { hasMethod } from '../has-method'

describe('hasMethod', () => {
  const rules = [
    { method: 'equal' },
    { method: 'string', maxLength: 10 },
    { method: 'email' },
    { method: 'minLength', minLength: 5 },
    { method: 'date', dateType: 'YYYY/MM/DD' },
    { method: 'notRequired' },
    { method: 'number', min: 0, max: 100 },
    { method: 'array', arrayType: 'object', arrayRules: [{ method: 'string' }] },
    { method: 'object', schema: { name: { method: 'string' } } },
    { method: 'alias', alias: 'customAlias' }
  ]

  it('should return true if value array contains a rule with the specified method', () => {
    expect(hasMethod(rules, 'equal')).toBe(true)
    expect(hasMethod(rules, 'email')).toBe(true)
    expect(hasMethod(rules, 'date')).toBe(true)
    expect(hasMethod(rules, 'notRequired')).toBe(true)
    expect(hasMethod(rules, 'number')).toBe(true)
    expect(hasMethod(rules, 'array')).toBe(true)
    expect(hasMethod(rules, 'object')).toBe(true)
    expect(hasMethod(rules, 'alias')).toBe(true)
  })

  it('should return false if value array does not contain a rule with the specified method', () => {
    const rules: any = []
    expect(hasMethod(rules, 'array')).toBe(false)
    expect(hasMethod(rules, 'string')).toBe(false)
    expect(hasMethod(rules, 'min')).toBe(false)
    expect(hasMethod(rules, 'max')).toBe(false)
    expect(hasMethod(rules, 'time')).toBe(false)
  })

  it('should return false if value array is empty or null', () => {
    expect(hasMethod([], 'equal')).toBe(false)
    expect(hasMethod(null, 'email')).toBe(false)
  })

  it('should return false if the method does not exist in the rules', () => {
    const rules = [{ maxLength: 10 }]
    expect(hasMethod(rules, 'maxLength')).toBe(false)
  })
})
