var appControllers=angular.module('appLogout',[
{
  name:"authlogin",
  files:["js/services/Service.auth.js"]
}]);


appControllers.controller('LogoutController',function(LoginService,$scope,$state, toaster){
 
 	this.logout = function(){
      LoginService.logout();
      setTimeout(function(){
      	$state.go('authin');
      },2000);
      toaster.pop('success',"Yup! you are logged out");
    }
    this.logout();
});
