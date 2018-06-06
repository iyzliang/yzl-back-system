<template>
	<div class="login">
		<div class="dowebok" :class="[{rotateOutUpLeft: flagBoolean.registerShow}, 'animated']" v-if="login">
			<div class="logo"></div>
			<div class="form-item">
				<input class="username" autocomplete="off" type="text" placeholder="账号" v-model="username">
				<p class="tip">请输入正确用户账号</p>
			</div>
			<div class="form-item">
				<input class="password" autocomplete="off" type="password" placeholder="登录密码" v-model="password">
				<p class="tip">账号或密码不正确</p>
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
					<input class="username" autocomplete="off" type="text" placeholder="用户名" v-model="register.username">
				</el-tooltip>
				<p class="tip">用户名</p>
			</div>
			<div class="form-item">
				<el-tooltip class="item" effect="light" content="6-16位字符，可用数字、字母、_" placement="right">
					<input class="password" autocomplete="off" type="password" placeholder="密码" v-model="register.password">
				</el-tooltip>
				<p class="tip">密码</p>
			</div>
			<div class="form-item">
				<el-tooltip class="item" effect="light" content="再次输入密码" placement="right">
					<input class="password" autocomplete="off" type="password" placeholder="再次输入密码" v-model="register.password_again">
				</el-tooltip>
				<p class="tip">再次输入密码</p>
			</div>
			<div class="form-item">
				<input class="proof" autocomplete="off" type="text" style="width:180px" v-model="register.proof_code">
				<img :src="captchaSrc" style="width: 100px;height: 50px;background: #fff;vertical-align: middle;margin-left:30px;" @click="refreshFn">
				<p class="tip">请输入验证码</p>
			</div>
			<div class="form-item">
				<button id="submit" autocomplete="off" :class="[{rubberBand: flagBoolean.loginShow}, 'animated']" @click="registerFn">注 册</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				flagBoolean: {
					loginShow: false,
					registerShow: false,
					backShow: false,
					Show: false
				},
				captchaSrc: 'http://127.0.0.1:3000/captcha',
				username: null,
				password: null,
				login: true,
				register: {
					username: null,
					password: null,
					password_again: null,
					proof_code: null
				}
			};
		},

		methods: {
			loginFn() {
				this.flagBoolean.loginShow = true;
				setTimeout(() => {
					this.flagBoolean.loginShow = false;
				}, 1000);
			},

			toRegister() {
				this.flagBoolean.registerShow = true;
				setTimeout(() => {
					this.flagBoolean.registerShow = false;
					this.login = false;
				}, 1000);
			},

			toBack() {
				this.flagBoolean.backShow = true;
				setTimeout(() => {
					this.flagBoolean.backShow = false;
					this.login = true;
				}, 1000);
			},

			registerFn() {
				this.flagBoolean.registerShow = true;
				setTimeout(() => {
					this.flagBoolean.registerShow = false;
					this.login = false;
				}, 1000);
			},

			checkFn() {
				let data = this.register;
				// if(data.username)
			},

			refreshFn() {
				this.captchaSrc = 'http://127.0.0.1:3000/captcha?d=' + Math.random();
			}
		},
	};

</script>

<style lang="scss" scoped>
	.login {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff url(http://oxnqkx7p0.bkt.clouddn.com/sky-img.jpg) 50% 50% no-repeat;
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
			.proof{
				background: url(../assets/images/proof.png) 23px 11px no-repeat;	
			}
			.tip {
				display: none;
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
