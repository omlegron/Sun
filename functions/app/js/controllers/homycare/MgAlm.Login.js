var appControllers  = angular.module('MgLogin',[
{
  name:"authlogin",
  files:["js/services/Service.auth.js"]
}]);

appControllers.controller('MgLoginController',function(LoginService,$scope,$state, toaster){
    var app = this;

    // if (LoginService.isLoggedIn()){
    //   console.log('Success: Superadmin is logged in');
    //   LoginService.getSuperadmin().then(function(data){
    //     console.log('oot ini data',data);
    //     // app.username = data.data.username;
    //   });
    // }else{
    //   console.log('Failure: Superadmin is NOT logged in');
    // }

    // app.doLogin = function(loginData){
    //   app.errorMsg = false;
    //    // console.log('Daata',app.loginData);

    //    LoginService.login(app.loginData).then(function(data){
    //       // console.log(data.data.success);
    //       // console.log(data.data.message);
    //       if (data.data.success) {
    //         toaster.pop('success','Cheers! your account is True');    
    //         setTimeout(function(){$state.go('alumni.dashboard');},2000);
    //       }else{
    //         toaster.pop('error',data.data.message);    
    //         // app.errorMsg = data.data.message;
    //       }
    //    });
    // };

    // // app.logout = function(){
    // //   LoginService.logout();
    // // }
});
