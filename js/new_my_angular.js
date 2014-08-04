var has_loading_template = '<div ng-include src="templateUrl"><div class="loading"></div></div>'

angular.module('my_routes', []).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when("/:path", {
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
var LoadingCtrl = ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
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
            alert(error.data);
            window.location = '/users/sign_in';
        }
    });

    $rootScope.$on('$routeChangeSuccess', function() {
        $scope.isViewLoading = false;
    });
}];
var LoadCtrl = ['$scope', '$routeParams', '$templateCache', function($scope, $routeParams, $templateCache) {
    $templateCache.removeAll();
    var path = $routeParams.path;
    $scope.templateUrl = '/' + path;
}];