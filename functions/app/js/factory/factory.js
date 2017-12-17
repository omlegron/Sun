var appFactory=angular.module('app.factory',[]);

appFactory.factory('AuthService',function($http, AuthToken, $rootScope){
  var authFactory = {};

  authFactory.login = function(loginData){
    return $http.post('/api/authenticate', loginData).then(function(data){
      // console.log('ini datanya om', data);
      AuthToken.setToken(data.data.token);

      return data;
    });
  };

    //Auth.isLoggedIn();
    authFactory.isLoggedIn = function(){
      if(AuthToken.getToken()){
        authFactory.getSuperadmin().then(function(data){
         $rootScope.data = data.data.level;
         // console.log('Success', data.data);
         // console.log('Success', $rootScope.data);
       });
        return true;
      }else{
        return false;
      }
    };

   // Auth.getSuperadmin();
   authFactory.getSuperadmin = function(){
    if(AuthToken.getToken()){
      return $http.post('/api/me');
    }else{
      $q.reject({message:'Superadmin Has No Token'});
    }
  };

    // Auth.logout();
    authFactory.logout = function(){
      AuthToken.setToken();
    };
    return authFactory;
  });


appFactory.factory('AuthToken', function($window){
  var authTokenFactory = {};

  // AuthToken.setToken(token);
  authTokenFactory.setToken = function(token){
    if(token){
      $window.localStorage.setItem('token', token); 
    }else{
      $window.localStorage.removeItem('token');
    }
    
  };

  // AuthToken.getToken(token);
  authTokenFactory.getToken = function(){
    return $window.localStorage.getItem('token');
  };
  return authTokenFactory;
});

appFactory.factory('AuthInterceptors', function(AuthToken){
  var AuthInterceptorsFactory = {};

  AuthInterceptorsFactory.request = function(config){
    var token = AuthToken.getToken();
    if (token) config.headers['x-access-token'] = token;
    return config;
  };
  return AuthInterceptorsFactory;
});

