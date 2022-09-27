/* 异步修改值 */
export default {
     setResturantNameByAsync: function(context, payload) {
       setTimeout(() => {
         context.commit('setName', payload);//Action提交的是mutation
       }, 3000);
     }
}
