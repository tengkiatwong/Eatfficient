webApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/inventory', {
			templateUrl: 'views/inventory.html',
			controller: 'InventoryController'
		})
        
        .when('/inventory/:ingredient',{
            templateUrl: 'views/ingredientDetail.html',
            controller: 'IngredientDetailController'
        })
        
		.otherwise({
			templateUrl: 'views/homepage.html',
			controller: 'HomepageController'
		});
}]);