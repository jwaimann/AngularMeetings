'use strict';

var app = angular.module('myApp.view3', ['ngRoute', 'ngResource'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);




app.controller('View3Ctrl', ['$scope', '$http',

    function($scope, $http) {

        $scope.isbn = '';

        $scope.getBook =   function() {

            if ($scope.isbn != '') {
                $http.jsonp('https://www.googleapis.com/books/v1/volumes?maxResults=1&callback=JSON_CALLBACK&key=AIzaSyATldFLGtPPZVLecasP0nFXkX6RqXa7VEI&q=isbn:' + $scope.isbn)
                    .success(function (data) {
                        $scope.book = data.items[0];
                        $scope.book.cover_s = "http://covers.openlibrary.org/b/isbn/" + $scope.isbn + "-S.jpg";
                        $scope.book.cover_m = "http://covers.openlibrary.org/b/isbn/" + $scope.isbn + "-M.jpg";
                        $scope.book.cover_l = "http://covers.openlibrary.org/b/isbn/" + $scope.isbn + "-L.jpg";
                    }).
                    error(function (data, status) {
                        $scope.data = data;
                        $scope.status = status;
                    });
            }
            ;
        }

    }]);