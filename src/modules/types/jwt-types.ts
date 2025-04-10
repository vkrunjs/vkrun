export interface VkrunJwt {
  /**
   * @method encrypt
   *
   * Encrypts the provided data using the specified configuration. The JWT includes
   * the data and metadata, such as the creation time and expiration time. The method uses AES-256-CBC encryption
   * to securely encode the data.
   *
   * **JWT Encryption Process:**
   * - The data is serialized into JSON format.
   * - The expiration time is converted to milliseconds.
   * - A random secret key is selected from an array of keys, if provided.
   * - The serialized data is encrypted using AES-256-CBC with the selected secret key.
   *
   * @param {any} data - The data to be encrypted into the JWT. This can be any type of data.
   * @param {JwtEncryptConfig} config - The configuration object for the encryption, which includes:
   *   - `secretKey`: A string or an array of strings representing the secret key(s) used to encrypt the JWT.
   *   - `expiresIn`: The expiration time of the token, which can be a number (in milliseconds) or a string (e.g., '5m', '1h').
   *
   * @returns {JwtToken} - The encrypted JWT, which is a string that represents the encrypted data.
   *
   * @throws {Error} - Throws an error if the `secretKey` is invalid or if the `expiresIn` format is incorrect.
   *
   * @example
   * // Encrypting data with a single secret key and a 60-second expiration
   * const data = { id: 123, name: 'John' }
   * const config = { secretKey: 'your-secret-key-SHA256', expiresIn: 60 }
   * const token = jwt().encrypt(data, config)
   * console.log(token)  // Outputs the encrypted JWT
   */
  encrypt: (data: any, config: JwtEncryptConfig) => JwtToken;

  /**
   * @method decrypt
   *
   * Decrypts a JWT token back into the original data using the provided secret key(s). If the token has expired
   * or if the provided secret key(s) do not match the encryption key used to encrypt the token, the decryption
   * will fail and return `null`. The method checks for expiration and tries each secret key in the array (if multiple).
   *
   * **JWT Decryption Process:**
   * - The method attempts to decrypt the provided token using the secret key(s) and checks for expiration.
   * - If the decryption is successful and the token has not expired, the original data is returned.
   * - If any error occurs during decryption or if the token has expired, the method tries the next key (if available).
   *
   * @param {JwtToken} token - The encrypted JWT that contains the data to be decrypted.
   * @param {string | string[]} secretKey - A string or an array of strings representing the secret key(s) to decrypt the JWT.
   *
   * @returns {any | null} - The original decrypted data if the token is valid and not expired. Returns `null` if
   * the token is expired or decryption fails.
   *
   * @throws {Error} - Throws an error if the secret keys provided are in an invalid format.
   *
   * @example
   * // Decrypting a token using the correct secret key
   * const token = 'encryptedTokenString'
   * const secretKey = 'your-secret-key-SHA256'
   * const decryptedData = jwt().decrypt(token, secretKey)
   * console.log(decryptedData)  // Outputs the original data
   */
  decrypt: (token: JwtToken, secretKey: string | string[]) => any | null;
}

export interface JwtEncryptConfig {
  secretKey: string | string[];
  expiresIn: number | string;
}

export interface JwtTokenData {
  data: any;
  config: {
    createdAt: number;
    expiresIn: number;
  };
}

export type JwtToken = string;
