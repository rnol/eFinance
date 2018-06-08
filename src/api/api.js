import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getTransactionList = params => { return axios.get(`${base}/Transaction/list`, { params: params }); };

export const getTransactionListPage = params => { return axios.get(`${base}/Transaction/listpage`, { params: params }); };

export const editTransaction = params => { return axios.get(`${base}/Transaction/edit`, { params: params }); };

export const addTransaction = params => { return axios.get(`${base}/Transaction/add`, { params: params }); };

export const removeTransaction = params => { return axios.get(`${base}/Transaction/remove`, { params: params }); };

export const batchRemoveTransaction = params => { return axios.get(`${base}/Transaction/batchremove`, { params: params }); };