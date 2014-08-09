var has_loading_template = '<div ng-include src="templateUrl"><div class="loading"></div></div>'

angular.module('my_routes', []).
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
    otherwise({
        redirectTo: '/dame09plus_jekyll/default/'
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
    var path1 = $routeParams.path1;
    var path2 = $routeParams.path2;
    var path3 = $routeParams.path3;
    var path4 = $routeParams.path4;
    var path5 = $routeParams.path5;
    if (path5) {
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