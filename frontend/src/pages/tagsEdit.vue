<template>
  <div class="tags">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>标签管理</span>
      </div>
      <el-tag
      :key="item.tag"
      v-for="item in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(item)">
      {{item.tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增标签</el-button>
   </el-card>

  </div>
</template>

<script>
  import Api from '../api/index.js'
	export default {
		data() {
			return {
				dynamicTags: [],
				inputVisible: false,
				inputValue: ''
			}
    },
    
    created () {
      this.getTags();
    },

		methods: {
      getTags() {
        Api.getTags({}, (data) => {
          if(data.data.status == "ok") {
            this.dynamicTags = data.data.data
          } else {
            this.$message.error(data.data.code);
          }
        })
      },

			handleClose(tag) {
        Api.deleteTag({id: tag._id}, (data) => {
          if(data.data.status == "ok") {
              this.$message.success("删除成功");
              this.getTags();
            } else {
              this.$message.error(data.data.code);
            }
        })
			},

			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},

			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					Api.addTag({'tagname': inputValue}, (data) => {
            if(data.data.status == "ok") {
              this.$message.success("添加成功");
              this.getTags();
            } else {
              this.$message.error(data.data.code);
            }
          })
				}
				this.inputVisible = false;
				this.inputValue = '';
			}
		}
	}

</script>

<style>
	.el-tag+.el-tag {
		margin-left: 10px;
	}

	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}

</style>

<style lang="scss" scoped>
.tags{
  height: 100%;
  background: #fff;
  padding: 30px;
}
</style>
