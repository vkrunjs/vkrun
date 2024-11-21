export const isEmail = (value: any): boolean => {
  const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regEmail.test(String(value))
}
