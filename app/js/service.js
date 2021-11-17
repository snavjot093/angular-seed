'use strict';
var app = angular.module('stbs-services',[]);

app.service("stbsService", function( $http, $q ) {
    return({
        getBeers        :   getBeers,
        getInventory    :   getInventory,
        getListInventory:getListInventory,
        getLiquorName   :   getLiquorName,
        getLiquorSize   :   getLiquorSize,
        getLiquorType   :   getLiquorType,
        getPaymentHistory:getPaymentHistory
    });
    function getBeers() {
        var request = $http({
            method: "get",
            url: './data/beer.json' ,
            params: {action: "get"}
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function getInventory() {
        var request = $http({
            method: "get",
            url: './data/inventory.json' ,
            params: {action: "get"}
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function getListInventory(name) {
        //console.log(name);
        var url ="./data/inventory/"+name+".json"
        //console.log(url);
        var request = $http({
            method: "get",
            url: url ,
            params: {action: "get"}
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function getLiquorName(){
        var request = $http({
            method: "get",
            url: "./data/liquorNames.json",
            params: {action: "get"}
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function getLiquorSize(){
        var request = $http({
            method: "get",
            url: "./data/liquorSizes.json",
            params: {action: "get"}
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function getLiquorType(){
        var request = $http({
            method: "get",
            url: "./data/liquorType.json",
            params: {action: "get"}
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function getPaymentHistory(){
        var request = $http({
            method: "get",
            url: "./data/paymentHistory.json",
            params: {action: "get"}
        });
        return( request.then( handleSuccess, handleError ) );
    }





















  function handleError( response ) {
      // The API response from the server should be returned in a
      // nomralized format. However, if the request was not handled by the
      // server (or what not handles properly - ex. server error), then we
      // may have to normalize it on our end, as best we can.
      if (! angular.isObject( response.data ) || ! response.data.message) {
          return( $q.reject( "An unknown error occurred." ) );
      }
      // Otherwise, use expected error message.
      return( $q.reject( response.data) );
  }
  // Transform the successful response, unwrapping the application data from the API response payload.
  function handleSuccess( response ) {
      return( response.data );
  }
});
