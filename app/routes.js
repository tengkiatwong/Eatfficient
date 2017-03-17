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
        .when('/suppliersCreate',{
            templateUrl: 'views/supplierCreate.html',
            controller: 'SuppliersController'
        })
    
        //purchaseOrder module
        .when('/purchaseOrders',{
            templateUrl: 'views/purchaseOrders.html',
            controller: 'PoController'
        })
        .when('/purchaseOrders/create',{
            templateUrl: 'views/createPurchaseOrder.html',
            controller: 'PoController'
        })
        
        //Record Module
         .when('/records',{
            templateUrl: 'views/records.html',
            controller: 'RecordController'
        })
        .when('/records/create',{
            templateUrl: 'views/createRecord.html',
            controller: 'RecordController'
        })
        
        //Menu Module
        .when('/menu',{
            templateUrl: 'views/menu.html',
            controller: 'MenuController'
        })
        .when('/menu/create',{
            templateUrl: 'views/menuCreate.html',
            controller: 'MenuCreateController'
        })
        .when('/menu/edit',{
            templateUrl: 'views/menuEdit.html',
            controller: 'MenuEditController'
        })
        .when('/menu/preview',{
            templateUrl: 'views/menuPreview.html',
            controller: 'MenuPreviewController'
        })
          
        //Table Module
        .when('/table',{
            templateUrl: 'views/table.html',
            controller: 'TableController'
        })
        .when('/table/create',{
            templateUrl: 'views/tableCreate.html',
            controller: 'TableCreateController'
        })
        .when('/table/:arrID',{
            templateUrl: 'views/tableEdit.html',
            controller: 'TableEditController'
        })
        
    
        //otherwise
		.otherwise({
			templateUrl: 'views/homepage.html',
			controller: 'HomepageController'
		});
}]);