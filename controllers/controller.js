
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

webApp.controller('InventoryController', ['EditIngredient','$scope','$uibModal', function(EditIngredient,$scope,$modal){
	$scope.foo = 'bar';
//    $scope.ingredientsList = [
//        {ingredientId:1,category:"Appetizer",name:"French Fries",description:"Awesome Tasting Fries"},
//        {ingredientId:2,category:"Main Dish",name:"Ribeye Steak",description:"Authentic,fresh cut"},
//        {ingredientId:3,category:"Dessert",name:"Ice-cream",description:"Melts in your mouth"},
//        {ingredientId:4,category:"Dessert",name:"Ice-cream4",description:"Melts in your mouth"},
//        {ingredientId:5,category:"Dessert",name:"Ice-cream5",description:"Melts in your mouth"},
//        {ingredientId:6,category:"Dessert",name:"Ice-cream6",description:"Melts in your mouth"},
//        {ingredientId:7,category:"Dessert",name:"Ice-cream7",description:"Melts in your mouth"},
//        {ingredientId:8,category:"Dessert",name:"Ice-cream8",description:"Melts in your mouth"},
//    ]
    
    
    $scope.newIngredient = function(){
        console.log($scope.ingredientsList);
    }
    $scope.items;
    //get details and open modal functions
    EditIngredient.getOrders().then(function(response) {
//        $scope.result = response.data;
        $scope.ingredientsList = response.data;
        $scope.items = response.data
    }, function(error) {
        console.log('opsssss' + error);
    });
    $scope.items = $scope.result;
    $scope.getDetails = function(ID){
        $modal.open({
                templateUrl: 'ingredientDetails.html',
                controller: ['EditIngredient','$scope', '$uibModalInstance','items', function (EditIngredient,$scope, $instance, items) {

                    $scope.items = items;
                    $scope.selectedItem;
                    for(i = 0; i<items.length; i++){
                        if(items[i].ID == ID){
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
    $scope.currentItem = EditIngredient.currentItem;
    $scope.master = angular.copy($scope.currentItem);
    console.log($scope.master);
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

webApp.controller('SuppliersEditController', ['SERVER','SupplierService', '$scope', function(SERVER,SupplierService, $scope) {
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

webApp.controller('PoController', ['$uibModal','PoService','$scope', function($modal,PoService,$scope){
	$scope.purchaseOrders = PoService.purchaseOrders;
    for(i=0;i<$scope.purchaseOrders.length;i++){
        var totalWorth = 0;
        var qArr = $scope.purchaseOrders[i].Quantity;
        var pArr = $scope.purchaseOrders[i].Prices;
        for(j=0;j<qArr.length;j++){
            totalWorth += parseFloat(qArr[j])*parseFloat(pArr[j]);
        }
        $scope.purchaseOrders[i].TotalWorth = parseFloat(totalWorth).toFixed(2);
    }
    
    $scope.items = $scope.purchaseOrders;
    $scope.getDetails = function(PoId){
        $modal.open({
                templateUrl: 'PoDetails.html',
                controller: ['SupplierService','$scope', '$uibModalInstance','items', function (SupplierService,$scope, $instance, items) {

                    $scope.items = items;
                    $scope.selectedItem;
                    $scope.master;
                    for(i = 0; i<items.length; i++){
                        if(items[i].ID == PoId){
                            $scope.selectedItem=items[i];
                            $scope.master = angular.copy($scope.selectedItem);
                        }
                    }
                    $scope.ingredientArr = $scope.selectedItem.Ingredients;
                    $scope.quantityArr = $scope.selectedItem.Quantity;
                    $scope.priceArr = $scope.selectedItem.Prices;
                    $scope.selected = {
                        item: $scope.items[0]
                    };

                    $scope.ok = function () {
                        PoService.currentItem = $scope.selectedItem;
                        console.log($scope.master.Status);
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

//webApp.controller('PoEditController',['SERVER','PoService','$scope',function(SERVER,PoService,$scope){
//    $scope.currentItem = PoService.currentItem;
//    $scope.master = angular.copy($scope.currentItem);
//}]);

webApp.controller('RecordController', ['$scope', function($scope){
	$scope.foo1 = 'barzz';
}]);

//Supplier Service
webApp.factory('SupplierService', function($http,SERVER) {
   
    var o = {
        state: 0,
        orders: [],
        currentItem: {supplierId:2,name:"VegeFarm",contactNumber:99999999,type:"Vegetables"}
    };
    
    o.createOrder = function(){
        return $http({
            method: 'GET',
//            url: ' http://localhost:8080/TestEnterprise-war/webresources/ejb.TestingRestful/createIngredient? ',           //SIYI CHANGE THE URL HERE
            url:SERVER.url+'http://52.230.24.231:8080/TestEnterprise-war/webresources/ejb.IngredientsRestful/createIngredientJSON',
            params: {param1: "KangKong"}
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
    
     o.getOrders = function(){
        return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.IngredientsRestful/getAllIngredients',
//            params: {param1: "ULTRAMAN KangKong"}
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
webApp.factory('EditIngredient', function($http,SERVER) {
   
    var o = {
        orders: [],
        currentItem: {ingredientId:8,category:"Dessert",name:"Ice-cream8",description:"Melts in your mouth"}
    };
    
    o.createOrder = function(){
        return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.IngredientsRestful/createIngredientJSON',
            params: {param1: "KangKong"}
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
    
     o.getOrders = function(){
        return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.IngredientsRestful/getAllIngredients',
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

//PurchaseOrder Service
webApp.factory('PoService',function($http,SERVER){
    var o = {
        currentItem:{},
        purchaseOrders: [
            {
                ID: 25,SupplierName:"VegeFarm Pte. Ltd.",DateCreated:"28/02/2017", Status:"pending",
                Ingredients:["Ponyo", "KangKong", "Cheddar"],Quantity: [2,5,10],Prices:[5.50,4.20,10.51]
            },
            {
                ID: 26,SupplierName:"VegeFarm Pte. Ltd.",DateCreated:"28/02/2017", Status:"cancelled",
                Ingredients:["Ponyo", "KangKong", "Cheddar"],Quantity: [2,5,10],Prices:[15.52,42.13,10.29]
            },
            {
                ID: 27,SupplierName:"VegeFarm Pte. Ltd.",DateCreated:"28/02/2017", Status:"fulfilled",
                Ingredients:["Ponyo", "KangKong", "Cheddar"],Quantity: [2,5,10],Prices:[15.52,42.13,10.29]
            }
        ]
    }
    
    return o;
})



//SERVER url
webApp.factory('SERVER',function(){
    var o = {
        url: 'http://52.187.179.134:8080'
    }
    return o;
})



