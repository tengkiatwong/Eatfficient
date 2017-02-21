
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
                controller: ['$scope', '$uibModalInstance', 'items', function ($scope, $instance, items) {

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
//                        $instance.close($scope.selected.item);
                        console.log("editing");
                        
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
                console.log('Modal dismissed at: ' + new Date());
            });
    }
    
}]);

webApp.controller('IngredientDetailController',['$scope',function($scope){
    $scope.testv = "zazazazaza";
}]);

webApp.controller('SuppliersController', ['$scope', function($scope){
	$scope.foo1 = 'barzz';
}]);


webApp.controller('PoController', ['$scope', function($scope){
	$scope.foo1 = 'barzz';
}]);


webApp.controller('RecordController', ['$scope', function($scope){
	$scope.foo1 = 'barzz';
}]);
