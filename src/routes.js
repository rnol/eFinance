import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import TransactionList from './views/Transaction/TransactionList.vue'
import AddTransaction from './views/Transaction/AddTransaction.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Main,
        name: 'Home',
        iconCls: 'fa fa-fw fa-th-large text-orange',
        leaf: true,//只有一个节点
        children: [
            { path: '/', component: Home, name: 'Home', hidden: true },
            { path: '/Home', component: Home, name: 'Home' }
        ]
    },
    {
        path: '/',
        component: Main,
        name: 'Transaction',
        iconCls: 'fa fa-fw fa-cc-paypal text-orange',
        children: [
            {path: '/AddTransaction', component:AddTransaction, name: 'Add transaction' },
            {path: '/table', component:Table, name: 'Post transaction' },
            {path: '/TransactionList', component:TransactionList, name: 'View transaction' }
            
        ]
    },
    {
        path: '/',
        component: Main,
        name: 'Reconciliation',
        iconCls: 'fa fa-fw fa-balance-scale text-orange',//图标样式class
        children: [               
            { path: '/user', component: user, name: 'Query' },
            { path: '/table', component: Table, name: 'Reconciliation' }
        ]
    },
    {
        path: '/',
        component: Main,
        name: 'System Maintain',
        iconCls: 'fa fa-id-card-o text-orange',
        children: [
            { path: '/Form', component: Form, name: 'Account' },
            { path: '/page5', component: Page5, name: 'Sub-Account' },
            { path: '/page5', component: Page5, name: 'Bank' },
            { path: '/page5', component: Page5, name: 'Branch' },
            { path: '/page5', component: Page5, name: 'Organization' },
            { path: '/page5', component: Page5, name: 'Staff access rights' },
        ]
    },

    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;