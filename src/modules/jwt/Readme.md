<div align="center">
  <img src="../../../logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun - JWT</h1>
  <br/>
  <p align="center">
    JWT is a Vkrun module for token encryption and decryption.
  </p>
</div>

<p align="center">
  <a href="https://github.com/jukerah" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-Mario%20Elvio-blue.svg" alt="created by Mario Elvio"></a>
  <a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/badge/License%20-MIT-blue.svg" alt="License MIT"></a>
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/npm/dw/vkrun.svg?color=blue" alt="npm"></a>
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/github/stars/jukerah/vkrun" alt="stars"></a>
</p>

### Content
- [Vkrun](../../../Readme.md)
- [Introduction](#introduction)
- [Encrypt](#encrypt)
- [Decrypt](#decrypt)

<h2 align="center">Introduction</h2>

The JWT is a Vkrun module developed to facilitate the encryption and decryption of JSON Web Tokens (JWT). These tokens are widely used for authentication and authorization in web applications and APIs.

By using the JWT, you can protect your sensitive data, ensuring that only authorized parties can access it. This document provides an overview of the available methods for encrypting and decrypting tokens.

<h2 align="encrypt">Encrypt</h2>

To encrypt an object and generate a JWT token, use the `encrypt` method provided by Vkrun. This method requires two parameters:

- **data**: The object to be encrypted.
- **config**: Configuration for encryption.
  - **secretKey**: Key or set of keys to encrypt and decrypt tokens. Use the key in string format or an array of **SHA256** strings.
  - **expiresIn**: Token expiration time.
    - **seconds**: To format `expiresIn` in seconds, use only numbers. For example, `10` equals 10 seconds.
    - **minute**: To format `expiresIn` in minutes, use the letter "m" at the end. For example, `"10m"` equals 10 minutes.
    - **hour**: To format `expiresIn` in hours, use the letter "h" at the end. For example, `"10h"` equals 10 hours.
    - **day**: To format `expiresIn` in days, use the letter "d" at the end. For example, `"10d"` equals 10 days.


```ts
import v from 'vkrun'

const data = { id: 123, name: 'John' }
const config = {
  secretKey: 'e72dc359476e5d1720ee5f516ba142fc0a1367d54d2cb49b0ffa53936efe0b94',
  expiresIn: '15m' // 15 minutes
}

const token = v.jwt.encrypt(data, config)
// example token: '538d55e53071f7f9bd3fb0c13d0607fa:67f675cda25e0489fa6ffad50f10addd87ddb5268f9d1f42a013d38aa891291491d8bf81ba6a667153ea0d94fe75bc20a472fde43f083220f911fa7faa1c82476b633b81d27a205e9d85120470cfe2734ba58e137a3295aff39d159827201c66'
```

<h2 align="decrypt">Decrypt</h2>

To decrypt a JWT token and obtain the original data, use the `decrypt` method provided by Vkrun. This method requires two parameters:

- **token**: The token to be decrypted.
- **secretKey**: Key or set of keys to encrypt and decrypt tokens. Use the key in string format or an array of **SHA256** strings.


```ts
import v from 'vkrun'

const data = { id: 456, name: 'Alice' }
const config = {
  secretKey: [
    'e9abbdfd4f24c3e1150273e292a208830ab561d6891dba6bd71921281e6573ad',
    '0ae59557603970221449961c63e82c7f1c7f602703c4f3c65f6cdd46367e879c',
    '124444a3a89aadafa1ec8f23af295ad28d890a9daacbc5d08ee3735c668bec57'
  ],
  expiresIn: 60 // 60 seconds
}

const token = v.jwt.encrypt(data, config)
// example token: '538d55e53071f7f9bd3fb0c13d0607fa:67f675cda25e0489fa6ffad50f10addd87ddb5268f9d1f42a013d38aa891291491d8bf81ba6a667153ea0d94fe75bc20a472fde43f083220f911fa7faa1c82476b633b81d27a205e9d85120470cfe2734ba58e137a3295aff39d159827201c66'

const decryptedToken = jwt.decrypt(token, config.secretKey)
// decryptedToken equals { id: 456, name: 'Alice' }
```
