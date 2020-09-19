<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="searchForm">
				<el-form-item label="姓名">
					<el-input size="small" v-model="searchForm.name" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button size="small" @click="searchData">查询</el-button>
					<el-button size="small" @click="resetSearch">重置</el-button>
					<el-button size="small" type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table border :data="tableData" @selection-change="selsChange" v-loading="listLoading" style="width: 100%" id="tableData"
		 ref='tableData'>
			<el-table-column type="index" label="#" align="center"></el-table-column>
			<el-table-column prop="Name" label="姓名" align="center"></el-table-column>
			<el-table-column prop="LoginName" label="账号" align="center"></el-table-column>
			<el-table-column prop="Phone" label="手机" align="center"></el-table-column>
			<el-table-column prop="State" label="状态" align="center">
				<template v-slot="scope">
					<span class="success" v-if="scope.row.State===1">正常</span>
					<span class="danger" v-if="scope.row.State===0">禁用</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="100">
				<template v-slot="scope">
					<el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination style="float: right;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
			 :total="total">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog :title="title" :visible.sync="editModal" :close-on-click-modal="false" :before-close="closeModal" width="30%">
			<el-form :model="editForm" label-width="80px" :rules="rules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="账号" prop="account">
					<el-input :disabled="doType==='edit'" v-model="editForm.account"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="editForm.password"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="phone">
					<el-input v-model="editForm.phone"></el-input>
				</el-form-item>
				<el-form-item v-if="doType==='edit'" label="状态" prop="state">
					<el-radio-group v-model="editForm.state">
						<el-radio :label="1">正常</el-radio>
						<el-radio :label="0">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeModal">取消</el-button>
				<el-button type="primary" v-if="doType==='add'" @click="addSubmit" :loading="btnLoading">提交</el-button>
				<el-button type="primary" v-if="doType==='edit'" @click="editSubmit" :loading="btnLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import {
		userList,
		userAdd,
		userEdit,
	} from '@/api/api'

	export default {
		name: 'user',
		data() {
			return {
				title: '',
				pageIndex: 1,
				pageSize: 10,
				total: 0,
				doType: '',
				editModal: false,
				listLoading: false,
				btnLoading: false,
				drawer: false,
				tableData: [],
				selsData: [],
				selectId: '',
				searchForm: {
					name: ''
				},
				editForm: {
					name: '',
					account: '',
					password: '',
					phone: '',
					state: 1
				},
				rules: {
					name: {
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					},
					account: {
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					},
					password: {
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					},
					phone: {
						pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
						message: '请输入正确的11位手机号',
						trigger: 'blur'
					}
				}
			}
		},
		created() {
			this.getData()
		},
		methods: {
			// 获取列表数据
			getData() {
				let _this = this
				_this.listLoading = true
				let params = {
					Name: _this.searchForm.name,
					pageIndex: _this.pageIndex,
					pageSize: _this.pageSize
				}
				userList(params).then(res => {
					_this.listLoading = false
					_this.tableData = res.Entity
					_this.total = Number(res.TotalCount)
				}).catch((e) => {})
			},

			//查询
			searchData() {
				let _this = this
				_this.pageIndex = 1
				_this.getData()
			},

			//重置
			resetSearch() {
				let _this = this
				_this.pageIndex = 1
				_this.searchForm = {
						name: ''
					},
					_this.getData()
			},

			// 显示新增框
			handleAdd() {
				let _this = this
				_this.title = '新增用户'
				_this.doType = 'add'
				_this.editModal = true
			},

			// 显示编辑框
			handleEdit(index, row) {
				let _this = this
				_this.title = '编辑用户'
				_this.doType = 'edit'
				_this.selectId = row.Id
				_this.editModal = true
				_this.editForm.name = row.Name
				_this.editForm.account = row.LoginName
				_this.editForm.password = row.Password
				_this.editForm.phone = row.Phone
				_this.editForm.state = row.State
			},

			//新增提交
			addSubmit() {
				let _this = this
				_this.$refs.editForm.validate((valid) => {
					if (valid) {
						_this.btnLoading = true
						let params = {
							Name: _this.editForm.name,
							LoginName: _this.editForm.account,
							Password: _this.editForm.password,
							Phone: _this.editForm.phone
						}
						userAdd(params).then(res => {
							_this.btnLoading = false
							_this.closeModal()
							_this.getData()
						}).catch((e) => {
							_this.btnLoading = false
						})
					}
				})
			},

			//编辑提交
			editSubmit() {
				let _this = this
				_this.$refs.editForm.validate((valid) => {
					if (valid) {
						_this.btnLoading = true
						let params = {
							Id: _this.selectId,
							Name: _this.editForm.name,
							Phone: _this.editForm.phone,
							Password: _this.editForm.password,
							State: _this.editForm.state
						}
						userEdit(params).then(res => {
							_this.btnLoading = false
							_this.closeModal()
							_this.getData()
						}).catch((e) => {
							_this.btnLoading = false
						})
					}
				})
			},

			//关闭新增编辑弹窗
			closeModal() {
				let _this = this
				_this.editModal = false
				_this.btnLoading = false
				_this.$refs['editForm'].resetFields()
				_this.editForm = {
					name: '',
					account: '',
					password: '',
					phone: ''
				}
			},

			//选中数据
			selsChange(selsData) {
				this.selsData = selsData
			},

			//翻页
			handleSizeChange(val) {
				let _this = this
				_this.pageSize = val
				_this.getData()
			},
			//跳转
			handleCurrentChange(val) {
				let _this = this
				_this.pageIndex = val
				_this.getData()
			}

		}
	}
</script>
