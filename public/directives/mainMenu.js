app.directive('mainMenu', function(){
	return {
		restrict: 'E',
		templateUrl: 'directives/main-menu.html',
		replace: true,
		transclude: true,
	}
})