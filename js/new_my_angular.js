var has_loading_template = '<div ng-include src="templateUrl"><div class="loading"></div></div>'

var app = angular.module('my_routes', ['duoshuo']).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when("/:path1", {
        template: has_loading_template,
        controller: LoadCtrl
    }).
    when("/:path1/:path2", {
        template: has_loading_template,
        controller: LoadCtrl
    }).
    when("/:path1/:path2/:path3", {
        template: has_loading_template,
        controller: LoadCtrl
    }).
    when("/:path1/:path2/:path3/:path4", {
        template: has_loading_template,
        controller: LoadCtrl
    }).
    when("/:path1/:path2/:path3/:path4/:path5", {
        template: has_loading_template,
        controller: LoadCtrl
    }).
    when("/:path1/:path2/:path3/:path4/:path5/:path6", {
        template: has_loading_template,
        controller: LoadCtrl
    }).
    when("/:path1/:path2/:path3/:path4/:path5/:path6/:path7", {
        template: has_loading_template,
        controller: LoadCtrl
    }).
    otherwise({
        redirectTo: '/list/'
    });
}])
var SideCtrl = ['$scope', '$location', function($scope, $location) {
    $scope.sideLiClass = function(path) {
        var cur_path = $location.path();
        console.log(cur_path);
        if (cur_path.indexOf(path) == 1) {
            return "current";
        } else {
            return "";
        }
    }
}];
var LoadPageCtrl = ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    $scope.isViewLoading = false;
    $scope.$on('$locationChangeStart', function(event, next, current) {
        console.log('location change');
    })

    $scope.$on('$routeChangeStart', function(event, next, current) {
        $scope.isViewLoading = true;
    });

    $scope.$on('$routeChangeError', function(event, next, current, error) {
        $scope.isViewLoading = false;
        if (error.status = 401) {
            console.log(error.data);
            //window.location = '/';
        }
    });

    $rootScope.$on('$routeChangeSuccess', function() {
        $scope.isViewLoading = false;
    });
}];
var LoadCtrl = ['$scope', '$routeParams', '$templateCache', function($scope, $routeParams, $templateCache) {
    $templateCache.removeAll();
    var path1 = encodeURIComponent($routeParams.path1);
    var path2 = encodeURIComponent($routeParams.path2);
    var path3 = encodeURIComponent($routeParams.path3);
    var path4 = encodeURIComponent($routeParams.path4);
    var path5 = encodeURIComponent($routeParams.path5);
    var path6 = encodeURIComponent($routeParams.path6);
    var path7 = encodeURIComponent($routeParams.path7);
    if (path7) {
        $scope.templateUrl = '/' + path1 + '/'+ path2 + '/' + path3 + '/' + path4 + '/' + path5 + '/' + path6 + '/' + path7;
    } else if (path6) {
        $scope.templateUrl = '/' + path1 + '/'+ path2 + '/' + path3 + '/' + path4 + '/' + path5 + '/' + path6;
    } else if (path5) {
        $scope.templateUrl = '/' + path1 + '/'+ path2 + '/' + path3 + '/' + path4 + '/' + path5;
    } else if (path4) {
        $scope.templateUrl = '/' + path1 + '/'+ path2 + '/' + path3 + '/' + path4;
    } else if (path3) {
        $scope.templateUrl = '/' + path1 + '/'+ path2 + '/' + path3;
    } else if (path2) {
        $scope.templateUrl = '/' + path1 + '/'+ path2;
    } else {
        $scope.templateUrl = '/' + path1;
    }

}];
var FilterCtrl = ['$scope', '$location', function($scope, $location) {
    $scope.currentTagClass = function(tag) {
        var cur_path = $location.path();
        console.log(cur_path);
        var path_arr = cur_path.split('/');
        console.log(path_arr);

        var path1 = path_arr[1];
        var path2 = path_arr[2];
        if (path1 == "tag" && path2 == tag) {
            return "current";
        } else {
            return "";
        }
    }
    
    $scope.currentCategoryClass = function(category) {
        var cur_path = $location.path();
        console.log(cur_path);
        var path_arr = cur_path.split('/');
        console.log(path_arr);

        var path1 = path_arr[1];
        var path2 = path_arr[2];
        if (path1 == "list" && category == "全部") {
            return "current";
        } else if ((path1 == "category" || path1 == "categories") && path2 == category) {
            return "current";
        } else {
            return "";
        }
    }
}];

app.controller('duoshuo', function($scope, $duoshuo) {
  $scope.demokey = 'dede-dede';
  // inspect current user 
  $duoshuo.on('ready', function(err, data) {
    if (err) return console.error(err);
    console.log(data);
    $scope.responseJSON = JSON.stringify(data);
  });
  // using lowlevel `get` method
  $duoshuo.get('threads/list', {
    page: 1,
    limit: 30
  }, function(err, data) {
    // success callback
    // `err` is common error
    if (err) return console.error(err);
    $scope.threads = data.response;
  }, function(err) {
    // error callback
    // `err` is http error
    console.log(err);
  });
  // test membership api
  $duoshuo.get('sites/membership', {}, function(err, data) {
    // success callback
    if (err) return console.error(err);
    console.log(data);
  }, function(err) {
    console.log(err);
  });
});