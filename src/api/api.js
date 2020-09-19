import {
	get,
	post,
	postForm
} from './http'

export const login = (params) => post('/api/BackUser/Login', params) //登录

export const userList = (params) => get('/api/BackUser/GetBackUserList', params) //用户列表
export const userAdd = (params) => post('/api/BackUser/AddBackUser', params) //用户新增
export const userEdit = (params) => post('/api/BackUser/UpdateBackUser', params) //用户修改

export const countryList = (params) => get('/api/Country/GetCountryList', params) //国家列表
export const countryAdd = (params) => post('/api/Country/AddCountry', params) //国家新增
export const countryEdit = (params) => post('/api/Country/UpdateCountry', params) //国家修改

export const typeList = (params) => get('/api/ProductType/GetProductTypeList', params) //商品分类列表
export const typeAdd = (params) => post('/api/ProductType/AddProductType', params) //商品分类新增
export const typeEdit = (params) => post('/api/ProductType/UpdateProductType', params) //商品分类修改

export const contactView = (params) => get('/api/CustomerService/GetCustomerService', params) //联系方式获取
export const contactEdit = (params) => post('/api/CustomerService/UpdateCustomerService', params) //联系方式修改

export const goodsList = (params) => get('/api/ProductManage/GetProductManageList', params) //商品列表
export const goodsAdd = (params) => postForm('/api/ProductManage/Add', params) //商品新增
export const goodsEdit = (params) => postForm('/api/ProductManage/UpdateProductManage', params) //商品修改
export const goodsState = (params) => post('/api/ProductManage/Upanddown', params) //商品上架下架

export const bannerList = (params) => get('/api/Rotation/GetRotationList', params) //轮播图列表
export const bannerAdd = (params) => postForm('/api/Rotation/Add', params) //轮播图新增
export const bannerEdit = (params) => postForm('/api/Rotation/UpdateRotation', params) //轮播图修改
