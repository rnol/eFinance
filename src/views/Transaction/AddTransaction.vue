<template>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					
                    <el-select placeholder="Please select an account">
				        <el-option label="PricewaterhouseCoopers Consultants Shenzhen Ltd" value="shanghai"></el-option>
				        <el-option label="PwC" value="beijing"></el-option>
			        </el-select>
                    <el-select placeholder="Select a transaction type">
				        <el-option label="RECIn Bank" value="shanghai"></el-option>
				        <el-option label="Cash Out" value="beijing"></el-option>
			        </el-select>
				</el-form-item>
                
                <el-form-item>					
                    <el-select placeholder="Status">
				        <el-option label="Add" value="Add"></el-option>
				        <el-option label="Post" value="Post"></el-option>
			        </el-select>
				</el-form-item>
                
                <el-form-item>					
                    
                    <el-select placeholder="Transaction Year">
				        <el-option label="2018" value="2018"></el-option>
				        <el-option label="2017" value="2017"></el-option>
                        <el-option label="All" value="0"></el-option>
			        </el-select>
				</el-form-item>

                <el-form-item>					
                    <el-input placeholder="Transaction Description"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" v-on:click="getTransactions">Search</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">Add new</el-button>
				</el-form-item>
                <el-form-item>
					<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">Delete</el-button>
				</el-form-item>
                <el-form-item>
					<el-button type="primary" @click="batchRemove" :disabled="this.sels.length===0">Post</el-button>
				</el-form-item>               
            
			</el-form>
		</el-col>

		<el-table :data="transactions" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>			
			<el-table-column prop="Date" label="Transaction Date" width="180" sortable>
			</el-table-column>
			<el-table-column prop="ID" label="Transaction ID" width="180"  sortable>
			</el-table-column>				
            <el-table-column prop="Desc" label="Transaction Description" min-width="280" sortable>
			</el-table-column>
            <el-table-column prop="Amount" label="Transaction Amount" width="200" sortable align="right">
			</el-table-column>
            <el-table-column prop="Status" label="Status" width="100" formatStatus>
			</el-table-column>
			<el-table-column label="Action" width="150" >
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)"> Edit </el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> View </el-button>
					<!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">Delete</el-button>-->
                    <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">Post</el-button>-->
                    
				</template>
			</el-table-column>
		</el-table>

		<el-col :span="24" class="toolbar">
			
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--Edit View-->
		<el-dialog title="Edit" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
				<el-form-item label="Transaction ID" prop="ID">
					<el-input placeholder="Transaction ID" v-model="editForm.ID"></el-input> 
				</el-form-item>
				<el-form-item label="Transaction Description" prop="Desc">
                    <el-input placeholder="Transaction Description" v-model="editForm.Desc"></el-input>					
				</el-form-item>
                <el-form-item label="Transaction Date">
					<el-date-picker type="date" placeholder="Select Date" v-model="editForm.Date"></el-date-picker>
				</el-form-item>
				<el-form-item label="Ref number">
					<el-input placeholder="Ref number" v-model="editForm.RefNumber"></el-input>	
				</el-form-item>	
                <el-form-item label="Transaction Amount">
					<el-input placeholder="Transaction amount" v-model="editForm.Amount"></el-input>	
				</el-form-item>				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">Cancel</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">Submit</el-button>
			</div>
		</el-dialog>

	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getTransactionListPage, removeTransaction, batchRemoveTransaction, editTransaction, addTransaction } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					Desc: ''
				},
				transactions: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					Desc: [
						{ required: true, message: 'Please type description', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					ID: '0',
					Date: '',
					Desc: '',
					RefNumber: 0,
					Amount: 0
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					Desc: [
						{ required: true, message: 'Please type description', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					ID: '-1',
					Date: '',
					Desc: '',
					RefNumber: 0,
					Amount: 0
				}

			}
		},
		methods: {
			//性别显示转换
			formatStatus: function (row, column) {
				return row.Status == 1 ? 'Add' : row.Status == 0 ? 'Post' : 'Post';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getTransactions();
			},
			//获取用户列表
			getTransactions() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getTransactionListPage(para).then((res) => {
					this.total = res.data.total;
					this.transactions = res.data.transactions;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getTransactions();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.editFormVisible = true;
				this.editForm = {
					ID: '-1',
					Date: '',
					Desc: '',
					RefNumber: 0,
					Amount: 0
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							//para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');

							if(para.ID == -1){
								addTransaction(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: 'Add提交成功' ,
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getTransactions();
								});
							}else{
								editTransaction(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getTransactions();
								});
							}
							
						});
					}
				});
			},
			
			selsChange: function (sels) {
				this.sels = sels;
			}
			
		},
		mounted() {
			this.getTransactions();
		}
	}

</script>

<style scoped>

</style>