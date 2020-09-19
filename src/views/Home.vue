<template>
	<div>
		<el-row class="home-container">
			<el-col :span="24" class="header">
				<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
					<span @click="$router.push('/index')" style="cursor: pointer;"><i class="el-icon-s-opportunity"></i>
						{{collapsed?'':sysName}}</span>
				</el-col>
				<el-col :span="10">
					<div class="tools" @click.prevent="collapse">
						<i :class="collapsed?'el-icon-tickets':'el-icon-notebook-2'"></i>
					</div>
				</el-col>
				<el-col :span="4" class="userinfo">
					<el-dropdown trigger="hover">
						<span class="el-dropdown-link userinfo-inner">
							<span class="icon"><i class="el-icon-user-solid"></i></span>
							<span class="username">{{sysUserName}}</span>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-col>
			<el-col :span="24" class="main">
				<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
					<!--导航菜单-未折叠-->
					<el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router v-show="!collapsed">
						<template v-for="(item,index) in routes">
							<el-submenu :index="index+''" :key="item.name" v-if="!item.leaf">
								<!--遍历的其中一个菜单项,设置有单节点的。-->
								<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
								<el-menu-item v-for="child in routeChildren(item)" :index="child.path" :key="child.path">
									{{child.name}}
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-if="item.leaf&&item.children.length>0" :key="item.name" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}
							</el-menu-item>
						</template>
					</el-menu>
					<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
						<li v-for="(item,index) in routes" :key="item.name" class="el-submenu item">
							<!--非单节点route渲染-->
							<template v-if="!item.leaf">
								<!--经过菜单显示对应ul的事件-->
								<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i
									 :class="item.iconCls"></i></div>
								<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
									<li v-for="child in item.children" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path===child.path?'is-active':''"
									 @click="$router.push(child.path)">{{child.name}}
									</li>
								</ul>
							</template>
							<template v-else>
						<li class="el-submenu">
							<div class="el-submenu__title el-menu-item" style="height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path===item.children[0].path?'is-active':''"
							 @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i>
							</div>
						</li>
</template>
</li>
</ul>
</aside>

<section class="content-container">
	<div class="grid-content bg-purple-light">
		<el-col :span="24" class="breadcrumb-container">
			<strong class="title">{{$route.name}}</strong>
			<el-breadcrumb separator="/" class="breadcrumb-inner">
				<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
					{{ item.name }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<el-col :span="24" class="content-wrapper">
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</el-col>
	</div>
</section>
</el-col>
</el-row>

</div>
</template>

<script>
	export default {
		name: 'Home',
		data() {
			return {
				sysName: 'SimpleShop',
				collapsed: false,
				sysUserName: '',
			}
		},
		computed: {
			// 关于v-for v-if，data里未定义的变量遍历使用计算属性。否则使用v-for v-if配合使用
			routes: function() {
				return this.$router.options.routes.filter(function(item) {
					return !item.hidden
				})
			},
			// 利用闭包实现计算属性传参。
			routeChildren: function(route) {
				return function(route) {
					return route.children.filter(function(child) {
						return !child.hidden
					})
				}
			}
		},
		methods: {
			// 退出登录
			logout: function() {
				let _this = this
				_this.$confirm('确认退出吗?', '提示', {
					type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user')
					_this.$router.push('/login')
				}).catch(() => {})
			},

			// 折叠导航栏
			collapse: function() {
				this.collapsed = !this.collapsed
			},
			showMenu(i, status) {
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
			}
		},

		mounted() {
			let userName = sessionStorage.getItem('userName')
			if (userName) {
				this.sysUserName = userName || ''
			}
		}
	}
</script>
