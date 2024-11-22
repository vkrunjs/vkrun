export interface VkrunMime {
  /**
   * Returns the MIME type corresponding to the given file extension.
   *
   * @param {string} extension - The file extension (e.g., 'txt', 'json', 'html', etc.).
   *
   * @returns {string | null} - The MIME type associated with the extension, or `null` if no matching MIME type is found.
   *
   * @example
   * // Example usage
   * mime.type('json') // Returns 'application/json'
   * mime.type('html') // Returns 'text/html'
   * mime.type('abc')  // Returns `null` if the extension does not exist
   */
  type: (extension: string) => string | null
}
