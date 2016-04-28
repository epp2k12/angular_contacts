app = angular.module('MyApp',[]);
app.controller('MyAppCtrl',function($scope){
	$scope.Name = "KRAKATUWA"; 
	$scope.Chakra = "BAZOOOOKA";
	$scope.full_description = function() {
	 return "You are "+ $scope.Name + " \n chakra is - " + $scope.Chakra +".";
	}

});
