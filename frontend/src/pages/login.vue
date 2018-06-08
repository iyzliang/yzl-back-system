<template>
	<div class="login">
		<div class="dowebok" :class="[{rotateOutUpLeft: flagBoolean.registerShow}, 'animated']" v-if="login">
			<div class="logo"></div>
			<div class="form-item">
				<input class="username" autocomplete="off" type="text" placeholder="账号" v-model="username" @focus="errusername = null">
				<p class="tip" v-if="errusername">{{errusername}}</p>
			</div>
			<div class="form-item">
				<input class="password" autocomplete="off" type="password" placeholder="登录密码" v-model="password" @focus="errpassword = null">
				<p class="tip" v-if="errpassword">{{errpassword}}</p>
			</div>
			<div class="form-item">
				<button id="submit" :class="[{rubberBand: flagBoolean.loginShow}, 'animated']" @click="loginFn">登 录</button>
			</div>
			<div class="reg-bar">
				<a class="reg" @click="toRegister" style="cursor: pointer;">立即注册</a>
			</div>
		</div>
		<div class="logout dowebok" v-if="!login" :class="[{rotateOutUpRight: flagBoolean.backShow}, 'animated']">
			<i class="el-icon-arrow-left back" @click="toBack"></i>
			<div class="register"></div>
			<div class="form-item">
				<el-tooltip class="item" effect="light" content="6-16位字符，可用数字、字母、_" placement="right">
					<input class="username" autocomplete="off" type="text" placeholder="用户名" v-model="register.username" @focus="errorCode.username = null">
				</el-tooltip>
				<p class="tip" v-show="errorCode.username">{{errorCode.username}}</p>
			</div>
			<div class="form-item">
				<el-tooltip class="item" effect="light" content="6-16位字符，可用数字、字母、_" placement="right">
					<input class="password" autocomplete="off" type="password" placeholder="密码" v-model="register.password"  @focus="errorCode.password = null">
				</el-tooltip>
				<p class="tip" v-show="errorCode.password">{{errorCode.password}}</p>
			</div>
			<div class="form-item">
				<el-tooltip class="item" effect="light" content="再次输入密码" placement="right">
					<input class="password" autocomplete="off" type="password" placeholder="再次输入密码" v-model="register.password_again"  @focus="errorCode.password_again = null">
				</el-tooltip>
				<p class="tip" v-show="errorCode.password_again">{{errorCode.password_again}}</p>
			</div>
			<div class="form-item">
				<input class="proof" autocomplete="off" type="text" style="width:180px" v-model="register.proof_code"  @focus="errorCode.proof_code = null">
				<img :src="captchaSrc" style="width: 100px;height: 50px;background: #fff;vertical-align: middle;margin-left:30px;" @click="refreshFn">
				<p class="tip" v-show="errorCode.proof_code">{{errorCode.proof_code}}</p>
			</div>
			<div class="form-item">
				<button id="submit" autocomplete="off" :class="[{rubberBand: flagBoolean.registerShow}, 'animated']" @click="registerFn">注 册</button>
			</div>
		</div>
	</div>
</template>

<script>
import Api from "../api/index.js";
export default {
  data() {
    return {
      flagBoolean: {
        loginShow: false,
        registerShow: false,
        backShow: false,
        Show: false
      },
      captchaSrc: "/api/captcha",
			username: null,
			errusername: null,
			password: null,
			errpassword: null,
      login: true,
      register: {
        username: null,
        password: null,
        password_again: null,
        proof_code: null
      },
      errorCode: {
				username: null,
				password: null,
				password_again: null,
				proof_code: null
      }
    };
  },

  methods: {
		// 登录
    loginFn() {
      this.flagBoolean.loginShow = true;
      setTimeout(() => {
        this.flagBoolean.loginShow = false;
			}, 1000);
			
			let check = this.loginCheck()
			if(check){
				Api.login({username: this.username, password: this.password}, (data) => {
					if(data.data.status == "ok") {
            localStorage.setItem('blog_user',data.data.username);
            this.$router.push('/blogList');
					} else {
						this.$message.error(data.data.code);
					}
				}, (e) => {
					console.log(e);
				})
			}
			
		},
		
		loginCheck() {
			let flag = true;
			if(this.username) {
				if(this.username.length < 6 || this.username.length > 16) {
					this.errusername = "账号不正确";
					flag = false;
				}
			} else {
				this.errusername = "请输入账号";
				flag = false;
			}

			if(this.password) {
				if(this.password.length < 6 || this.password.length > 16) {
					this.errpassword = "密码不正确";
					flag = false;
				}
			} else {
				this.errpassword = "请输入密码";
				flag = false;
			}

			return flag
		},

		// 去注册
    toRegister() {
      this.flagBoolean.registerShow = true;
      setTimeout(() => {
        this.flagBoolean.registerShow = false;
        this.login = false;
      }, 1000);
    },

		// 返回
    toBack() {
      this.flagBoolean.backShow = true;
      setTimeout(() => {
        this.flagBoolean.backShow = false;
        this.login = true;
      }, 1000);
    },

		// 注册
    registerFn() {
      this.flagBoolean.registerShow = true;
      setTimeout(() => {
        this.flagBoolean.registerShow = false;
        this.login = false;
      }, 1000);

			var check = this.checkFn();
			if(check) {
				Api.register({"username": this.register.username, "password": this.register.password, "proof": this.register.proof_code}, (data) => {
					var result = data.data;
					if(result.status == "ok") {
						console.log('ok');
					} else {
						this.refreshFn();
						this.$message.error(result.code);
					}
				}, (e) => {
					console.log(e);
				});
			} else {
				this.refreshFn();
			}
    },

		// 校验
    checkFn() {
			let data = this.register;
			let flag = true;	
      if (data.username) {
				if(!/^[a-z0-9_]{6,16}$/.test(data.username)){
					this.errorCode.username = "用户名不合法";
					flag = false;
				}
      } else {
				this.errorCode.username = "请输入用户名";
				flag = false;
      }

      if (data.password) {
				if(!/^[a-z0-9_]{6,16}$/.test(data.password)){
					this.errorCode.password = "密码名不合法";
					flag = false;
				}
      } else {
				this.errorCode.password = "请输入密码";
				flag = false;
			}
			
			if (data.password_again) {
				if(data.password_again != data.password){
					this.errorCode.password_again = "两次输入密码不相同";
					flag = false;
				}
      } else {
				this.errorCode.password_again = "请再次输入密码";
				flag = false;
			}

			if(!data.proof_code) {
				this.refreshFn();	
				this.errorCode.proof_code = "请输入验证码";
				flag = false;
			}
			console.log('===>', flag);
			return flag;
    },

		// 刷新验证码
    refreshFn() {
      this.captchaSrc = "/api/captcha?d=" + Math.random();
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5)
    url(http://oxnqkx7p0.bkt.clouddn.com/sky-img.jpg) 50% 50% no-repeat;
  background-size: cover;
  .dowebok {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 430px;
    height: 550px;
    margin: -300px 0 0 -215px;
    border: 1px solid #fff;
    border-radius: 20px;
    overflow: hidden;
    .logo {
      width: 104px;
      height: 104px;
      margin: 50px auto 80px;
      background: url(../assets/images/login.png) 0 0 no-repeat;
    }
    .register {
      width: 104px;
      height: 104px;
      margin: 20px auto 20px;
      background: url(../assets/images/register.png) 0 0 no-repeat;
    }
    .form-item {
      position: relative;
      width: 360px;
      margin: 0 auto;
      padding-bottom: 30px;
    }
    .form-item input {
      width: 360px;
      height: 50px;
      padding-left: 70px;
      border: 1px solid #fff;
      border-radius: 25px;
      font-size: 18px;
      color: #fff;
      background-color: transparent;
      outline: none;
    }
    .form-item button {
      width: 360px;
      height: 50px;
      border: 0;
      border-radius: 25px;
      font-size: 18px;
      color: #1f6f4a;
      outline: none;
      cursor: pointer;
      background-color: #fff;
    }
    .username {
      background: url(../assets/images/zhanghao.png) 20px 12px no-repeat;
      background-size: 23px 23px;
    }
    .password {
      background: url(../assets/images/password.png) 23px 11px no-repeat;
    }
    .proof {
      background: url(../assets/images/proof.png) 23px 11px no-repeat;
    }
    .tip {
      position: absolute;
      left: 20px;
      top: 52px;
      font-size: 14px;
      color: #f50;
    }
    .reg-bar {
      width: 360px;
      margin: 20px auto 0;
      font-size: 14px;
      overflow: hidden;
    }
    .reg-bar a {
      color: #fff;
      text-decoration: none;
    }
    .reg-bar a:hover {
      text-decoration: underline;
    }
    .reg-bar .reg {
      float: left;
    }
    .reg-bar .forget {
      float: right;
    }
    .dowebok input-placeholder {
      font-size: 18px;
      line-height: 1.4;
      color: #fff;
    }
  }
  .logout {
    position: relative;
    .back {
      cursor: pointer;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      position: absolute;
      font-size: 30px;
      color: #fff;
      left: 10px;
      top: 10px;
      &:hover {
        color: #f50;
      }
    }
  }
}
</style>
