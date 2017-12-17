var appControllers=angular.module('appSadmin',[{name:"superadmin",files:["js/services/Service.superadmin.js"]}]);

var appControllers1=angular.module('appSadminEdit',[{name:"superadmin",files:["js/services/Service.superadmin.js"]}]);

var appControllers2=angular.module('appSadminEditPass',[{name:"superadmin",files:["js/services/Service.superadmin.js"]}]);

var appControllers3=angular.module('appSadminNew',[{name:"superadmin",files:["js/services/Service.superadmin.js"]}]);

appControllers.controller('SadminController',function($rootScope,SuperadminService, toaster, $state, $http, $scope, $location, $modal, DTOptionsBuilder, DTColumnDefBuilder){
	var app = this;
	app.errorMsg = false;
	// app.limit = 5;
	
	$scope.go = function go(url){
		$location.path(url);
	};

	function getSuperadmins() {
		SuperadminService.getSuperadmins().then(function(data){
			if (data.data.success){
				app.superadmins = data.data.superadmins;
				app.dtOptions = DTOptionsBuilder.newOptions()
				// .withLightColumnFilter({
		  //           '0' : {}
		  //       })
				.withOption('scrollY', '320px')
        		.withOption('scrollX', true)
				.withPaginationType('full_numbers');
					app.dtColumnDefs = [
				        DTColumnDefBuilder.newColumnDef(0),
				        DTColumnDefBuilder.newColumnDef(1),
				        DTColumnDefBuilder.newColumnDef(2),
				        DTColumnDefBuilder.newColumnDef(3),
				        DTColumnDefBuilder.newColumnDef(4),
				        DTColumnDefBuilder.newColumnDef(5),
				        DTColumnDefBuilder.newColumnDef(6),
				        DTColumnDefBuilder.newColumnDef(7).notSortable()
		    ];
				console.log('success', app.superadmins);
			}else{
				toaster.pop('error',data.data.message);    
            	setTimeout(4000);
				console.log('errorMsg');
				// app.errorMsg = data.data.message;
			}
		});
	};

	getSuperadmins();


	// app.showMore = function(number){
	// 	app.limit = undefined;
	// 	if (number > 0 ){
	// 		app.limit = number;
	// 	}
	// 	// }else{
	// 	// 	app.limit = false;
	// 	// 	// toaster.pop('danger','Check Your Input!!!'); 
	// 	// }
	// };

	app.deleteSuperadmin = function(username){
		SuperadminService.deleteSuperadmin(username).then(function(data){
			if (data.data.success) {
				getSuperadmins();
				toaster.pop('success','Delete Superadmin Successfuly!!!'); 	
			}else{
				// console.log('errorMsg');
				toaster.pop('error','Delete Superadmin Was failed!!!'); 	
			}
		});
	};

	$scope.showData=function(_id){
		$scope.lookData=$modal({scope:$scope,show:true,controller:'SadminController',controllerAs:'SadminController1',
			templateUrl:'templates/views/AccSadmin.read.html'
		});

		SuperadminService.getSuperadmin(_id).then(function(cek){
			if (cek.data.success){
				$scope.superadmin = cek.data.superadmin;
			// $scope.truId = cek.data.superadmin._id;
			app.currentSuperadmin = cek.data.superadmin._id;
			// console.log(app.currentSuperadmin);
			// console.log(cek.data.superadmin.nama);

		}else{
			// app.errorMsg = cek.data.message;
			toaster.pop('error',cek.data.message);    
			setTimeout(4000);
		}
	});
	};

});

appControllers1.controller('SadminEditController',function(SuperadminService, toaster, $state, $http, $scope, $location, $stateParams){
	console.log('CEK Controller');


	$scope.go = function go(url){
		$location.path(url);
	};
	var app = this;

	SuperadminService.getSuperadmin($stateParams.id).then(function(cek){
		if (cek.data.success){
			$scope.newUsername = cek.data.superadmin.username;
			$scope.newEmail = cek.data.superadmin.email;
			$scope.newPassword = cek.data.superadmin.password;
			$scope.newNama = cek.data.superadmin.nama;
			$scope.truId = cek.data.superadmin._id;
			app.currentSuperadmin = cek.data.superadmin._id;
		}else{
			// app.errorMsg = cek.data.message;
			toaster.pop('error',cek.data.message);    
			setTimeout(4000);
		}
	});

	

	app.updateSadmin = function(newUsername, newEmail, newNama, valid){
	    // app.errorMsg = false;
	    var superadminObject = {};

	    if (valid){
	    	superadminObject._id = app.currentSuperadmin;
	    	superadminObject.username = $scope.newUsername;
	    	superadminObject.email 	  = $scope.newEmail;
	    	superadminObject.nama 	  = $scope.newNama;
	    	SuperadminService.editSuperadmin(superadminObject).then(function(data){
	    		if (data.data.success){
					// app.successMsg = data.data.message;
					console.log(data.data.success);
					console.log(data.data.message);
					toaster.pop('success',data.data.message); 
					setTimeout(function(){$state.go('hommy.sadmin', {reload: true});},3000);
				}else{
					toaster.pop('error',data.data.message);    
					setTimeout(4000);
		            // app.errorMsg = data.data.message;
		        }
		    });
	    }else{
	    	toaster.pop('error','Please Ensure Form Is Filled Out Properly');    
	    	setTimeout(4000);
			// app.errorMsg = 'Please Ensure Form Is Filled Out Properly';
		}
	};

});	

appControllers2.controller('SadminEditPassController',function(SuperadminService, toaster, $state, $http, $scope, $location, $stateParams){
	console.log('CEK Controller');


	$scope.go = function go(url){
		$location.path(url);
	};
	var app = this;


	SuperadminService.getSuperadmin($stateParams.id).then(function(cek){
		if (cek.data.success){
			$scope.firstPassword = cek.data.superadmin.password;
			$scope.truId = cek.data.superadmin._id;
			app.currentSuperadmin = cek.data.superadmin._id;
			console.log(app.currentSuperadmin);
		}else{
			// app.errorMsg = cek.data.message;
			toaster.pop('error',cek.data.message);    
			setTimeout(4000);
		}
	});

	app.updatePass = function(firstPassword, valid){
	    // app.errorMsg = false;
	    var superadminObject = {};

	    if (valid){
	    	superadminObject._id = app.currentSuperadmin;
	    	superadminObject.password = $scope.firstPassword;
	    	SuperadminService.resetPassword(superadminObject).then(function(data){
	    		if (data.data.success){
					// app.successMsg = data.data.message;
					console.log(data.data.success);
					console.log(data.data.message);
					toaster.pop('success',data.data.message);    
					setTimeout(function(){$state.go('hommy.sadmin');},3000);
				}else{
					toaster.pop('error',data.data.message);    
					setTimeout(4000);
		            // app.errorMsg = data.data.message;
		        }
		    });
	    }else{
	    	toaster.pop('error','Please Ensure Form Is Filled Out Properly');    
	    	setTimeout(4000);
			// app.errorMsg = 'Please Ensure Form Is Filled Out Properly';
		}
	};

});	

appControllers3.controller('SadminNewController',function(SuperadminService, toaster, $state, $http, $scope, $location, $stateParams){
	console.log('CEK Controller');
	$scope.go = function go(url){
		$location.path(url);
	};
	var app = this;

	app.signup = function(sgnData){
      app.errorMsg = false;
       console.log('Daata',this.sgnData);

       SuperadminService.create(app.sgnData).then(function(data){
          console.log(data.data.success);
          console.log(data.data.message);
          if (data.data.success) {
            toaster.pop('success','Superadmin Succesed Created, PLEASE CHECK YOUR EMAIL FOR ACTIVATION LINK');    
            setTimeout(function(){$state.go('hommy.sadmin');},2000) ;
          }else{
            // app.errorMsg = data.data.message;
            toaster.pop('error', data.data.message);    
          }
       });
    };

    app.checkUsername = function(sgnData){
        app.checkingUsername = true;
        app.usernameMsg      = false;
        app.usernameInvalid  = false;

        SuperadminService.checkUsername(app.sgnData).then(function(cek){
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

        SuperadminService.checkEmail(app.sgnData).then(function(cek){
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