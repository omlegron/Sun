

/**
 * @ngdoc function
 * @name app.controller:AppCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
// angular.module('app')  


app.controller('appCtrl', ['$scope',  '$localStorage', '$window', '$document', '$location', '$anchorScroll', '$stateParams', '$rootScope', '$timeout', '$mdSidenav', '$mdColorPalette', 'AuthService',
    function (             $scope,    $localStorage,   $window,   $document,   $location, $anchorScroll, $stateParams, $rootScope,   $timeout,   $mdSidenav,   $mdColorPalette, AuthService ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');
     $scope.scrollTo = function(target) {
    var el = document.getElementById(target);
    el.scrollIntoView(true);
    
  }

   var bgImagesList = ['slide1.jpg',
        'slide2.jpg', 'slide3.jpg'];

  var bgimg = bgImagesList[Math.floor(Math.random() * bgImagesList.length)];   

$rootScope.setBackg = function(){
    return {
            'background-image':'url(public/UsrAlumni/dashboard/images/slider/' + bgimg + ')',
              'height':'100%',
  'width':'100%',
  'top':'0',
  'position':'fixed',
  // background-image:url(http://unsplash.it/1600/600?random=1);
  /*background-image:url(../../../UsrAlumni/dashboard/images/slider/slide2.jpg);*/
/*  background-image:url(public/HomyC/assets/img/intro.jpg);*/
  'background-position':'center center',
  'background-repeat':'no-repeat',
  '-webkit-background-size': 'cover',
  '-moz-background-size': 'cover',
  '-o-background-size': 'cover',
  'background-size': 'cover',
  'z-index': '-100'
        }
} ;

     $scope.goto = function(url){
        $location.path(url);
        window.location.reload();
     };
       // config
      $scope.app = {
        name: 'OM_Legron',
        company: 'OM_Legron',
        codename: 'Fuck Off',
        version: '1.0',
        
        // for chart colors
        color: {
          primary: '#3f51b5',
          info:    '#2196f3',
          success: '#4caf50',
          warning: '#ffc107',
          danger:  '#f44336',
          accent:  '#7e57c2',
          white:   '#ffffff',
          light:   '#f1f2f3',
          dark:    '#475069'
        },
        setting: {
          theme: {
            primary: 'indigo',
            accent: 'purple',
            warn: 'amber'
          },
          asideFolded: false
        },
        search: {
          content: '',
          show: false
        }
      }
      

      $scope.setTheme = function(theme){
        $scope.app.setting.theme = theme;
      }

      // save settings to local storage
      if ( angular.isDefined($localStorage.appSetting) ) {
        $scope.app.setting = $localStorage.appSetting;
      } else {
        $localStorage.appSetting = $scope.app.setting;
      }
      $scope.$watch('app.setting', function(){
        $localStorage.appSetting = $scope.app.setting;
      }, true);

      // angular translate
      // $scope.langs = {en:'English'};
      // $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      // $scope.setLang = function(langKey) {
      //   // set the current lang
      //   $scope.selectLang = $scope.langs[langKey];
      //   // You can change the language during runtime
      //   $translate.use(langKey);
      // };

      function isSmartDevice( $window ) {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      };

      $scope.getColor = function(color, hue){
        if(color == "bg-dark" || color == "bg-white") return $scope.app.color[ color.substr(3, color.length) ];
        return rgb2hex($mdColorPalette[color][hue]['value']);
      }

      //Function to convert hex format to a rgb color
      function rgb2hex(rgb) {
        return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
      }

      function hex(x) {
        var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","10","a","b","c","d","e","f"); 
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
      }

      $rootScope.$on('$stateChangeSuccess', openPage);

      function openPage() {
        $scope.app.search.content = '';
        $scope.app.search.show = false;
        $scope.closeAside();
      }

      $scope.goBack = function () {
        $window.history.back();
      }

      $scope.openAside = function () {
        $timeout(function() { $mdSidenav('aside').open(); });
      }
      $scope.closeAside = function () {
        $timeout(function() { $document.find('#aside').length && $mdSidenav('aside').close(); });
      }

    }
  ]);
