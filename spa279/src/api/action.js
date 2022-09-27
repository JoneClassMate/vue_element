/**
 * 对后台请求的地址的封装，URL格式如下：
 * 模块名_实体名_操作
 */
export default {
	'SERVER': 'http://localhost:8080/ssm', //服务器
	'SYSTEM_USER_DOLOGIN': '/user/userLogin', //登陆
	'SYSTEM_USER_DOREG': '/login/reg', //注册
  'QueryChildNodeByPid':'/module/queryRootNode',//初始化菜单首页
  'QueryBookPager':'/book/queryBookPager',//书本分页查询书本方法
  'QueryBookExport':'/book/queryBookExport',//书本导出数据方法
  'QueryBookImport':'/book/queryBookImport',//书本导入数据方法
  'AddBook':'/book/addBook',//书本新增方法
  'DelBook':'/book/delBook',//书本删除方法
  'EditBook':'/book/editBook',//书本编辑方法
  'delsBook':'/book/delsBook/',//书本批量删除方法
	'getFullPath': k => { //获得请求的完整地址，用于mockjs测试时使用
		return this.SERVER + this[k];
	}
}
