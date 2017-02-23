webApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
        
        //inventory module
		.when('/inventory', {
			templateUrl: 'views/inventory.html',
			controller: 'InventoryController'
		})
        
        .when('/inventory/:ingredient',{
            templateUrl: 'views/ingredientDetail.html',
            controller: 'IngredientDetailController'
        })
    
        //suppliers module
        .when('/suppliers',{
            templateUrl: 'views/suppliers.html',
            controller: 'SuppliersController'
        })
        // Supplier Edit
        .when('/suppliers/:supplier',{
            templateUrl: 'views/supplierEdit.html',
            controller: 'SuppliersEditController'
        })
        
    
    
    
        //otherwise
		.otherwise({
			templateUrl: 'views/homepage.html',
			controller: 'HomepageController'
		});
}]);