'use strict';
var app = angular.module('report.controller', ['ngRoute','stbs-services']);

app.controller('ReportCtrl', ['$scope', '$http','$window', '$timeout',  '$interval', '$document','stbsService',function($scope, $http, $window, $timeout,  $interval, $document, stbsService) {
    $scope.report ='You in Reports page.';
    $scope.liquorReportByName = [];       // total entries from the Inventory List.
    $scope.liqSizeBulk =[];         // total entries of Liquor-size from the Inventory List.
    $scope.sizeR = null;            // selected size of Liquor by click on the radio button.
    $scope.responseData = null;     // To display Lines of Liquor entries in the table.
    $scope.liqSizeForRadio =null;   // Final Liquor-size out the liquorSize multiple entires.
    $scope.byLiquorNameUI = true;
    $scope.byPhUI = true;
    $scope.toggleSlide = true;
    $scope.pHistory = false;
    $scope.rByLName = false;
    $scope.open1 = true;
    $scope.open2 = false;
    $scope.totalEntries = null;

    var liqNamePromise = stbsService.getLiquorName();
    liqNamePromise.then(function(data) {
        $scope.liquorNameResponse = data;
    },function(error) {
        //console.log(error);
        $scope.errorHandler(error);
    });
    var liqSizePromise = stbsService.getLiquorSize();
    liqSizePromise.then(function(data) {
        $scope.liqSizeResp = data;
        //console.log(data)
    },function(error) {
        //console.log(error);
        $scope.errorHandler(error);
    });
    var liqTypePromise = stbsService.getLiquorType();
    liqTypePromise.then(function(data) {
        //console.log(data)
    },function(error) {
        //console.log(error);
        $scope.errorHandler(error);
    });
/*$scope.showPaymentHistory = function(){
    var getPhPromise = stbsService.getPaymentHistory();
        getPhPromise.then(function(data) {
            $scope.responseData = data;
            $scope.totalEntries = $scope.responseData.length;
        },function(error) {
            console.log(error);
            $scope.errorHandler(error);
        });
};*/
    $scope.selectLiquorName = function(name){

        $scope.responseData = null; //to empty the table in UI
        $scope.liqSizeForRadio = null;
        $scope.liqSizeBulk =[];
        $scope.liquorReportByName =[];

        var getInventoryPromise = stbsService.getInventory();
            getInventoryPromise.then(function(data) {
                console.log(data);
                angular.forEach(data, function(obj) {
                    if(obj.liqName.toLowerCase() === name.toLowerCase()){
                        $scope.liquorReportByName.push(obj);
                        $scope.liqSizeBulk.push(obj.liqSize);   // to get the sizes of the Liquour from the total reponse
                    }
                });
                $scope.liqSizeForRadio = $scope.liqSizeBulk.filter((v, i, a) => a.indexOf(v) === i); // filtered out the liquorSize multiple entires.
                if($scope.liqSizeForRadio.length > 1){
                    $scope.liqSizeForRadio.push('All')
                }

            },function(error) {
                console.log(error);
                $scope.errorHandler(error);
            });
    };

    $scope.selectedRadiosize = function(rSize){
        $scope.responseData= [];
        angular.forEach($scope.liquorReportByName, function(obj, key){
            if(rSize === 'All'){
                $scope.responseData.push(obj);
                $scope.propertyName = 'invoiceDate';
                $scope.reverse = false;
            }
            else if(obj.liqSize === rSize){
                $scope.responseData.push(obj);
            }
            $scope.totalEntries = $scope.responseData.length;
        });
    };
    /*$scope.sideNav = function(){
        $scope.toggleSlide = !$scope.toggleSlide;
        $scope.open1 = !$scope.open1;
        $scope.open2 = !$scope.open2;
        if($scope.toggleSlide ===true){
             angular.element(".sideNav-drawer-content").css('width','calc(100% - 140px)');
              angular.element(".sideNav-drawer-content").css('margin-left','140px');
        }
        else{
            angular.element(".sideNav-drawer-content").css('width','100%');
             angular.element(".sideNav-drawer-content").css('margin-left','0px');
        }
    };*/
    $scope.showAndHideTabs = function(text){
        if(text ==='reportByLiquorName'){
            $scope.pageTitle = 'Search Liquor By Name';
            $scope.byLiquorNameUI = false;
            $scope.byPhUI = true;               // Hide True
            $scope.rByLName = true;             // Hide True
            $scope.pHistory = false;
            $scope.responseData= null;
        }
        else if(text ==='paymentHistory'){
            $scope.pageTitle = 'Payment History';
            $scope.byLiquorNameUI = true;               // Hide True
            $scope.byPhUI = false;
            $scope.rByLName = false;
            $scope.pHistory = true;
            $scope.showPaymentHistory();
            $scope.responseData= null;
        }
        else if(text ==='loadWholeInventroy'){
            $scope.pageTitle = 'Complete Inventory';
            $scope.byLiquorNameUI = true;              // Hide True
            $scope.byPhUI = true;
            $scope.rByLName = true;
            $scope.pHistory = true;
            $scope.responseData= null;
        }
        else if(text ==='filterInvoiceNum'){
            $scope.pageTitle = 'Search Invoice Number';
            $scope.byLiquorNameUI = true;
            $scope.byPhUI = true;
            $scope.rByLName = true;
            $scope.pHistory = true;
            $scope.responseData= null;

        }

    }
    $scope.showAndHideTabs('reportByLiquorName');
    $scope.propertyName = 'invoiceDate';
    $scope.reverse = true;
    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

//============================================
//============================================
  
    var date = new Date();
    var inceptionYear = 2018;
    $scope.currentYear = date.getFullYear();
    
    $scope.totalData = [];
    $scope.tableInvtData=[];
    $scope.collectiveResponse= function(data, val){
        $scope.collective=[];
        if(data !==''){
            angular.forEach(data, function(obj) {
                if(obj.liqName.toLowerCase() === val.toLowerCase()){
                    $scope.collective.push(obj);
                }
            });
            $scope.cleanupResponse($scope.collective);
        }
        if($scope.collective.length< 15){
            if($scope.currentYear > 2018){
                $scope.currentYear = $scope.currentYear-1;
                console.log($scope.currentYear);
                $scope.invtCall(val);
            }
        }
    };
    $scope.cleanupResponse = function(datam){
        $scope.liqSizeBulk =[];
        $scope.liquorReportByName =[];
        $scope.responseData = null; //to empty the table in UI
        $scope.liqSizeForRadio = null;
        angular.forEach(datam, function(obj) {
            $scope.liquorReportByName.push(obj);
            $scope.liqSizeBulk.push(obj.liqSize);
        });
// to get the sizes of the Liquour from the total reponse'
        $scope.liqSizeForRadio = $scope.liqSizeBulk.filter((v, i, a) => a.indexOf(v) === i); // filtered out the liquorSize multiple entires.
        if($scope.liqSizeForRadio.length > 1){
            $scope.liqSizeForRadio.push('All')
        }
    }
    $scope.invtCall= function(val){
        var getInventoryPromise = stbsService.getListInventory($scope.currentYear);
        getInventoryPromise.then(function(data) {
            if(data !==''){
                $scope.totalData.push(data);
                $scope.tableInvtData = $scope.totalData.flat();
            }else{
                $scope.tableInvtData ='';
            }
            $scope.collectiveResponse($scope.tableInvtData, val);
        },function(error) {
            console.log(error);
            $scope.errorHandler(error);
        });
    };

    $scope.inventorycheckbox = function(val){
        $scope.currentYear = date.getFullYear();
        $scope.totalData = [];
        $scope.tableInvtData=[];
        $scope.collective=[];
        $scope.liqSizeForRadio = null;
        $scope.invtCall(val);
    }


}]);
