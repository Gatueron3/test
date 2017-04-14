/**
 * bookStoreApp是项目的入口模块，其依赖ui.router ui.grid
 * 以及我们自定义的两个模块，BookListModule和BookDetailModule
 */



var bookStoreApp = angular.module('bookStoreApp', ['ui.router', 'ui.grid','ui.grid.pagination', 'BookListModule', 'BookDetailModule', 'loginModule', 'addBookModule']);

/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */



//注意：$state和$stateParams是来至于ui-route中
//https://github.com/angular-ui/ui-router/wiki/URL-Routing
//$stateParams就是状态参数，$stateParams可以为控制器或者服务提供 url 的各个部分。


bookStoreApp.run(function($rootScope, $state, $stateParams){
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});


/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
bookStoreApp.config(function($stateProvider, $urlRouterProvider) {
    // 如果没有匹配到其他路由，则直接返回到首页
    $urlRouterProvider.otherwise('/index');
    // 路由的而配置
    $stateProvider
        .state('index', {
            // 如果是首页
            url: '/index',
            views: {
                '': {
                // 为空的话就是主页
                    templateUrl: 'tpls/home.html'
                },
                'main@index': {
                    // 如果有嵌套路由的话，就是注册页
                    templateUrl: 'tpls/login_form.html'
                }
            }
        })
        .state('booklist', {
            // 书的列表
            url: '/{bookType:[0-9]{1,4}}',
            views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
                '': {
                // 主页是booklist
                    templateUrl: 'tpls/booklist.html'
                },
                'booktype@booklist': {
                    // booktype的路由为booktype的模板
                    templateUrl: 'tpls/book_type.html'
                },
                'bookgrid@booklist': {
                    // bookgrid的路由为bookgrid的模板
                    templateUrl: 'tpls/bookgrid.html'
                }
            }
        })
        .state('addbook', {
            // 添加书籍
            url: '/addbook',
            templateUrl: 'tpls/addbook_form.html'
        })
        .state('bookdetail', {
            // 书的详细
            url: '/bookdetail/:bookId', //注意这里在路由中传参数的方式
            templateUrl: 'tpls/book_details.html'
        })
});