import v from 'vkrun'

const data = { id: 123, name: 'John' }
const config = {
  secretKey: '1ed7476351da556bfe73807bb15c8ac3749761324b124c07c920ab45c2cb9825',
  expiresIn: 60 // 60 seconds
}

const token = v.jwt().encrypt(data, config)
console.log({ token })

const decryptedToken = v.jwt().decrypt(token, config.secretKey)
console.log({ decryptedToken })