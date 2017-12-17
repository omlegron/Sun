var appControllers=angular.module('appDashboard',[
{
  name:"authlogin",
  files:["js/services/Service.auth.js"]
}]);
appControllers.controller('DashboardController',function(LoginService,$scope,$state,toaster, $location){
	$scope.go = function (){
	
	
	$scope.$watchCollection($location.path('/alumni/sadmin'), function(){
		 
                    window.location.reload();
                
		// $window.location.reload.href='/#!/index';
	});
};
    
});
