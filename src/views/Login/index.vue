<template>
	<div class="login">
		<div class="rightCon">
			<div class="rightlogo"></div>
			<div class="info">欢迎登录深i网</div>
			<div class="loginMess">
				<el-form :model="loginInfo" :rules="rules" ref="loginInfo">
					<el-form-item class="username" prop="account">
						<el-input placeholder="请输入用户名" v-model="loginInfo.account" @blur="getImg"><i slot="prefix" class="user"></i></el-input>
					</el-form-item>
					<el-form-item class="password" prop="password" :error="ZhOrMmError">
						<el-input placeholder="请输入密码" :type="isSee ? 'text' : 'password'" v-model="loginInfo.password">
							<i slot="prefix" class="pass"></i>
							<i slot="suffix" class="mm" :class="isSee ? 'active' : ''" @click="isSee = !isSee"></i>
						</el-input>
					</el-form-item>
					<el-form-item class="yzm" prop="verifyCode" :error="YZMError">
						<div class="yzmBox">
							<el-input placeholder="请输入验证码" v-model="loginInfo.verifyCode"><i slot="prefix" class="dun"></i></el-input>
							<img class="img" v-show="src" @click="getImg" :src="src" alt="" />
						</div>
					</el-form-item>
					<div class="dl" @click="login('loginInfo')">登录</div>
				</el-form>
			</div>
			<!-- <div class="jzmm"><el-checkbox v-model="checked">记住密码</el-checkbox></div> -->
			<!-- <div class="loginfootter"></div> -->
		</div>
	</div>
</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			loginInfo: {
				account: '',
				password: '',
				verifyCode: ''
			},
			rules: {
				account: [{ required: true, message: '用户名不能为空！', trigger: 'blur' }],
				password: [{ required: true, message: '密码不能为空！', trigger: 'blur' }],
				verifyCode: [{ required: true, message: '验证码不能为空！', trigger: 'blur' }]
			},
			checked: false,
			isSee: false,
			src: '',
			isZhOrMmError: false,
			isYZMError: false,
			ZhOrMmError: '',
			YZMError: ''
		};
	},
	mounted() {
		let token = sessionStorage.getItem('userInfo');
	},
	methods: {
		getImg() {},
		login(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					var data = {
						account: this.loginInfo.account,
						password: this.$md5(this.loginInfo.password),
						verifyCode: this.loginInfo.verifyCode
					};
					sessionStorage.setItem('userInfo', JSON.stringify(res.data));
				} else {
					return false;
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.login {
	position: relative;
	z-index: 2;
	width: 100%;
	height: 100%;
	background: url(img/bg.png) no-repeat;
	background-size: 100% 100%;
	.leftlogo {
		position: absolute;
		left: 70px;
		top: 23px;
		width: 205px;
		height: 55px;
		background: url(img/产品名@2x.png) no-repeat;
		background-size: 100% 100%;
	}
	.loginfootter {
		width: 272px;
		height: 44px;
		background: url(img/底部标题@2x.png) no-repeat;
		background-size: 100% 100%;
		margin: 294px auto 0;
	}
	.rightCon {
		position: absolute;
		right: 120px;
		top: 150px;
		width: 428px;
		.flex(column);
		.rightlogo {
			width: 107px;
			height: 84px;
			background: url(img/产品logo@2x.png) no-repeat;
			background-size: 100% 100%;
			margin-bottom: 24px;
		}
		.info {
			font-size: 28px;
			color: rgba(255, 255, 255, 0.76);
			margin-bottom: 123px;
		}
		.loginMess {
			.username,
			.password,
			.dl,
			.yzm {
				height: 50px;
				position: relative;
			}
			.tooltip {
				position: absolute;
				left: 0;
				top: 52px;
				font-size: 14px;
				color: rgba(255, 77, 77, 0.98);
			}
			.password {
				margin-top: 36px;
			}
			.yzm {
				margin-top: 36px;

				.img {
					.flex();
					justify-content: center;
					align-items: center;
					cursor: pointer;
					width: 132px;
					height: 50px;
					margin-left: 26px;
				}
				.yzmBox {
					.flex();
					justify-content: space-between;
					align-items: center;
				}
			}
			.jzmm {
				margin-top: 12px;
				height: 20px;
				.flex();
			}
			.dl {
				.flex();
				justify-content: center;
				align-items: center;
				margin-top: 36px;
				background: #3480fd;
				border-radius: 2px;
				font-size: 14px;
				color: #fff;
				cursor: pointer;
			}
			/deep/ .el-input {
				display: block;

				border-radius: 2px;
				border: 1px solid #424a4e;
				.el-input__prefix,
				.el-input__suffix {
					.flex();
					align-items: center;
					margin: 0 12px 0 12px;
				}
				&:focus {
					border: 1px solid #fff;
				}
				input.el-input__inner {
					background: transparent;
					height: 50px;
					line-height: 50px;
					border: none;
					font-size: 14px;
					color: rgba(255, 255, 255, 0.76);
					padding-left: 55px;
					padding-right: 55px;
					//webkit内核的浏览器
					&::-webkit-input-placeholder {
						color: #313639;
					}
					//Firefox版本4-18
					&:-moz-placeholder {
						color: #313639;
					}
					//Firefox版本19+
					&::-moz-placeholder {
						color: #313639;
					}
					//IE浏览器
					&:-ms-input-placeholder {
						color: #313639;
					}
				}
			}
			/deep/ .el-checkbox__inner {
				width: 13px;
				height: 13px;
				border-radius: 2px;
				color: rgba(255, 255, 255, 0.76);
				border: 1px solid #3a3a3e;
				background: transparent;
			}
			/deep/ .el-checkbox__input.is-checked .el-checkbox__inner::after {
				border: 1px solid #409eff;
				border-left: 0;
				border-top: 0;
			}
		}
		.user {
			display: block;
			width: 26px;
			height: 26px;
			background: url(img/icon／用户名@2x.png) no-repeat;
			background-size: 100% 100%;
		}
		.pass {
			display: block;
			width: 20px;
			height: 22px;
			background: url(img/AK-IM_密码_fill@2x.png) no-repeat;
			background-size: 100% 100%;
		}
		.mm {
			cursor: pointer;
			display: block;
			width: 24px;
			height: 24px;
			background: url(img/icon／密码不可见@2x.png) no-repeat;
			background-size: 100% 100%;
			&.active {
				background: url(img/icon／密码可见@2x.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.dun {
			display: block;
			width: 20px;
			height: 22px;
			background: url(img/验证码@2x.png) no-repeat;
			background-size: 100% 100%;
		}
	}
}
/deep/ .el-form-item__error {
	padding-top: 10px;
}
</style>
