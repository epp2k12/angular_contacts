app = angular.module('MyApp',[]);
app.controller('AppCtrl',function($scope){
	$scope.toggleValue = true;
	$scope.mouseOverHandler = function () {
		window.alert('I AM ROLLED OVER!');
		$scope.toggleValue = !$scope.toggleValue;
	}



});

app.controller('DataCtrl',function($scope,$filter,jsonFilter) {
	$scope.plants = [
		{
			name: "Apple",
			type: "fruit"
		},
		{
			name: "Malunggay",
			type: "gulay"
		},
		{
			name: "almonds",
			type: "nuts"
		}
	];

	// this is a comment
	$scope.updateCSS = function() {
		if(!$scope.cssStyler) {
			return false;
		}

		return {
			'background-color': '#ff0000',
			'font-weight': 'bold',
			 color: '#ffffff',
			 'text-align': 'center'

		}
	}

	console.log( $filter('json')($scope.plants));

	console.log( jsonFilter($scope.plants));

});

app.filter('truncate',function() {

	return function(input,limit)  {
		return (input.length > 10)? input.substr(0,limit) + '...': input;
	}

});
