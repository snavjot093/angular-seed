'use strict';
var app = angular.module('inventory.controller', ['ngRoute','stbs-services','ui.bootstrap']);
app.controller('InvenCtrl', ['$scope', '$http','$window', '$timeout',  '$interval', '$document','stbsService','uibDateParser',function($scope, $http, $window, $timeout,  $interval, $document, stbsService,uibDateParser) {
    $scope.Math = window.Math;
    $scope.allFlag =  false;
    var date = new Date();
    var inceptionYear = 2018;
    var currentYear = date.getFullYear();
    $scope.dataYears = [];
    for(var i=inceptionYear; i<= currentYear; i++){
        $scope.dataYears.push(i);
    }
    $scope.totalData = [];
    var callYears = []
    $scope.inventorycheckbox = function(val){
        if($scope.allFlag =  false){

        }
        else{

        }
        if(callYears.includes(val)){
            var idx = callYears.indexOf(val);
            if (idx >= 0) {
                callYears.splice(idx, 1);
                $scope.totalData.splice(idx, 1);
                $scope.tableData = $scope.totalData.flat();
            }
        }
        else{
            callYears.push(val);
            var getInventoryPromise = stbsService.getListInventory(val);
            getInventoryPromise.then(function(data) {
                $scope.totalData.push(data);
                $scope.tableData = $scope.totalData.flat();
                console.log($scope.totalData);
                console.log($scope.tableData);
            },function(error) {
                console.log(error);
                $scope.errorHandler(error);
            });
        }
    };
    $scope.allcheckbox = function(){
        $scope.allFlag =  true;
        angular.forEach($scope.dataYears, function(value, key){
            angular.element('.'+value)[0].checked = false;
            if($scope.dataYears.length-1 === key){
                callYears = [];
                $scope.totalData =[];
                $scope.callForAll();
            }
        });
    };
    $scope.callForAll = function(){
        angular.forEach($scope.dataYears, function(val, key){
            $scope.inventorycheckbox(val);
        });
    }
    $scope.propertyName = 'name';
    $scope.reverse = true;
    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };



































/*
$scope.masterObj=[];
$scope.maxDate = new Date();
var calledAlready = [];
$scope.InventoryCall = function(sResult){
        if(calledAlready.includes(sResult)){
        }
        else{
            calledAlready.push(sResult);
            var getInventoryPromise = stbsService.getListInventory(sResult);
            getInventoryPromise.then(function(data) {
                $scope.responseData = data;
                $scope.masterObj.push(data);
                $scope.totalEntries = $scope.responseData.length;
                console.log($scope.masterObj);
            },function(error) {
                console.log(error);
                $scope.errorHandler(error);
            });
        }
    };// ==================++END OF GET INVENTORY CALL


var yearsCollection = [];
$scope.inventorycheckbox = function(sResult){
    var idx = yearsCollection.indexOf(sResult);
    if (idx >= 0) {
        yearsCollection.splice(idx, 1);
    } else {
        yearsCollection.push(sResult);
    }
    $scope.InventoryCall(sResult);
    console.log(yearsCollection);
};

//==================DATE PICKER SETTINGS & DATE PICKER APPLY FUNCTIONS==========
    $scope.formats = ['dd-MMMM-yyyy','MMM-dd-yy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];
    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.popup2 = {
         opened: false
    };
    $scope.dateOptions = {
    //    dateDisabled: disabled,
        formatYear: 'yy',
        //maxDate: new Date(2017, 1, 01),
        //minDate: new Date(),
        startingDay: 1,
        showWeeks:false
    };
    function disabled(data) {
        var date = data.date,
        mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }
    $scope.endDatePicker = function(){
        $scope.asPerDateRange()
        console.log($scope.endDate.getTime());
        $scope.dateOptions.maxDate =$scope.endDate !== undefined ? new Date($scope.endDate) : new Date();
    }
    $scope.startDatePicker = function(){
        $scope.asPerDateRange();
        console.log($scope.endDate);
        $scope.dateOptions.minDate =$scope.startDate !== undefined ? new Date($scope.startDate) : new Date('2017, 1, 01');
    }
    $scope.asPerDateRange = function(){
        $scope.newObj =[];
        if(($scope.endDate !== undefined && $scope.endDate !== null) && ($scope.startDate !== undefined && $scope.startDate !== null)){
            angular.forEach($scope.masterObj, function(obj) {
                if(obj.invoiceDate <= $scope.endDate.getTime() && obj.invoiceDate >= $scope.startDate.getTime()){
                    $scope.newObj.push(obj);
                }
            });
            $scope.responseData = $scope.newObj;
            $scope.totalEntries = $scope.responseData.length;
            console.log($scope.responseData.length);
        }
    }
    $scope.filterRadio = function(obj){

        if(obj ==='addFilter'){
            $scope.removeFilterFlag = true;
        }
        else{
            $scope.removeFilterFlag = false;
            $scope.responseData = $scope.masterObj;
            $scope.totalEntries = $scope.responseData.length;
            $scope.endDate =  null;
            $scope.startDate = null;
        }
    };
*/

}]);
