<template>
	<section class="mt10">
		<!--编辑界面-->
		<el-form :model="editForm" ref="editForm">
			<el-form-item>
				<quill-editor v-model="editForm.contact" ref="myQuillEditor" class="editor-box" :options="editorOption"></quill-editor>
			</el-form-item>
		</el-form>
		<div class="txt-c" style="margin-top: 50px;">
			<el-button type="primary" @click="editSubmit" :loading="btnLoading">提交</el-button>
		</div>
	</section>
</template>

<script>
	import {
		contactView,
		contactEdit
	} from '@/api/api'

	import {
		quillEditor
	} from 'vue-quill-editor'
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'

	export default {
		name: 'contact',
		components: {
			quillEditor
		},
		data() {
			return {
				title: '',
				btnLoading: false,
				editForm: {
					id: '',
					contact: ''
				},
				editorOption: {
					placeholder: '',
					theme: 'snow',
				}
			}
		},
		created() {
			this.getData()
		},
		methods: {
			// 获取初始数据
			getData() {
				let _this = this
				let params = {}
				contactView(params).then(res => {
					_this.editForm.id = res.Entity[0].Id
					_this.editForm.contact = res.Entity[0].Contact
				}).catch((e) => {})
			},

			//编辑提交
			editSubmit() {
				let _this = this
				_this.$refs.editForm.validate((valid) => {
					if (valid) {
						_this.btnLoading = true
						let params = {
							Id: _this.editForm.id,
							Contact: _this.editForm.contact,
						}
						contactEdit(params).then(res => {
							_this.btnLoading = false
							_this.getData()
						}).catch((e) => {
							_this.btnLoading = false
						})
					}
				})
			}

		}
	}
</script>
