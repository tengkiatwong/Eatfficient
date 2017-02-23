
webApp.controller('HomepageController', ['$scope', '$uibModal', function($scope, $modal){
	$scope.items = ["Apple", "Orange", "Blueberry"];

	$scope.open = function(){
		$modal.open({
			templateUrl: 'modal-content.html',
			controller: ['$scope', '$uibModalInstance', 'items', function ($scope, $instance, items) {

				$scope.items = items;
				$scope.selected = {
					item: $scope.items[0]
				};

				$scope.ok = function () {
					$instance.close($scope.selected.item);
				};

				$scope.cancel = function () {
					$instance.dismiss('cancel');
				};
			}],
			size: 'sm',
			resolve: {
				items: function () {
					return $scope.items;
				}
			}
		}).result.then(function (selectedItem) {
			$scope.selected = {fruit: selectedItem}
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
	};
}]);

webApp.controller('InventoryController', ['$scope','$uibModal', function($scope,$modal){
	$scope.foo = 'bar';
    $scope.ingredientsList = [
        {ingredientId:1,category:"Appetizer",name:"French Fries",description:"Awesome Tasting Fries"},
        {ingredientId:2,category:"Main Dish",name:"Ribeye Steak",description:"Authentic,fresh cut"},
        {ingredientId:3,category:"Dessert",name:"Ice-cream",description:"Melts in your mouth"},
        {ingredientId:4,category:"Dessert",name:"Ice-cream4",description:"Melts in your mouth"},
        {ingredientId:5,category:"Dessert",name:"Ice-cream5",description:"Melts in your mouth"},
        {ingredientId:6,category:"Dessert",name:"Ice-cream6",description:"Melts in your mouth"},
        {ingredientId:7,category:"Dessert",name:"Ice-cream7",description:"Melts in your mouth"},
        {ingredientId:8,category:"Dessert",name:"Ice-cream8",description:"Melts in your mouth"},
    ]
    
    
    $scope.newIngredient = function(){
        console.log($scope.ingredientsList);
    }
    
    //get details and open modal functions
//    $scope.items = ["Apple", "Orange", "Blueberry123"];
    $scope.items = $scope.ingredientsList;
    $scope.getDetails = function(ingredientId){
        $modal.open({
                templateUrl: 'ingredientDetails.html',
                controller: ['EditIngredient','$scope', '$uibModalInstance','items', function (EditIngredient,$scope, $instance, items) {

                    $scope.items = items;
                    $scope.selectedItem;
                    for(i = 0; i<items.length; i++){
                        if(items[i].ingredientId == ingredientId){
                            $scope.selectedItem=items[i];
                        }
                    }
                    
                    
                    $scope.selected = {
                        item: $scope.items[0]
                    };

                    $scope.ok = function () {
                        console.log("editing");
                        EditIngredient.currentItem = $scope.selectedItem;
                        $instance.close($scope.selected.item);
                    };

                    $scope.cancel = function () {
                        $instance.dismiss('cancel');
                    };
                }],
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            }).result.then(function (selectedItem) {
                $scope.selected = {fruit: selectedItem}
            }, function () {
                //console.log('Modal dismissed at: ' + new Date());
            });
    }
    
}]);

webApp.controller('IngredientDetailController', ['EditIngredient', '$scope', function(EditIngredient, $scope) {
    EditIngredient.getOrders().then(function(response) {
        $scope.result = response.data;
    }, function(error) {
        console.log('opsssss' + error);
    });
    $scope.currentItem = EditIngredient.currentItem;
    console.log($scope.currentItem)
}]);

//Suppliers
webApp.controller('SuppliersController', ['$scope','$uibModal', function($scope,$modal){

	$scope.suppliers = [
        {supplierId:1,name:"Fresh Steak Gods",contactNumber:91239124,type:"Steak"},
        {supplierId:2,name:"VegeFarm",contactNumber:99999999,type:"Vegetables"}
    ];
    $scope.items = $scope.suppliers;
    $scope.getDetails = function(supplierId){
        $modal.open({
                templateUrl: 'supplierDetails.html',
                controller: ['SupplierService','$scope', '$uibModalInstance','items', function (SupplierService,$scope, $instance, items) {

                    $scope.items = items;
                    $scope.selectedItem;;
                    for(i = 0; i<items.length; i++){
                        if(items[i].supplierId == supplierId){
                            $scope.selectedItem=items[i];
                        }
                    }
                    $scope.selected = {
                        item: $scope.items[0]
                    };

                    $scope.ok = function () {
                        SupplierService.currentItem = $scope.selectedItem;
                        $instance.close($scope.selected.item);
                    };

                    $scope.cancel = function () {
                        $instance.dismiss('cancel');
                    };
                }],
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            }).result.then(function (selectedItem) {
                $scope.selected = {fruit: selectedItem}
            }, function () {
                //console.log('Modal dismissed at: ' + new Date());
            });
    }
}]);

webApp.controller('SuppliersEditController', ['SupplierService', '$scope', function(SupplierService, $scope) {
    console.log('--------Starting Supplier Edit---------');
    
    $scope.tes;
    SupplierService.getOrders().then(function(response) {
        $scope.result = response.data;
    }, function(error) {
        console.log('opsssss' + error);
    });
    $scope.currentItem = SupplierService.currentItem;
    $scope.supplier = {
        supplierId: $scope.currentItem.supplierId,
        name: $scope.currentItem.name,
        contactNumber: $scope.currentItem.contactNumber,
        type: $scope.currentItem.type
    }
    
    $scope.updateSupplier = function(){
        console.log($scope.supplier);
        // $http request send $scope.supplier
        //redirect
    }
}]);

webApp.controller('PoController', ['$scope', function($scope){
	$scope.foo1 = 'barzz';
}]);


webApp.controller('RecordController', ['$scope', function($scope){
	$scope.foo1 = 'barzz';
}]);

//Supplier Service
webApp.factory('SupplierService', function($http) {
   
    var o = {
        state: 0,
        orders: [],
        currentItem: {supplierId:2,name:"VegeFarm",contactNumber:99999999,type:"Vegetables"}
    };
    
    o.createOrder = function(){
        return $http({
            method: 'GET',
//            url: ' http://localhost:8080/TestEnterprise-war/webresources/ejb.TestingRestful/createIngredient? ',           //SIYI CHANGE THE URL HERE
            url:'http://52.230.24.231:8080/TestEnterprise-war/webresources/ejb.IngredientsRestful/createIngredientJSON',
            params: {param1: "KangKong"}
//            param1: "kangkong"
//            url: 'http://52.187.124.187:8080/OutletManagementSystem-war/api/member/submitForm',
//            message: {age:999,email:"CantSeeMe@Cena.com",name: "John Cena"}
//            url: 'http://52.187.124.187:8080/api/multiply/3/4'
//            url: 'https://openweathermap.org/current'
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
    
     o.getOrders = function(){
        return $http({
            method: 'GET',
//            url: ' http://localhost:8080/TestEnterprise-war/webresources/ejb.TestingRestful/createIngredient? ',           //SIYI CHANGE THE URL HERE
            url:'http://52.230.24.231:8080/TestEnterprise-war/webresources/ejb.IngredientsRestful/getAllIngredients',
//            params: {param1: "ULTRAMAN KangKong"}
//            param1: "kangkong"
//            url: 'http://52.187.124.187:8080/OutletManagementSystem-war/api/member/submitForm',
//            message: {age:999,email:"CantSeeMe@Cena.com",name: "John Cena"}
//            url: 'http://52.187.124.187:8080/api/multiply/3/4'
//            url: 'https://openweathermap.org/current'
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
     
     //remove order
     o.remove = function(order){
         o.orders.splice(o.orders.indexOf(order),1);
         console.log("spliced");
     } 
     
     o.newOrder = function(order){
         console.log(order);
         // return $http
     }
     
    return o;
})



//Ingredient Service
webApp.factory('EditIngredient', function($http) {
   
    var o = {
        orders: [],
        currentItem: {ingredientId:8,category:"Dessert",name:"Ice-cream8",description:"Melts in your mouth"}
    };
    
    o.createOrder = function(){
        return $http({
            method: 'GET',
//            url: ' http://localhost:8080/TestEnterprise-war/webresources/ejb.TestingRestful/createIngredient? ',           //SIYI CHANGE THE URL HERE
            url:'http://52.230.24.231:8080/TestEnterprise-war/webresources/ejb.IngredientsRestful/createIngredientJSON',
            params: {param1: "KangKong"}
//            param1: "kangkong"
//            url: 'http://52.187.124.187:8080/OutletManagementSystem-war/api/member/submitForm',
//            message: {age:999,email:"CantSeeMe@Cena.com",name: "John Cena"}
//            url: 'http://52.187.124.187:8080/api/multiply/3/4'
//            url: 'https://openweathermap.org/current'
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
    
     o.getOrders = function(){
        return $http({
            method: 'GET',
//            url: ' http://localhost:8080/TestEnterprise-war/webresources/ejb.TestingRestful/createIngredient? ',           //SIYI CHANGE THE URL HERE
            url:'http://52.230.24.231:8080/TestEnterprise-war/webresources/ejb.IngredientsRestful/getAllIngredients',
//            params: {param1: "ULTRAMAN KangKong"}
//            param1: "kangkong"
//            url: 'http://52.187.124.187:8080/OutletManagementSystem-war/api/member/submitForm',
//            message: {age:999,email:"CantSeeMe@Cena.com",name: "John Cena"}
//            url: 'http://52.187.124.187:8080/api/multiply/3/4'
//            url: 'https://openweathermap.org/current'
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
     
     //remove order
     o.remove = function(order){
         o.orders.splice(o.orders.indexOf(order),1);
         console.log("spliced");
     } 
     
     o.newOrder = function(order){
         console.log(order);
         // return $http
     }
     
    return o;
})




