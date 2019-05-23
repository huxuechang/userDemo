/**
 * api接口统一管理
 */
import { get, post } from './http'

/**
 * p 为携带的参数 为对象
 * @param p
 * @returns {*}
 */
export const apiAddress = p => post('api/v1/users/my_address/address_edit_before', p);