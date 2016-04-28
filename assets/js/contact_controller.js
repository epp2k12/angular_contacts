
app=angular.module('contactApp',['ngRoute','ngSanitize']);
app.value('demoService', 'abc123');
// other format 
// app.factory('anotherService', function anotherServiceFactory(demoService) {
// 	return demoService;
// });
app.factory('anotherService',['demoService',function(demoService) {
	return demoService;
}])
app.factory('serviceConnect',function() {
	return {
		connect : function() {
			return "YOU ARE CONNECTED!";
		}
	}
})

app.directive('gravatar',function() {
	return {
		restrict: 'AE',
		template: '<img ng-src="{{img}}" class="{{class}}" >',
		link:function(scope, elem, attrs) {
			var size = (attrs.size) ? attrs.size : 64;
			scope.img = 'http://gravatar.com/avatar/'+ CryptoJS.MD5(attrs.email)+'?s='+size;
			scope.class = attrs.class
		}
	}

});

app.directive('editable',function() {
	return {
		restrict: 'AE',
		templateUrl: 'assets/partials/editable.html',
		scope: {
			value: '=editable',
			field: '@fieldType'

		},
		controller: function($scope) {
			$scope.editor = {
				showing: false,
				value: $scope.value
			}
			$scope.toggleEditor = function() {
				$scope.editor.showing = !$scope.editor.showing;
			}
			$scope.save = function() {
				$scope.value = $scope.editor.value;
				$scope.toggleEditor();
			}
		}
	};

});

app.factory('contacts',function() {

	var contacts = [
	{
		name: 'Kigol Radford',
		phone: '0123456789',
		address: '123, Some Street\nLeicester\nLE1 2AB',
		email: 'erwin.presbitero@gmail.com',
		website: 'stephenradford.me',
		notes: 'Some notes about the contact Kigol.'
	},
	{

		name: 'Kigwa Radford',
		phone: '0123456789',
		address: '123, Some Street\nLeicester\nLE1 2AB',
		email: 'epp2k12@gmail.com',
		website: 'stephenradford.me',
		notes: 'Some notes about the contact Kigwa.'
	},
	{
		name: 'Kagerts Radford',
		phone: '0123456789',
		address: '123, Some Street\nLeicester\nLE1 2AB',
		email: 'erwinp@casinoespanol.ph',
		website: 'stephenradford.me',
		notes: 'Some notes about the contact Kagerts.'
	},
	{
		name: 'Kagaw Radford',
		phone: '0123456789',
		address: '123, Some Street\nLeicester\nLE1 2AB',
		email: 'erwin_presbitero@yahoo.com',
		website: 'stephenradford.me',
		notes: 'Some notes about the contact Kagaw.'
	}

	];

	return {
		get: function() {
			return contacts;
		},
		find: function(index) {
			return contacts[index];
		},
		create: function(contact) {
			contacts.push(contact);
		}
	}

});
app.controller('indexCtrl',function($scope, demoService, anotherService, serviceConnect, contacts) {

	console.log("demo value inside indexCtrl " + demoService);
	console.log("demo value inside indexCtrl using Factory " + anotherService);
	console.log("demo value inside indexCtrl using Factory with Connect " + serviceConnect.connect());

	$scope.contacts = contacts.get();
		
});
app.controller('addCtrl',function($scope, demoService, contacts) {

	console.log("demo value inside addCtrl " + demoService);
	$scope.submit = function() {
		contacts.create($scope.contact);
		$scope.contact = null;
		$scope.added = true;
	}
	$scope.contacts = contacts.get();
		
});
app.controller('viewCtrl',function($scope) {
		
});
app.controller('contactCtrl',function($scope, $routeParams, contacts ) {
		console.log($routeParams);
		$scope.contact = contacts.find($routeParams.id);

});


app.controller('appCtrl',function($scope, $location) {
// this is the controller for the search button which is accessible from anywhere in our app

	$scope.startSearch = function() {
		$location.path('/');
	}

	$scope.pageClass = function(path) {
		return (path == $location.path()) ? 'active' : '';
	}

	$scope.baseURL = function() {
		return $location.$$absUrl;
	}

	$scope.getBaseURL = $location.$$absUrl;

	console.log("------------------- im inside the appCtrl");
	console.log($scope.baseURL);
});


/*
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/',{
		controller: 'indexCtrl',
		templateUrl: 'assets/partials/index.html'
	})
	.when('/add-contact',{
		controller: 'addCtrl',
		templateUrl: 'assets/partials/add.html'
	})
	.when('/view-contact',{
		controller: 'viewCtrl',
		templateUrl: 'assets/partials/view.html'
	})
	.when( '/contact/:id', {
		controller: 'contactCtrl',
		templateUrl: 'assets/partials/contact.html'
	})
	.otherwise({
		redirectTo: '/'
	});


}]); 
*/

app.config(function($routeProvider,$locationProvider) {

	$routeProvider.when('/',{
		controller: 'indexCtrl',
		templateUrl: 'assets/partials/index.html'
	})
	.when('/add-contact',{
		controller: 'addCtrl',
		templateUrl: 'assets/partials/add.html'
	})
	.when('/view-contact',{
		controller: 'viewCtrl',
		templateUrl: 'assets/partials/view.html'
	})
	.when( '/contact/:id', {
		controller: 'contactCtrl',
		templateUrl: 'assets/partials/contact.html'
	})
	.otherwise({
		redirectTo: '/'
	});


	// $locationProvider.html5Mode(true);
});


app.filter('paragraph', function() {
	return function(input) {
		return (input) ? input.replace(/\n/g,'<br />') : input;
	};

});
