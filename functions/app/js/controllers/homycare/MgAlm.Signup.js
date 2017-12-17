var appControllers  = angular.module('MgSignup',[
{
  name:"alumni",
  files:["js/services/alumni/Service.alumni.js"]
}]);

appControllers.controller('MgSignupController',function(AlumniService,$scope,$state, toaster, GeoCoder, NgMap){
    var app = this;
    console.log('coba controller');

    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyC01hCsQ46I133UAz8pdjjRXlZ-o5DT1pY";
    $scope.mapcenter = "Bandung";
    // NgMap.getGeoLocation($scope.mapcenter);

    NgMap.getMap("map").then(function (map) {
         NgMap.getGeoLocation($scope.mapcenter)
         .then(function (latlng) {
                map.setCenter(latlng);
         });
    });

    $scope.changeAddress = function changeAddress(newaddress){
        console.log('new Address: ', newaddress)
        GeoCoder.geocode({ address: ''+ newaddress})
        .then(function (result) {
            console.log('map location: ',result[0]);
            console.log('map location2: ',result[1]);
            // $scope.mapcenter = result[0].geometry.location;
            // console.log('map location2: ',$scope.mapcenter);
            $scope.MgSignup.sgnData.lat = result[0].geometry.location.lat();
            $scope.MgSignup.sgnData.lng = result[0].geometry.location.lng();
        });
    }

    $scope.onDragEnd = function onDragEnd($event, ctrl) {
        console.log("drag end", $event.position.lat(), $event.position.lng());
        $scope.MgSignup.sgnData.lat = $event.position.lat();
        $scope.MgSignup.sgnData.lng = $event.position.lng();
    };

    $scope.onMapReady = function onMapReady(ctrl){
        $scope.MgSignup.markerPosition = new ctrl.api.LatLng(54.63775,38.16715)
    };

    app.signup = function(sgnData){
      app.errorMsg = false;
       console.log('Daata',app.sgnData);

       AlumniService.create(app.sgnData).then(function(data){
          console.log(data.data.success);
          console.log(data.data.message);
          if (data.data.success) {
            toaster.pop('success',data.data.message);    
            setTimeout(function(){$state.go('MgLogin');},2000) ;
          }else{
            toaster.pop('error',data.data.message);    
          }
       });
    };

    app.checkUsername = function(sgnData){
        app.checkingUsername = true;
        app.usernameMsg      = false;
        app.usernameInvalid  = false;

        AlumniService.checkUsername(app.sgnData).then(function(cek){
            if (cek.data.success){
                app.checkingUsername  = false;
                app.usernameInvalid   = false;
                app.usernameMsg       = cek.data.message;
            }else{
                app.checkingUsername  = false;
                app.usernameInvalid   = true;
                app.usernameMsg       = cek.data.message;
            }
        });
    };

    app.checkEmail = function(sgnData){
        app.checkingEmail = true;
        app.emailMsg      = false;
        app.emailInvalid  = false;

        AlumniService.checkEmail(app.sgnData).then(function(cek){
            if (cek.data.success){
                app.checkingEmail  = false;
                app.emailInvalid   = false;
                app.emailMsg       = cek.data.message;
            }else{
                app.checkingEmail  = false;
                app.emailInvalid   = true;
                app.emailMsg       = cek.data.message;
            }
        });
    };
});
