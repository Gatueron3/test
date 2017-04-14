/**
 * 这里是注册模块的
 */

var loginModule = angular.module('loginModule', []);
loginModule.controller('loginCtrl', ['$scope', function($scope){
    $scope.userInfo = {
        email: '674986077@qq.com',
        password: '12345679'
    };
    $scope.setFormData = function(){
        $scope.userInfo = {
            email: '',
            password: ''
        };
    };
}]);


/**
 * 这里是书籍列表模块
 * @type {[type]}
 */

var BookListModule = angular.module('BookListModule', []);
BookListModule.controller('BookListCtrl', ['$scope', '$http', '$state', '$stateParams',
 function($scope, $http, $state, $stateParams){

//这里可以根据路由上传递过来的bookType参数加载不同的数据
/**
 * [getPagedDataAsync 获取异步数据]
 * @param  {[type]} pageSize   [每一页的数据个数]
 * @param  {[type]} page       [当前页的编号]
 * @param  {[type]} searchText [搜索的关键字]
 */

  $scope.getPagedDataAsync = function(page, pageSize, searchText) {
      setTimeout(function() {
          var data;
          if (searchText) {
            // 搜索文本
              var ft = searchText.toLowerCase();
              // 得到json文件
              $http.get('data/books' + $stateParams.bookType + '.json')
                  .then(function(response) {

                    // 成功的话
                      data = response.data.filter(function(item) {
                        // 如果找到的话，返回true
                          return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                      });
                      $scope.setPagingData(data, page, pageSize);
                  }, function(){
                    console.log('http的get请求失败' + response.status);
                  });
          } else {
              $http.get('data/books' + $stateParams.bookType + '.json')
                  .then(function(response) {
                      $scope.setPagingData(response.data, page, pageSize);
                  }, function(){
                    console.log('http的get请求失败' + response.status);
                  });
          }
      }, 100);
  };


  var paginationOptions = {
     pageNumber: 1,
     pageSize: 5,
     sort: null
   };

/**
 * [setPagingData description]
 * @param {[type]} data     [祸胎获取的数据]
 * @param {[type]} page     [当前页的编号]
 * @param {[type]} pageSize [每一个的数据的个数]
 */
  $scope.setPagingData = function(data, page, pageSize) {
    // 获取当前页的数据总数  当前页的总数据条数，赋值给ui-grid的data属性
    var firstRow = (page - 1) * pageSize;
    $scope.gridOptions.data = data.slice(firstRow, firstRow + pageSize);
      // 从后台获取的全部数据的条数
     $scope.gridOptions.totalItems = data.length;
  };

//从ui-gird从获取页数pageSize currentPage当前页
  $scope.getPagedDataAsync(paginationOptions.pageNumber,paginationOptions.pageSize);
	
//利用后台数据ui-grid,填充表格
     $scope.gridOptions = {
        //注意，这些field的值要与json字段一一对应才能显示出来
        columnDefs: [{ field: 'index', 
                       displayName: '序号', 
                       enableColumnMenu: false,// 是否显示列头部菜单按钮
                       enableHiding: false,
                       suppressRemoveSort: true,
                       enableCellEdit: false // 是否可编辑
                     },
                     { field: "name",
                       displayName: '书名'
                 	 },
                    { field: "author",
                      displayName: '作者'
                	 },
                    { field: "pubTime",
                      displayName: '出版日期'
                	 },
                    { field: "price",
                      displayName: '定价',
                      cellFilter: 'currency:"￥"'
                	 },	 
                    { field: "bookId",
                      displayName: '操作',
                      cellTemplate: '<div><a ui-sref="bookdetail({bookId:grid.getCellValue(row, col)})">详情</a></div>'
                    }
                    ],
                    
        //-------- 分页属性 ----------------
        enablePagination: true, //是否分页，默认为true
        enablePaginationControls: true, //使用默认的底部分页
        paginationPageSizes: [5, 10, 15], //每页显示个数可选项
        paginationPageSize: 5, //每页显示个数
        paginationCurrentPage:1, //当前页码
        //paginationTemplate:"<div></div>", //自定义底部分页代码
        totalItems : 0, // 总数量
        useExternalPagination: true,//是否使用分页按钮
        useExternalSorting: false, //是否使用自定义排序规则
        //---------------api---------------------
        // onRegisterApi: function(gridApi) {
        //     $scope.gridApi = gridApi;
        //     //分页按钮事件
        //     gridApi.pagination.on.paginationChanged($scope,function(newPage, pageSize) {
        //           if(getPage) { 
        //               getPage(newPage, pageSize); 
        //            }
        //     });
        // }
    };


}]);


/**
 * 书籍的详情模块
 * @type {[type]}
 */
var BookDetailModule = angular.module('BookDetailModule', []);
BookDetailModule.controller('BookDetailCtrl', ['$scope', '$http', '$state', '$stateParams',
 function($scope, $http, $state, $stateParams){

var bookId = $stateParams.bookId;

$scope.getDetailDataAsync = function(bookId) {
    setTimeout(function() {
        $http.get('data/books0.json')
            .then(function(response) {
               $scope.details = response.data.filter(function(item){
                     return item.bookId == bookId;
                })[0];
               //返回的是一个数组，里面只有一个对象，[0]取出这个对象
            }, function(){
              console.log('http的get请求失败' + response.status);
            });
    }, 100);
};

$scope.getDetailDataAsync(bookId);

}]);



/**
 * 添加书籍的模块
 */

 var addBookModule = angular.module('addBookModule', []);
 addBookModule.controller('addBookCtrl', ['$scope', function($scope){
     $scope.emptyData = function() {
        $scope.book = {};
     }
 }]);
 













