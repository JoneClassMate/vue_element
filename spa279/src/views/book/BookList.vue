<template>
  <div class="backtop" style="height: 100%;overflow-y: auto">
    <!-- 1：面包屑-->
    <div style="margin: 15px;15px;15px;15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item><span style="font-weight: bold;">书本管理</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2：搜索栏-->
    <div style="margin-top: 50px;margin-left: 20px;">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="书本名称">
          <el-input v-model="bookname" placeholder="请输入书本名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-button icon="el-icon-search" type="success" plain @click="query">查询</el-button>
            <el-button class="el-icon-plus" type="primary" @click="dialogFormVisible = true" plain>&nbsp;新增书本
            </el-button>
            <el-button type="primary" @click="doImport" plain>导入数据</el-button>
            <el-button type="primary" @click="doExport" plain>导出数据</el-button>
            <el-button type="danger" :disabled="dis" @click="handleDelClick({})">批量删除</el-button>
            <!-- <span v-if="v-model:checkeds.length<1">
              <el-button type="danger" @click="handleDelClick({})" disabled>批量删除</el-button>
            </span> -->
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <!-- 3：数据表格-->
    <div>
      <template>
        <el-table @selection-change="handleSelectionChange" :data="tableData" style="width: 100%" border>
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="id" label="书本编号">
          </el-table-column>
          <el-table-column prop="bookname" label="书本名称">
          </el-table-column>
          <el-table-column prop="price" label="书本价格">
          </el-table-column>
          <el-table-column prop="booktype" label="书本类型">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleDelClick(scope.row)" type="text" size="small">删除</el-button>
              <el-button type="text" size="small" @click="handleEdClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 4：分页组件-->
    <div style="margin-top: 40px;margin-bottom: 10px;">
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
          :page-sizes="[5,10, 20, 30, 40]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 5.新增对话框-->
    <div>
      <el-dialog @close="close" :close-on-click-modal="false" :title="title" :visible.sync="dialogFormVisible"
        width="30%">
        <el-form :model="form" :rules="rules" ref="form">
          <!-- 判断标题是修改就显示书本编号-->
          <div v-if="title=='编辑书本'">
            <el-form-item label="书本编号" :label-width="formLabelWidth">
              <el-input readonly placeholder="请输入书本名称" v-model="form.id" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <el-form-item prop="bookname" label="书本名称" :label-width="formLabelWidth">
            <el-input placeholder="请输入书本名称" v-model="form.bookname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="price" label="书本价格" :label-width="formLabelWidth">
            <el-input placeholder="请输入书本价格" v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="booktype" label="书本类型" :label-width="formLabelWidth">
            <el-select v-model="form.booktype" placeholder="请选择书本类型">
              <el-option label="爱情" value="爱情"></el-option>
              <el-option label="喜剧" value="喜剧"></el-option>
              <el-option label="梦幻" value="梦幻"></el-option>
              <el-option label="惊悚" value="惊悚"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 6.返回顶部-->
    <div>
      <el-backtop target=".backtop"></el-backtop>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'BookList',
    data() {
      return {
        dis: true,
        checkeds: [], //接收文本框的数组
        bookname: '', //书本名称
        page: 1, //当前页码,
        rows: 5, //页大小
        total: 0, //总数据量
        tableData: [], //表格数据
        formLabelWidth: "80px", //新增表格宽度
        dialogFormVisible: false, //对话框默认关闭
        title: "新增书本", //对话框标题
        loading: 86400000, //加载配置
        form: { //新增书本提交数据参数
          bookname: null,
          price: null,
          booktype: null,
          id: null
        },
        rules: { //验证新增对话框
          bookname: [{
            required: true,
            message: '请输入书本名称',
            trigger: 'blur'
          }],
          booktype: [{
            required: true,
            message: '请选择书本类型',
            trigger: 'change'
          }],
          price: [{
            required: true,
            message: '请输入书本价格',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      query: function() {
        //定义请求参数
        let data = {
          bookname: this.bookname, //书本名称
          page: this.page, //当前页码
          rows: this.rows, //页大小
        }
        //定义请求路径
        let url = this.axios.urls.QueryBookPager;
        //开始请求
        this.axios.post(url, data).then(resp => { //成功回调函数
          /* console.info(resp.data.rows.length) */
          //将回调中的指定参数赋值
          this.tableData = resp.data.rows; //总数据
          this.total = resp.data.total; //总数据量
          //判断如果最大页码中删除那一页数据显示没有数据就进一页查询
          if (resp.data.rows.length < 1) {
            this.page = this.page - 1;
            this.query();
          }
        }).catch(resp => { //失败回调函数

        });
      },
      handleSizeChange: function(resp) { //一页展示多少条
        this.page = 1; //当前页码
        this.rows = resp; //页大小
        this.query(); //调用查询方法
      },
      handleCurrentChange: function(resp) { //改变页码
        this.page = resp;
        this.query(); //调用查询方法
      },
      doImport: function() { //导入方法
        //调用加载方法
        this.openFullScreen2();
        //定义请求地址
        let url = this.axios.urls.QueryBookImport;
        //开始请求后端
        this.axios.post(url).then(resp => { //成功回调函数
          //判断是否成功！给出相应的提示
          console.info(resp)
          if (resp.data.success) {
            this.$message({
              message: resp.data.msg,
              type: 'success'
            });
            //再次调用查询方法...更新数据
            this.query();
            //给加载方法赋值
            this.loading = 0;
            this.openFullScreen2();
            this.loading = 86400000;
          } else {
            this.$message({
              message: resp.data.msg,
              type: 'warning'
            });
            //再次调用查询方法...更新数据
            this.query();
          }
        }).catch(resp => { //失败回调函数
          console.info(resp)
        });
      },
      doExport: function() { //导出方法
        //调用加载方法
        this.openFullScreen2();
        //定义请求参数
        /* let data = this.bookname; */
        //定义请求地址
        let url = this.axios.urls.QueryBookExport;
        //开始请求后端
        this.axios.post(url).then(resp => { //成功回调函数
          //判断是否成功！给出相应的提示
          if (resp.data.success) {
            this.$message({
              message: resp.data.msg,
              type: 'success'
            });
            //再次调用查询方法...更新数据
            this.query();
            //给加载状态毫秒设置为0
            this.loading = 0;
            this.openFullScreen2();
            this.loading = 86400000;
          } else {
            this.$message({
              message: resp.data.msg,
              type: 'warning'
            });
            //再次调用查询方法...更新数据
            this.query();
          }
        }).catch(resp => { //失败回调函数
          console.info(resp)
        });

      },
      save: function() { //提交新增书本/编辑书本方法
        this.$refs['form'].validate((valid) => {
          //定义请求地址
          let url = this.axios.urls.AddBook;
          //判断标题如果是编辑书本就修改路径
          if ('编辑书本' == this.title) {
            url = this.axios.urls.EditBook;
          }
          //定义请求参数
          let data = {
            bookname: this.form.bookname,
            price: this.form.price,
            booktype: this.form.booktype,
            id: this.form.id
          }
          if (valid) { //验证成功
            //开始请求
            this.axios.post(url, data).then(resp => { //成功回调函数
              //判断是否成功
              if (resp.data.success) {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
              } else {
                this.$message.error('操作失败');
              }
              //刷新页面
              this.query();
              //关闭弹窗
              this.dialogFormVisible = false;
            }).catch(resp => { //失败回调函数

            });
          } else { //验证失败
            return false;
          }
        });
      },
      close: function() { //关闭新增书本对话框回调的方法
        this.$refs['form'].resetFields();
        //修改标题为增加
        this.title = "增加书本";
      },
      handleDelClick: function(id) { //删除书本方法

        let data = id.id ? id.id : this.checkeds;
        let url = this.axios.urls.delsBook + data;
        //询问框
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //开始请求后端路径
          this.axios.delete(url).then(e => {
            this.query();
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleEdClick: function(row) { //编辑书本方法
        //打开对话框
        this.dialogFormVisible = true;
        //修改标题(上方以判断...是根据标题跳转相应的请求)
        this.title = "编辑书本";
        //赋值
        this.form.id = row.id;
        this.form.bookname = row.bookname;
        this.form.price = row.price;
        this.form.booktype = row.booktype;
      },
      openFullScreen2: function() { //页面加载炫酷方法
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => { //加载配置方法
          loading.close();
        }, this.loading);
      },
      //对话框勾选方法
      handleSelectionChange: function(row) {
        this.checkeds = row.map(e => {
          return e.id;
        })

        if (row.length > 0) {
          this.dis = false;
        } else {
          this.dis = true;
        }

      },
      //批量删除的方法
      dels: function() {
        /* console.info(this.checkeds) */
        //开始请求后端代码
        //定义请求后端路径
        let url = this.axios.urls.delsBook + this.checkeds;
        console.info(url)
        //开始请求后端
        this.axios.delete(url).then(e => { //成功回调函数
          console.info(e)
        }).catch(e => {

        })
      }
    },
    created: function() { //钩子函数
      //调用查询方法更新数据
      this.query();

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    /* 圆角效果 */
    border-radius: 0.4em;
  }

  .el-dialog>.el-dialog__body {
    overflow: auto;
  }

  .el-dialog__header {
    background-color: #F5F7FA;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    font-weight: bold;
    padding: 15px 20px 15px;
    /* 圆角效果 */
    border-radius: 0.4em 0.4em 0em 0em;
  }

  .el-dialog__body {
    padding: 20px 15px;
  }

  .el-dialog__footer {
    background-color: #F5F7FA;
    border-top: 1px solid #ccc;
    padding: 15px;
    /* 圆角效果 */
    border-radius: 0em 0em 0.4em 0.4em;
  }

  .el-form>.el-form-item:last-child {
    margin-bottom: 0px;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .back-top-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* overflow: auto; */
  }
</style>
