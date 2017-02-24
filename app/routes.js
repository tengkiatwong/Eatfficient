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
        .when('/suppliers/:supplier',{
            templateUrl: 'views/supplierEdit.html',
            controller: 'SuppliersEditController'
        })
    
        //purchaseOrder module
        .when('/purchaseOrders',{
            templateUrl: 'views/purchaseOrders.html',
            controller: 'PoController'
        })
        
        //Record Module
    
    
    
        //otherwise
		.otherwise({
			templateUrl: 'views/homepage.html',
			controller: 'HomepageController'
		});
}]);