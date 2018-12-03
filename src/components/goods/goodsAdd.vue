<template>
  <el-card class="box-card">
    <div class="bread">
      <my-bread level1="商品管理" level2="商品列表"></my-bread>
    </div>
    <el-alert class="alert" center title="添加商品信息" type="success" show-icon></el-alert>
    <!-- steps 步骤条 -->
    <el-steps :active="1*active" finish-status="success" simple style="margin-top: 20px">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-form label-position="top" label-width="80px" style="height:350px;overflow:auto;" :model="form">
      <!-- tabs 标签页 -->
      <el-tabs @tab-click="tabchange" tab-position="left" v-model="active">
        <!-- 基本信息 -->
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader expand-trigger="hover" :options="cateList" :props="defaultProps" v-model="selectedOptions"
              clearable @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-tab-pane>
        <!-- 商品参数  点击tab 获取被选的项的参数 -->
        <el-tab-pane name="2" label="商品参数">
          <el-form-item label="" v-for="(item1, index) in arrDTparams" :key="index">
            {{ item1.attr_name }}
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox :label="item2" v-for="(item2, index1) in item1.attr_vals" :key="index1"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <!-- 商品属性--静态属性 -->
        <el-tab-pane name="3" label="商品属性">
          <el-form-item v-for="(item, index) in arrJTparams" :key="index">
            {{ item.attr_name }}
            <el-input v-model="item.attr_vals" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- 商品图片 -->
        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
            <el-upload action="http://localhost:8888/api/private/v1/upload" :headers="headers" :on-preview="handlePreview"
              :on-remove="handleRemove" :on-success="handleSuccess" multiple list-type="picture">
              <el-button size="small" type="primary">上传图片</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <!-- 商品内容 -->
        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
            <!-- :options="editorOption"  去数据源options里面绑定对应的key -->
            <quill-editor ref="myQuillEditor" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)"
              :file-list="fileList" v-model="form.goods_introduce">
            </quill-editor>
            <el-button type="primary" @click="addGoods" plain>确认添加商品</el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>
<script>
  // require styles
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";
  import "quill/dist/quill.bubble.css";
  import {
    quillEditor
  } from "vue-quill-editor";
  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        active: "1",
        form: {
          goods_name: "", //	商品名称	不能为空
          goods_price: "", //	价格	不能为空
          goods_number: "", //	数量	不能为空
          goods_weight: "", //	重量	不能为空
          goods_introduce: "", //	介绍	可以为空
          goods_cat: "", //	以为','分割的分类列表	不能为空
          // pics:[]  [每个图片的临时路径{pic:'......'}]
          pics: [], //	上传的图片(临时路径（对象）)	可以为空
          attrs: [] //	商品的参数（数组）	可以为空}
        },
        defaultProps: {
          //唯一标识
          value: "cat_id",
          label: "cat_name",
          children: "children"
        },

        // 分类列表
        cateList: [],
        // 分类级联选择器 v-model绑定的value的值
        selectedOptions: [], // [1,3,6]
        fileList: [],
        arrDTparams: [],
        arrJTparams: [],
        arr_vals: [],

        // 图片上传
        headers: {
          Authorization: localStorage.getItem("token")
        }
      };
    },
    mounted() {
      this.getCateList();
      // this.getParamsList(),
      // this.getcates(),
    },
    methods: {
      // 确认添加商品
      async addGoods() {

        // 以下三个特殊的值
        // 操作goods_cate
        this.form.goods_cat = this.selectedOptions.join(',')
        console.log('商品分类', this.form.goods_cate);
        // 操作pics pics在上传成功和删除时已经操作完成,pics中已经有值(或者无值均可)
        // 操作attrs 没写 有的有,有的没有
        var res = await this.$http.post("goods", this.form);
        console.log(res);
      },
      // 上传图片  在添加商品之前把图片放入临时上传文件夹中即可 在服务器中文件夹存放
      // 删除图片
      handleRemove(file, fileList) {
        console.log("关闭触发:", file);
        // findIndex()可以遍历数组 返回符合条件的索引
        var index = this.form.pics.findIndex(item => {
          return item.pic === file.response.data.tmp_path;
        });
        console.log(index);
        this.form.pics.splice(index, 1);
        console.log(this.form.pics);
      },
      // 预览图片
      handlePreview(file) {
        console.log("预览触发:", file);
      },
      // 上传成功之后将图片保存在pics数组中,没有上传服务器,等待点击确认添加商品之后,统一上传服务器
      handleSuccess(file) {
        console.log("上传成功", file);
        // 上传成功之后将路径push到pics数组中,用于商品添加用
        this.form.pics.push({
          pic: file.data.tmp_path
        });
        console.log("图片数组pics", this.form.pics);
      },
      // tab切换时 切换到1 2 3 4时分别发生了什么
      async tabchange() {
        // 判断如果没有选择三级联动就提示用户去选择
        if (this.selectedOptions.length !== 3) {
          this.$message.warning('请在"产品信息"中选择产品分类');
          return;
        }
        // 切换到第二个--商品参数时  获取参数 渲染页面
        if (this.active === "2") {
          // 发请求
          // 获取参数列表
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=many`
          );
          console.log("动态参数:", res);
          this.arrDTparams = res.data.data;
          // 遍历这个动态参数大数组 每一项是一个对象,每个对象中有attr_vals
          this.arrDTparams.forEach(item => {
            item.attr_vals =
              item.attr_vals.trim().length === 0 ? [] :
              item.attr_vals.trim().split(",");
          });
          console.log("动态参数的一个数组", this.arr_vals);
        } else if (this.active === "3") {
          const res2 = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=only`
          );
          console.log("静态参数的一个数组", res2);
          this.arrJTparams = res2.data.data;
        }
      },

      // 根据ID查询分类
      // async getcates() {
      //   const res = await this.$http.get(`categories/${this.cateList.cat_id}`)
      //   console.log(res);
      // },

      // 获取商品数据列表
      async getCateList() {
        const res = await this.$http.get(`categories?type=3`);
        console.log("分类列表", res);
        this.cateList = res.data.data;
      },
      // 获取商品列表数据
      // async getGoodsList() {
      //   const res = await this.$http.get('goods', {
      //     pagenum: ? ? ? ,
      //     pagesize: ? ? ?
      //   })
      // },
      handleChange(value) {
        console.log(value);
      },
      onEditorBlur(quill) {
        console.log("editor blur!", quill);
      },
      onEditorFocus(quill) {
        console.log("editor focus!", quill);
      },
      onEditorReady(quill) {
        console.log("editor ready!", quill);
      },
      onEditorChange({
        quill,
        html,
        text
      }) {
        console.log("editor change!", quill, html, text);
        this.content = html;
      }
    }
  };

</script>
<style>
  .bread {
    margin-bottom: 20px;
  }

  .ql-editor {
    height: 100px !important;
  }

  el-card {
    height: 100% !important;
  }

</style>
