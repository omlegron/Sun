var app=angular.module('mypjtOm',[
  'toaster',
  'ngAnimate',
  'ngAria',
  'ngResource',
  'ngSanitize',
  'ngMaterial',
  'ngStorage',
  'ngStore',  
  'mgcrea.ngStrap',
  'app.factory',
  'app.directives',
  // 'ui.utils',
  'ui.load',
  'ui.router',
  'oc.lazyLoad',
  'ui.jp',
  'datatables',
  'ngScrollable',
  // 'datatables.columnfilter',
  'datatables.light-columnfilter',
  'datatables.select',
    'ui.select',    
    'dynamicNumber',
    'ngMap']);

// app.config(function($datepickerProvider) {
//   angular.extend($datepickerProvider.defaults, {placement:'bottom',dateFormat: 'dd-MM-yyyy',autoclose: true });
// });

app.config(function($httpProvider, $qProvider){ 
  $httpProvider.interceptors.push('AuthInterceptors');
  $qProvider.errorOnUnhandledRejections(false);
});


app.run(function($location, $rootScope,$stateParams,AuthService,$state,$localStorage, toaster, $anchorScroll){
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
  
    if(toState.authenticate && toState.name !== 'authin' && !AuthService.isLoggedIn()){
     event.preventDefault();
     $state.transitionTo('authin');
   }else if(AuthService.isLoggedIn() && toState.level){
     AuthService.getSuperadmin().then(function(data){
      if (toState.level[0] !== data.data.level){
        console.log('Success: Super', data.data.level);          
        event.preventDefault();
        $state.transitionTo('hommy.dashboard');      
      }
    });
   }
   if (AuthService.isLoggedIn() && toState.name == 'authin'){
    AuthService.getSuperadmin().then(function(data){
      app.username = data.data.username;
      console.log('Success: Superadmin is logged in:', AuthService.getSuperadmin());
      event.preventDefault();      
      $state.transitionTo('hommy.dashboard');      
      toaster.pop('success','This Account Has Been Logged');    
    });
  };
});
});

app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
  $urlRouterProvider.otherwise('/index');
  $locationProvider.hashPrefix('');
  // $locationProvider.html5Mode(true); 

  $stateProvider
  .state('hommy', {abstract: true, url: '/hommy',views: {
    '': {templateUrl: 'templates/layout.html'},
    'aside': {templateUrl: 'templates/aside.html'},
    'content': {templateUrl: 'templates/content.html'}},
    data: {folded: true},
      resolve: {
      all: function($ocLazyLoad){
        return $ocLazyLoad.load({
          name:'allMg',
          files: ['public/coba/app.css','public/angular/angular-material/angular-material.css','public/coba/font.css']
        })
      }
    }
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/views/Signup.html',
    controller:'SignupController', 
    controllerAs:'SignupController1',
    resolve: {
      signup: function($ocLazyLoad){
        return $ocLazyLoad.load({
          name:'appSignup',
          files: ['js/controllers/SignupController.js','public/coba/app.css','public/angular/angular-material/angular-material.css','public/coba/font.css']
        })
      }
    }
  })
  .state('authin', {
    url: '/authin',
    templateUrl: 'templates/views/Login.html',
    controller:'LoginController',
    controllerAs:'LoginController1',
    authenticate: false,
    resolve: {
      authin: function($ocLazyLoad){
        return $ocLazyLoad.load({
          name:'appLogin',
          files: ['js/controllers/LoginController.js','public/coba/app.css','public/angular/angular-material/angular-material.css','public/coba/font.css']
        })
      }
    }
  })
  .state('logout', {
    url: '/logout',
    templateUrl: '',
    controller:'LogoutController',
    controllerAs:'LogoutController1',
    resolve: {
      logout: function($ocLazyLoad){
        return $ocLazyLoad.load({
          name:'appLogout',
          files: ['js/controllers/LogoutController.js']
        })
      }
    }
  })
  .state('hommy.dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/views/Dashboard.html',
    controller:'DashboardController',
    controllerAs:'DashboardController1',
    authenticate: true,
    resolve: {
      dashboard: function($ocLazyLoad){
        return $ocLazyLoad.load({
          name:'appDashboard',
          files: ['js/controllers/DashboardController.js']
        })
      }
    }
  })
  // hommy --> ADMIN --> SUPERADMIN
  .state('activate', {
    url: '/activate/:token',
    templateUrl: 'templates/views/AccSadmin.Activate.html',
    controller:'SadminActController',
    controllerAs:'SadminActController1',
      // authenticate: true,
      resolve: {
        activate: function($ocLazyLoad){
          return $ocLazyLoad.load({
            name:'appSadminAct',
            files: ['js/controllers/AccSadminActController.js']
          })
        }
      }
    })
  .state('hommy.sadmin', {
    url: '/sadmin',
    templateUrl: 'templates/views/AccSadmin.data.html',
    controller:'SadminController',
    controllerAs:'SadminController1',
    authenticate: true,
    level: ['Superadmin'],
    resolve: {
      sadmin: function($ocLazyLoad){
        return $ocLazyLoad.load({
          name:'appSadmin',
          files: ['js/controllers/AccSadminController.js']
        })
      }
    }
  })
  .state('hommy.sadminedit', {
    url: '/sadmin/edit/:id',
    templateUrl: 'templates/views/AccSadmin.edit.html',
    controller:'SadminEditController',
    controllerAs:'SadminEditController1',
    authenticate: true,
    resolve: {
      sadminedit: function($ocLazyLoad){
        return $ocLazyLoad.load({
          name:'appSadminEdit',
          files: ['js/controllers/AccSadminController.js']
        })
      }
    }
  })
  .state('hommy.sadminedit_password', {
    url: '/sadmin/resetpassword/:id',
    templateUrl: 'templates/views/AccSadmin.edit.password.html',
    controller:'SadminEditPassController',
    controllerAs:'SadminEditPassController1',
    authenticate: true,
    resolve: {
      sadmineditpass: function($ocLazyLoad){
        return $ocLazyLoad.load({
          name:'appSadminEditPass',
          files: ['js/controllers/AccSadminController.js']
        })
      }
    }
  })
  .state('hommy.sadminnew', {
    url: '/sadmin/new',
    templateUrl: 'templates/views/AccSadmin.new.html',
    controller:'SadminNewController',
    controllerAs:'SadminNewController1',
    authenticate: true,
    resolve: {
      sadminnew: function($ocLazyLoad){
        return $ocLazyLoad.load({
          name:'appSadminNew',
          files: ['js/controllers/AccSadminController.js']
        })
      }
    }
  })
  // $locationProvider.html5Mode({ enabled: true, requireBase: false }); // Required to remove AngularJS hash from URL (no base is required in index file)
});
