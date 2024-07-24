'use strict';
var app = angular.module('land.controller', ['ngRoute','stbs-services']);

app.controller('LandCtrl', ['$scope', '$http','$window', '$timeout',  '$interval', '$document','stbsService',function($scope, $http, $window, $timeout,  $interval, $document, stbsService) {
    $scope.beers='Beer is working';
    var date = new Date();
    var inceptionYear = 2018;
    $scope.currentYear = date.getFullYear();
    console.log(JSON.parse($window.localStorage.getItem('localCrats')));
    $scope.savePatient = function(isFormInvalid){
        if(isFormInvalid){
            console.log(isFormInvalid);
        }else{
            $window.sessionStorage.setItem('crats',  JSON.stringify($scope.craft));
            $scope.test();
            console.log($scope.craft);
            console.log(isFormInvalid);
        }

    };
    $scope.test = function(){
        $window.localStorage.setItem('localCrats',  $window.sessionStorage.getItem('crats'));
        console.log(JSON.parse($window.localStorage.getItem('localCrats')));
    };

    $scope.onSubmit = function(hope){
        console.log(hope);
    }
    var beerPromise = stbsService.getListInventory($scope.currentYear);
    beerPromise.then(function(data) {
        $scope.beerData = data;
    },function(error) {
        //console.log(error);
        $scope.errorHandler(error);
    });
    $scope.propertyName = 'vendor';
    $scope.reverse = false;
    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : true;
        $scope.propertyName = propertyName;
    }
}]);