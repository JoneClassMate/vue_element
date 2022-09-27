/* 同步修改值 */
export default {
  setName: (state, payload) => {
    return state.name = payload.name;
  },
  setCollapsed: (state, payload) => {
    return state.collapsed = payload.name;
  },
  setJwt: (state, payload) => {
    return state.jwt = payload.jwt;
  },
  setRoleId:(state,payload)=>{
    return state.roleId=payload.roleId;
  }
}
