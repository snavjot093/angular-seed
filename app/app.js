'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', ['ngRoute','report.controller','createorder.controller', 'inventory.controller','beer.controller', 'myApp.version']).
config(['$locationProvider', '$routeProvider',  '$httpProvider',function($locationProvider, $routeProvider,$httpProvider) {

//    IdleProvider.idle(1800); //30 mins
//    IdleProvider.timeout(30); //If you change this also change values on home.jsp countdown
    //KeepaliveProvider.interval(10);
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get)
      $httpProvider.defaults.headers.get = {};



 // $locationProvider.hashPrefix('!');
  $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

  $routeProvider.when('/inventory', {templateUrl: 'view/inventory.html', controller: 'InvenCtrl' });
   $routeProvider.when('/beer', {templateUrl: 'view/beer.html', controller: 'BeerCtrl' });
  $routeProvider.when('/report',    {templateUrl: 'view/report.html', controller: 'ReportCtrl'});
  $routeProvider.when('/createOrder', {templateUrl: 'view/createOrder.html', controller: 'CreateOrderCtrl'});
 // $routeProvider.when('/dashboard', {templateUrl: 'view/dashboard.jsp', controller: 'DashboardCtrl'});
  $routeProvider.otherwise({redirectTo: '/report'});
}]);
