<template>
  <div class="articleEdit">
    <div class="articleMain">
      <div class="box-card">
        <el-upload
          v-if="!item.image"
          class="card-left"
          drag
          action="/api/upload"
          :headers = "headerObj"
          :before-upload = "beforeUploadFn"
          :on-success="imgSuccessFn"
          :on-error="imgErrorFn">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>文件不大于1M</div>
        </el-upload>
        <div class="card-left" :style="{backgroundImage: 'url('+item.image+')', backgroundSize: 'cover'}" v-if="item.image"></div>
        <div class="card-right">
          <el-form ref="form" :model="item" :inline="true" label-width="80px">
            <el-form-item label="标题" style="margin-right:20px;">
              <el-input  placeholder="请输入标题" v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item label="标签" style="margin-right:20px;">
              <el-select v-model="item.tags" multiple placeholder="标签">
                 <el-option
                  v-for="item in options"
                  :key="item._id"
                  :label="item.tag"
                  :value="item.tag">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否可见">
              <el-switch v-model="item.isshow"></el-switch>
            </el-form-item>
          </el-form>
          <el-form ref="form" :model="item" label-width="80px" style="margin-top:30px;">
            <el-form-item label="简介" class="textarea">
              <el-input type="textarea" v-model="item.description"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="markdownBox">
        <mavon-editor class="markdown" :ishljs = "true" ref="md" @imgAdd="$imgAdd" :toolbars="toolbars" v-model="item.article"/>
      </div>
      <div class="operation">
        <el-button type="danger" plain @click="$router.go(-1)">取消</el-button>
        <el-button type="success" plain @click="saveFn" :loading="loadingSave">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from "../api/index.js";
	export default {
		data() {
			return {
        id: null,
				item: {
					image: "",
					title: null,
					tags: [],
					isshow: true,
          description: null,
          article: ''
        },
        loadingSave: false,
				options: [],
				toolbars: {
					bold: true, // 粗体
					italic: true, // 斜体
					header: true, // 标题
					underline: true, // 下划线
					strikethrough: true, // 中划线
					mark: true, // 标记
					superscript: true, // 上角标
					subscript: true, // 下角标
					quote: true, // 引用
					ol: true, // 有序列表
					ul: true, // 无序列表
					link: true, // 链接
					imagelink: true, // 图片链接
					code: true, // code
					table: true, // 表格
					fullscreen: true, // 全屏编辑
					readmodel: true, // 沉浸式阅读
					htmlcode: true, // 展示html源码
					help: true, // 帮助
					/* 1.3.5 */
					undo: true, // 上一步
					redo: true, // 下一步
					trash: true, // 清空
					/* 1.4.2 */
					navigation: true, // 导航目录
					/* 2.1.8 */
					alignleft: true, // 左对齐
					aligncenter: true, // 居中
					alignright: true, // 右对齐
					/* 2.2.1 */
					subfield: true, // 单双栏模式
					preview: true, // 预览
        },
        headerObj: {"Authorization": "Bearer " + localStorage.getItem('blog_token')}
			}
    },
    
    created () {
      if(this.$route.query.id) {
        this.id = this.$route.query.id;
        Api.getArticle({id: this.$route.query.id}, (data) => {
          var item = data.data.data;
          this.item = {
            image: item.image,
            title: item.title,
            tags: item.tags,
            isshow: item.isshow,
            description: item.description,
            article: item.article
          }
        })
      }
      Api.getTags({},(data) => {
        this.options = data.data.data;
      })
    },

		methods: {
      beforeUploadFn (file) {
        var typelist= ['image/gif','image/jpeg','image/jpg','image/png'];
        if(typelist.indexOf(file.type) >= 0) {
          if (file.size > 1100000) {
            this.$message.error("文件过大");
            return false;
          }
        } else {
          this.$message.error("上传格式不正确");
          return false;
        }
      },
      
			imgSuccessFn(response, file, fileList) {
				if (response.status == "ok") {
          this.item.image = response.url;
        }
      },
      
      imgErrorFn (e) {
        if(e.code == "token错误" || e.code == "token过期") {
          this.$router.push('/login');
        }
      },

			$imgAdd(pos, $file) {
				// 第一步.将图片上传到服务器.
				var formdata = new FormData();
        formdata.append('file', $file);
        Api.uploadimg(formdata,(data) => {
          this.$refs.md.$img2Url(pos, data.data.url);
        })
      },
      
      saveFn () {
        this.loadingSave = true;
        var data = this.item;
        data.date = (new Date).getTime();
        if(this.id){
          data.id = this.id;
        }
        Api.addArticle(data, (data) => {
          this.loadingSave = false;
          if(data.data.status == "ok") {
            this.$message.success('保存成功');
          } else {
             this.$message.error(data.data.code);
          }
        })
      }
		}
	}

</script>

<style lang="scss" scoped>
	.articleEdit {
		padding: 20px;
		background: #fff;
		.articleMain {
			width: 100%;
			.box-card {
				border-radius: 30px;
				padding: 40px;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
				width: 100%;
				margin: 0 auto;
				display: flex;
				.card-left {
					width: 400px;
					height: 200px;
					margin-right: 20px;
					padding: 20px;
					background-position: center;
					background-repeat: no-repeat;
				}
				.card-right {
					flex: 1;
				}
			}
			.markdownBox {
				padding-top: 30px;
				width: 100%;
				height: 100%;
        .markdown{
          min-height: 400px;
        }
			}
      .operation{
        height: 100px;
        line-height: 100px;
        text-align: right;
        padding-right: 30px;
      }
		}
	}

</style>

<style>


</style>
