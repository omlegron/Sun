var appControllers=angular.module('appSadminAct',[
{
  name:"superadmin",
  files:["js/services/Service.superadmin.js"]
}]);

appControllers.controller('SadminActController',function($http, toaster, $state, SuperadminService, $stateParams){
   	// console.log($stateParams.token);
   	app = this;
   	SuperadminService.activeAccount($stateParams.token).then(function(data){
   		app.successMsg	= false;
   		app.errorMsg	= false;

   		if (data.data.success){
   			app.successMsg	= data.data.message;
            setTimeout(function(){$state.go('authin');},2000);
   		}else{
   			app.errorMsg	= data.data.message;
   			setTimeout(function(){$state.go('authin');},2000);
   		}
   	});

});