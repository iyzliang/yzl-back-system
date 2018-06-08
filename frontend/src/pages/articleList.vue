<template>
  <div class="articleList">
    <el-card class="box-card">
      <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
        <el-select v-model="searchType" slot="prepend" placeholder="请选择">
          <el-option label="标题" value="title"></el-option>
          <el-option label="简介" value="description"></el-option>
          <el-option label="标签" value="tags"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" icon="el-icon-tickets" style="float:right;" @click="$router.push('articleEdit')">新建文章</el-button>
    </el-card>

    <el-table
      :data="articleList"
      :max-height="menuHeight"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        align="center">
      </el-table-column>
      <el-table-column
        prop="date"
        label="时间"
        align="center"
        :formatter="formatterDateFn">
      </el-table-column>
      <el-table-column
        prop="description"
        label="简介"
        align="center"
        :formatter="formatterDesFn">
      </el-table-column>
       <el-table-column
        prop="tags"
        label="标签"
        align="center">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.tags"  style="margin: 0 5px;" :key="item">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="numofviews" label="被访问次数" align="center">
        </el-table-column>
        <el-table-column prop="isshow" label="是否隐藏展示" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isshow"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagenext">
        <el-pagination
        class="pagination"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="99">
        </el-pagination>
      </div>

</div>
</template>

<script>
	import moment from 'moment';
	export default {
		data() {
			return {
				articleList: [
          {
						title: "第一篇文章",
						description: "这是第一个关于文章的描述，我也不知道写什么好。些什么好，些什么好，些什么好，些什么好，些什么好，些什么好，些什么好。",
						tags: ['学习', '技术', '生活', '记录'],
						date: 1527737350037,
						numofviews: 12,
						isshow: true
          },{
						title: "第一篇文章",
						description: "这是第一个关于文章的描述，我也不知道写什么好。些什么好，些什么好，些什么好，些什么好，些什么好，些什么好，些什么好。",
						tags: ['学习', '技术', '生活', '记录'],
						date: 1527737350037,
						numofviews: 12,
						isshow: true
          },
          {
						title: "第一篇文章",
						description: "这是第一个关于文章的描述，我也不知道写什么好。些什么好，些什么好，些什么好，些什么好，些什么好，些什么好，些什么好。",
						tags: ['学习', '技术', '生活', '记录'],
						date: 1527737350037,
						numofviews: 12,
						isshow: true
          },{
						title: "第一篇文章",
						description: "这是第一个关于文章的描述，我也不知道写什么好。些什么好，些什么好，些什么好，些什么好，些什么好，些什么好，些什么好。",
						tags: ['学习', '技术', '生活', '记录'],
						date: 1527737350037,
						numofviews: 12,
						isshow: true
          },
          {
						title: "第一篇文章",
						description: "这是第一个关于文章的描述，我也不知道写什么好。些什么好，些什么好，些什么好，些什么好，些什么好，些什么好，些什么好。",
						tags: ['学习', '技术', '生活', '记录'],
						date: 1527737350037,
						numofviews: 12,
						isshow: true
          },{
						title: "第一篇文章",
						description: "这是第一个关于文章的描述，我也不知道写什么好。些什么好，些什么好，些什么好，些什么好，些什么好，些什么好，些什么好。",
						tags: ['学习', '技术', '生活', '记录'],
						date: 1527737350037,
						numofviews: 12,
						isshow: true
          },
          {
						title: "第一篇文章",
						description: "这是第一个关于文章的描述，我也不知道写什么好。些什么好，些什么好，些什么好，些什么好，些什么好，些什么好，些什么好。",
						tags: ['学习', '技术', '生活', '记录'],
						date: 1527737350037,
						numofviews: 12,
						isshow: true
          },{
						title: "第一篇文章",
						description: "这是第一个关于文章的描述，我也不知道写什么好。些什么好，些什么好，些什么好，些什么好，些什么好，些什么好，些什么好。",
						tags: ['学习', '技术', '生活', '记录'],
						date: 1527737350037,
						numofviews: 12,
						isshow: true
          },
          {
						title: "第一篇文章",
						description: "这是第一个关于文章的描述，我也不知道写什么好。些什么好，些什么好，些什么好，些什么好，些什么好，些什么好，些什么好。",
						tags: ['学习', '技术', '生活', '记录'],
						date: 1527737350037,
						numofviews: 12,
						isshow: true
          },{
						title: "第一篇文章",
						description: "这是第一个关于文章的描述，我也不知道写什么好。些什么好，些什么好，些什么好，些什么好，些什么好，些什么好，些什么好。",
						tags: ['学习', '技术', '生活', '记录'],
						date: 1527737350037,
						numofviews: 12,
						isshow: true
          }
        ],
				searchValue: '',
        searchType: 'title',
        menuHeight: null,
        currentPage: 1
			}
    },
    
    created () {
      this.menuHeight = $('.articleList').height() - 40 - 110 - 50;
    },

		methods: {
			formatterDateFn(row, column, cellValue, index) {
				return moment(row.date)
					.format('YYYY-MM-DD HH:mm:ss')
			},

			formatterDesFn(row, column) {
				if (row.description.length > 10) {
					return row.description.substring(0, 10) + '...';
				} else {
					return row.description;
				}
			},

			handleClick(row) {
				console.log(row);
      },
      
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
		}
	}

</script>

<style lang="scss" scoped>
	.articleList {
		padding: 20px;
		background: #fff;
		.box-card {
      margin-bottom: 10px;
			width: 100%;
			height: 100px;
			padding: 10px;
		}
    .pagenext{
      width: 100%;
      height: 50px;
      padding-top: 20px;
      .pagination{
        float: right;
      }
    }
	}
</style>
<style>
.articleList .input-with-select{
  width: 70%;
}
.articleList .el-select .el-input {
    width: 130px;
  }
  .articleList .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>

