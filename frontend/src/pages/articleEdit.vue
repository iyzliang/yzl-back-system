<template>
  <div class="articleEdit">
    <div class="articleMain">
      <div class="box-card">
        <el-upload
          class="card-left"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <!-- <div class="card-left" :style="{backgroundImage: 'url('+item.image+')', backgroundSize: 'cover'}"></div> -->
        <div class="card-right">
          <el-form ref="form" :model="item" :inline="true" label-width="80px">
            <el-form-item label="标题" style="margin-right:20px;">
              <el-input  placeholder="请输入标题" v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item label="标签" style="margin-right:20px;">
              <el-select v-model="item.tags" multiple placeholder="标签">
                 <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      item: {
        image: "http://oxnqkx7p0.bkt.clouddn.com/IMG_20170603_095735.jpg",
        title: null,
        tags: [],
        isshow: true,
        description: null
      },
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
    }
  },
}
</script>

<style lang="scss" scoped>
.articleEdit{
  padding: 20px;
  background: #fff;
  .articleMain{
    width: 100%;
    .box-card{
      border-radius: 30px;
      padding: 40px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      width: 100%;
      margin: 0 auto;
      display: flex;
      .card-left{
        width: 400px;
        height: 200px;
        margin-right: 20px;
        padding: 20px;
        background-position: center;
        background-repeat: no-repeat;
      }
      .card-right{
        flex: 1;
        
      }
    }
  }
}
</style>

<style>
</style>
