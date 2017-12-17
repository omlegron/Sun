// app.run(function($rootScope,$stateParams,$state, $anchorScroll, $location){
//   $rootScope.$state = $state;
//   $rootScope.$stateParams = $stateParams;
//    $rootScope.$on('$stateChangeSuccess', function() {
//       // $("html, body").animate({ scrollTop: 0 }, 200);
//       $anchorScroll('top');
//   }); 

// });

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, MODULE_CONFIG) {
  $urlRouterProvider.otherwise('/index');
  // $locationProvider.hashPrefix('');
  // $locationProvider.html5Mode(true); 

  $stateProvider
  .state('Hmc', {abstract: true,views: {
    '': {templateUrl: 'templates/views/homycare/Hc.Layout.html'},
    'aside': {templateUrl: 'templates/views/homycare/Hc.Aside.html'},
    'content': {templateUrl: 'templates/views/homycare/Hc.Content.html'}
  },
    data: {folded: true},
    resolve: load(['HcHm'])
  }) 
  .state('MgLogin',{
    url:'/MgLogin',
    templateUrl: 'templates/views/homycare/MgAlm.Login.html',
    controller:'MgLoginController',
    controllerAs:'MgLogin',
    resolve: load(['HcLogin', 'js/controllers/homycare/MgAlm.Login.js',''])
  })
  .state('MgSignup',{
    url:'/MgSignup',
    templateUrl: 'templates/views/homycare/MgAlm.Signup.html',
    controller:'MgSignupController',
    controllerAs:'MgSignup',
    resolve: load(['HcSignup','js/controllers/homycare/MgAlm.Signup.js'])
  })
  .state('Hmc.index', {
    url: '/index',
    templateUrl: 'Dashboard.html',
    controller:'DashboardController',
    controllerAs:'Dashboard',
    resolve: load(['HcHmDash'])
  })    
  .state('Hmc.index.team', {
    url: '/index/team',
    templateUrl: 'Team.html'
    // controller:'DashboardController',
    // controllerAs:'Dashboard',
    // resolve: load(['HcHm', 'js/controllers/homycare/Dashboard.js'])
  })    

      // $locationProvider.html5Mode({ enabled: true, requireBase: false }); // Required to remove AngularJS hash from URL (no base is required in index file)
 
  function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            if(!module.module){
                              name = module.files;
                            }else{
                              name = module.name;
                            }
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }
});