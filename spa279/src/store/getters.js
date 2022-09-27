/* 获取值 */
export default {
  getName: (state) => {
    return state.name;
  },
  getCollapsed: (state) => {
    return state.collapsed;
  },
  getJwt: (state) => {
    return state.jwt;
  },
  getRoleId:(state)=>{
	  return state.roleId;
  }

}
