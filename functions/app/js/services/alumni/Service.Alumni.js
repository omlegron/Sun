var appService=angular.module('alumni',[]);

appService.factory('AlumniService',function($http){
    var alumniFactory = {};

    // alumniService.create();
    alumniFactory.create = function(sgnData){
      return $http.post('/api/almcreate', sgnData);
    };

    // alumniService.checkUsername();
    alumniFactory.checkUsername = function(sgnData, newUsername){
      return $http.post('/api/checkusername', sgnData, newUsername);
    };

    // alumniService.checkEmail();
	alumniFactory.checkEmail = function(sgnData){
      return $http.post('/api/checkemail', sgnData);
    };

    // //Superadmin.activeAccount(token);
    // superadminFactory.activeAccount = function(token){
    //   return $http.put('/api/activate/' + token);
    // };

    // // Superadmin.Get all 
    // superadminFactory.getSuperadmins = function() {
    //     return $http.get('/api/getallsuper/');
    // };
    // // Superadmin.Delete
    // superadminFactory.deleteSuperadmin = function(username){
    //     return $http.delete('/api/sadmindel/' + username);
    // };

    // // Superadmin.GetOne
    // superadminFactory.getSuperadmin = function(id){
    //     return $http.get('/api/sadminedit/' + id);
    // };

    // superadminFactory.editSuperadmin = function(id){
    //     return $http.put('/api/sadminedit/', id);
    // };

    // superadminFactory.resetPassword = function(id){
    //     return $http.put('/api/sadminreset/', id);
    // };
    return alumniFactory;
});
