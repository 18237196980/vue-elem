import {
  getAction,
  postAction
} from '@/api/manage'

const givePerms = (params) => postAction('/ele/givePerms', params)
const allRoles = (params) => getAction('/ele/all/roles', params)
const assignRoleForUser = (params) => postAction('/ele/assignRoleForUser', params)
const goodsCateLevel = (params) => getAction('/ele/goodsCateLevel', params)

export default {
  givePerms,
  allRoles,
  assignRoleForUser,
  goodsCateLevel
}
