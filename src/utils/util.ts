import axios from 'axios'
import crypto from 'crypto'
import { logger } from './logger'
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true
  } else if (typeof value !== 'number' && value === '') {
    return true
  } else if (typeof value === 'undefined' || value === undefined) {
    return true
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true
  } else {
    return false
  }
}

/**
 * @method hashJsonAtUrl
 * @param {String} url
 * @param {String} method The hashing algorithm to use (default is 'sha256')
 * @returns {Promise<String>} The hash of the file, if file is valid JSON
 * @description Get a hash from content of file at a given url
 */
export const hashJsonAtUrl = async (url: string, method = 'sha256'): Promise<string> => {
  try {
    logger.log('info', `[Hash] Fetching JSON from ${url}...`)
    // Do not parse data automatically (get raw JSON string)
    const response = await axios.get(url, { transformResponse: data => data })
    const hashSum = crypto.createHash(method)
    hashSum.update(response.data)

    const hex = hashSum.digest('hex')

    return hex
  } catch (error) {
    throw error
  }
}
