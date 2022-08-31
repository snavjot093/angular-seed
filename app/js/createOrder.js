'use strict';
var app = angular.module('createorder.controller', ['ngRoute','stbs-services']);

app.controller('CreateOrderCtrl', ['$scope', '$http','$window', '$timeout',  '$interval', '$document','stbsService',function($scope, $http, $window, $timeout,  $interval, $document, stbsService) {
    $scope.selected = [];
    $scope.masterPrice=[];
    $scope.minPrice =0;
    $scope.maxPrice =0;


    var liqNamePromise = stbsService.getLiquorName();
    liqNamePromise.then(function(data) {
        $scope.liquorNameResponse = data;
        console.log($scope.liquorNameResponse);
    },function(error) {
        //console.log(error);
        $scope.errorHandler(error);
    });
    /*var getInventoryPromise = stbsService.getInventory();
        getInventoryPromise.then(function(data) {
            $scope.allMyLiquor= data;
            console.log(data);
        },function(error) {
            console.log(error);
            $scope.errorHandler(error);
        });*/
        $scope.checkboxed = function(item, name, val){
        console.log(name);
        console.log(val);
        var sResult = {name: name, size: val, item:item};
        var count=0;
        var i =0;
        var index= 0;
        if($scope.selected.length > 0){
            for(i in $scope.selected){
                if($scope.selected[i].item == item){
                    count++;
                    $scope.selected.splice(i,1);
                    break;
                }
            }
            for (index in $scope.masterPrice) {
                if($scope.masterPrice[index].name == name && $scope.masterPrice[index].size == val){
                    $scope.masterPrice.splice(index,1);
                    console.log($scope.masterPrice);
                    break;
                }
            }
            if(count === 0){
                $scope.selected.push(sResult)
                $scope.searchLiquor(name, val);
            }
        }
        else{
            $scope.selected.push(sResult);
            $scope.searchLiquor(name, val);                                     //regex needed = .match(/[0-9 a-zA-Z]+|[0-9 a-zA-Z]+/g)
        }
    }
    //==========SEARCH LIQUOR USING MULTIPLE VALUES TO SORTEN THEN LIST========
    $scope.searchLiquor= function(name, size) {
        //$scope.liqsalesP=[];
        $scope.liqBuyingResponse=[];
        $scope.liqSellingResponse=[];
        var count = 0;
        angular.forEach($scope.allMyLiquor, function(obj) {
            if(obj.liqName === name && obj.liqSize === size){
                count++;
                $scope.liqsalesP= obj.salesPerson;
                $scope.liqBuyingResponse.push(obj.price);                       //Getting the buying price from all  the entries
                $scope.liqSellingResponse.push(obj.sellPrice);                  //Getting the selling price from all  the entries
            }
        });
        $scope.minPrice = $scope.liqBuyingResponse.length > 0 ?  $scope.liqBuyingResponse.reduce((a, b) => Math.min(a, b)) : 0;    //Getting the minimum buying price.
        $scope.maxPrice = $scope.liqBuyingResponse.length > 0 ?  $scope.liqBuyingResponse.reduce((a, b) => Math.max(a, b)) : 0;     //Getting the maxmum buying price.
        $scope.sellPrice =$scope.liqSellingResponse.length > 0 ? $scope.liqSellingResponse[$scope.liqSellingResponse.length-1] : 0;   // //Getting the most recent selling price.
        if(count === 0){
            $scope.masterPrice.push({'salesPerson':$scope.liqsalesP,'name':name,'size':size,'min':'', 'max':'','sPrice':''});
        }
        else{
            $scope.masterPrice.push({'salesPerson':$scope.liqsalesP,'name':name,'size':size,'min':$scope.minPrice, 'max':$scope.maxPrice,'sPrice':$scope.sellPrice});
        }
        $scope.propertyName = 'name';
        $scope.reverse = false;
        $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : true;
            $scope.propertyName = propertyName;
        };
        console.log($scope.masterPrice);
    }
//============================  INVENTORY CALL  ========================================

    $scope.invtCall= function(val){
        $scope.totalData = [];
        $scope.tableInvtData=[];
        $scope.collective=[];
        var getInventoryPromise = stbsService.getListInventory(val);
        getInventoryPromise.then(function(data) {
            if(data !==''){
                $scope.totalData.push(data);
                $scope.tableInvtData = $scope.totalData.flat();
            }else{
                $scope.tableInvtData ='';
            }
            $scope.allMyLiquor = $scope.tableInvtData;
        },function(error) {
            console.log(error);
            $scope.errorHandler(error);
        });
    };
    var date = new Date();
    var inceptionYear = 2018;
    for(var i = inceptionYear; i <= date.getFullYear(); i++){
        $scope.invtCall(i);
    }

}]);
