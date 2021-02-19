import {
  getAction,
  postAction
} from '@/api/manage'

const givePerms = (params) => postAction('/ele/givePerms', params)
const allRoles = (params) => getAction('/ele/all/roles', params)
const assignRoleForUser = (params) => postAction('/ele/assignRoleForUser', params)
const goodsCateLevel = (params) => getAction('/ele/goodsCateLevel', params)

const addGoodsCate = (params) => postAction('/ele/addGoodsCate', params)
const editGoodsCate = (params) => postAction('/ele/editGoodsCate', params)
const getGoodsCate = (params) => getAction('/ele/getGoodsCate', params)
const delGoodsCate = (params) => getAction('/ele/delGoodsCate', params)

export default {
  givePerms,
  allRoles,
  assignRoleForUser,
  goodsCateLevel,
  addGoodsCate,
  getGoodsCate,
  editGoodsCate,
  delGoodsCate
}
