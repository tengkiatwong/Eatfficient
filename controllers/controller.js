
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
webApp.controller('SuppliersController', ['$window','SupplierService','$scope','$uibModal', function($window,SupplierService,$scope,$modal){

//	$scope.suppliers = [
//        {supplierId:1,name:"Fresh Steak Gods",contactNumber:91239124,type:"Steak"},
//        {supplierId:2,name:"VegeFarm",contactNumber:99999999,type:"Vegetables"}
//    ];
    $scope.suppliers;
    SupplierService.getOrders().then(function(response) {
//        $scope.result = response.data;
        $scope.ingredientsList = response.data;
        $scope.items = response.data
        $scope.suppliers = response.data;
    }, function(error) {
        console.log('opsssss' + error);
    });
    $scope.items = $scope.suppliers;
    
    //modal
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
    
    //create New Supplier
    $scope.newSupplier = {};
    $scope.createSupplier = function(){
        console.log($scope.newSupplier);
        SupplierService.createSupplier($scope.newSupplier);
        //send to database
        $window.location.href = '#/suppliers';
        SupplierService.getOrders()
    }
    
}]);

webApp.controller('SuppliersEditController', ['$window','SERVER','SupplierService', '$scope', function($window,SERVER,SupplierService, $scope) {
//    SupplierService.getOrders().then(function(response) {
//        $scope.result = response.data;
//    }, function(error) {
//        console.log('opsssss' + error);
//    });
    $scope.currentItem = SupplierService.currentItem;
    $scope.newMaster = {};
   

    
    $scope.updateSupplier = function(){
         $scope.newMaster.SupplierName = $scope.currentItem.name;
        $scope.newMaster.ContactNumber = $scope.currentItem.contactNumber;
        $scope.newMaster.Type =  $scope.currentItem.type;
        $scope.newMaster.SupplierId = $scope.currentItem.supplierId;
        SupplierService.editSupplier($scope.newMaster);
        //redirect
        $window.location.href = '#/suppliers';
    }
    
    $scope.deleteSupplier = function(){
        $scope.deleteMessage = {};
        $scope.deleteMessage.ID = $scope.currentItem.supplierId;
        console.log($scope.deleteMessage);
        SupplierService.deleteSupplier($scope.deleteMessage);
        $window.location.href = '#/suppliers';
        RecordService.getOrders();
        location.reload();
    }
}]);

webApp.controller('PoController', ['$window','$uibModal','PoService','$scope', function($window,$modal,PoService,$scope){
	    $scope.purchaseOrders;
    
        PoService.getOrders().then(function(response) {
        $scope.purchaseOrders = PoService.purchaseOrders;
//        console.log($scope.purchaseOrders);
        $scope.result = response.data;
        $scope.ingredientsList = response.data;
        $scope.items = response.data
        $scope.suppliers = response.data;
        $scope.purchaseOrders = response.data;
            
         for(i=0;i<$scope.purchaseOrders.length;i++){
            var totalWorth = 0;
            var qArr = $scope.purchaseOrders[i].Quantity;
            var pArr = $scope.purchaseOrders[i].Prices;
            for(j=0;j<qArr.length;j++){
                totalWorth += parseFloat(qArr[j])*parseFloat(pArr[j]);
            }
            $scope.purchaseOrders[i].TotalWorth = parseFloat(totalWorth).toFixed(2);
        }
            
        }, function(error) {
            console.log('opsssss' + error);
        });
    
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
                    $scope.newArr = [];
//                    console.log($scope.priceArr);
                    for(j=0;j<$scope.priceArr.length;j++){
//                        console.log($scope.priceArr[j]);
                        $scope.newArr.push(parseFloat($scope.priceArr[j]));
                    }
                    $scope.priceArr = $scope.newArr;
                    $scope.selected = {
                        item: $scope.items[0]
                    };

                    $scope.ok = function () {
                        PoService.currentItem = $scope.selectedItem;
                        console.log($scope.master.Status);
                        //call the save function here
                    };

                    $scope.cancel = function () {
                        $instance.dismiss('cancel');
                    };
                            //edit Po
                    $scope.editPurchaseOrder = function(){
                        $scope.editObj = {};
                        $scope.editObj.ID = $scope.selectedItem.ID;
                        $scope.editObj.Status = $scope.master.Status;
                        console.log($scope.editObj);
                        PoService.editOrder($scope.editObj);
                        $instance.dismiss('cancel');
                        $window.location.href = '#/purchaseOrders';
                        PoService.getOrders();
                        location.reload();
                    }

                    //delete Po
                    $scope.deletePurchaseOrder = function(){
                        $scope.deleteObj = {};
                        $scope.deleteObj.ID = $scope.selectedItem.ID;
                        console.log($scope.deleteObj);
                        PoService.deleteOrder($scope.deleteObj);
                        $instance.dismiss('cancel');
                        $window.location.href = '#/purchaseOrders';
                        PoService.getOrders();
                        location.reload();
                    }
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
    
    //create New Purchase Order
    $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];
  
    $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo});
    };

    $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
    };
    $scope.currDate = 0;
    $scope.newIngArr = [];
    $scope.newQArr = [];
    $scope.newPArr = [];
    $scope.newPo = {}; //final sending object
    $scope.getDate = function(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            } 
            if(mm<10){
                mm='0'+mm;
            } 
            var today = dd+'/'+mm+'/'+yyyy;
            return today;
        }
    $scope.createPo= function(){
        for(i=0;i<$scope.choices.length;i++){
            $scope.newIngArr.push($scope.choices[i].ingredient);
            $scope.newQArr.push($scope.choices[i].quantity);
            $scope.newPArr.push($scope.choices[i].prices);
        }
        $scope.newPo.SupplierName;
        $scope.newPo.DateCreated = $scope.getDate();
        
        $scope.testObj = {};
        $scope.testObj.Ingredients = $scope.newIngArr;
        $scope.t3 = {};
        $scope.t2 = {};
        $scope.t2.Ingredients = $scope.newQArr;
        $scope.t3.Ingredients = $scope.newPArr;
        
        $scope.newPo.Ingredients = $scope.testObj.Ingredients;
        for(i=0;i<$scope.newPo.Ingredients.length;i++){
            $scope.newPo.Ingredients[i] = $scope.newPo.Ingredients[i].charAt(0).toUpperCase() + $scope.newPo.Ingredients[i].slice(1);
        }
        $scope.newPo.Quantity = $scope.t2.Ingredients;
        $scope.newPo.Prices = $scope.t3.Ingredients;
        $scope.newPo.Status = "pending";
        
        PoService.createOrder($scope.newPo);
        $scope.newIngArr = [];
        $scope.newQArr = [];
        $scope.newPArr = [];
        $window.location.href = '#/purchaseOrders';
        PoService.getOrders();
    }

    
}]);


webApp.controller('RecordController', ['$window','$uibModal','RecordService','$scope', function($window,$modal,RecordService,$scope){
	$scope.records;
    $scope.items;
    RecordService.getOrders().then(function(response) {
        $scope.records= response.data;
        $scope.result = response.data;
        $scope.items = response.data
        $scope.records.AMount = parseFloat($scope.records.AMount);
         for(i=0;i<$scope.records.length;i++){
            var totalWorth = 0;
            var qArr = $scope.records[i].Quantity;
            var pArr = $scope.records[i].Prices;
             $scope.records[i].AMount = parseFloat($scope.records[i].AMount)
        }
            
        }, function(error) {
            console.log('opsssss' + error);
        });
    
    
    $scope.getDetails = function(PoId){
        $modal.open({
                templateUrl: 'PoDetails.html',
                controller: ['RecordService','$scope', '$uibModalInstance','items', function (RecordService,$scope, $instance, items) {
                    $scope.items = items;
                    $scope.selectedItem;
                    $scope.master;
                    for(i = 0; i<items.length; i++){
                        if(items[i].ID == PoId){
                            $scope.selectedItem=items[i];
                            $scope.master = angular.copy($scope.selectedItem);
                        }
                    }
                    console.log($scope.master.Status);
                    $scope.ingredientArr = $scope.selectedItem.Ingredients;
                    $scope.quantityArr = $scope.selectedItem.Quantity;
                    console.log($scope.selectedItem);
                    $scope.selected = {
                        item: $scope.items[0]
                    };

                    $scope.ok = function () {
                        RecordService.currentItem = $scope.selectedItem;
                        console.log($scope.master.Status);
                        //call the save function here
                    };

                    $scope.cancel = function () {
                        $instance.dismiss('cancel');
                    };
                    
                    $scope.editRecord = function(){
                        $scope.editObj = {};
                        $scope.editObj.ID = $scope.selectedItem.ID;
                        $scope.editObj.Status = $scope.master.Status;
                        console.log($scope.editObj);
                        RecordService.editRecord($scope.editObj);
                        $instance.dismiss('cancel');
                        $window.location.href = '#/records';
                        RecordService.getOrders();
                        location.reload();
                    }
                    
                    $scope.deleteRecord = function(){
                        $scope.deleteObj = {};
                        $scope.deleteObj.ID = $scope.selectedItem.ID;
                        console.log("trying to delete");
                        console.log($scope.deleteObj);
                        RecordService.deleteRecord($scope.deleteObj);
                        $instance.dismiss('cancel');
                        $window.location.href = '#/records';
                        RecordService.getOrders();
                        location.reload();
                    }
                    
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
    
    //creating new Record
    $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];
  
    $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo});
    };

    $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
    };
    $scope.newIngArr = [];
    $scope.newQArr = [];
    $scope.newRecord = {}; //final sending object
    $scope.createRecord = function(){
        for(i=0;i<$scope.choices.length;i++){
            $scope.newIngArr.push($scope.choices[i].ingredient);
            $scope.newQArr.push($scope.choices[i].quantity);
        }
        //Ingredients array normalize(Capitalize first letter)
        $scope.newRecord.Ingredients = $scope.newIngArr;
        for(i=0;i<$scope.newRecord.Ingredients.length;i++){
            $scope.newRecord.Ingredients[i] = $scope.newRecord.Ingredients[i].charAt(0).toUpperCase() + $scope.newRecord.Ingredients[i].slice(1);
        }
        console.log($scope.newRecord.Ingredients);
        $scope.newRecord.Quantity = $scope.newQArr;
        $scope.newRecord.Status = "pending";
        RecordService.createOrder($scope.newRecord);
        $scope.newIngArr = [];
        $scope.newQArr = [];
        $window.location.href = '#/records';
        RecordService.getOrders();
    }

    
}]);

webApp.factory('RecordService',function($http,SERVER){
    var o = {
        currentItem:{},
        records: []
    }
    o.getOrders = function(){
        return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.recordRestful/getAllRecord',
//            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.purchaseOrderRestful/getPurchaseOrder',
//            params: {id:"501"}
        }).success(function(data){
//            console.log(data);
            for(j=0;j<data.length;j++){
                var temp = {};
                var current = data[j];
//                console.log(data[j]);
                temp.ID = current.ID;
                temp.DateCreated = current.DateCreated;
                temp.SupplierName = current.SupplierName;
                temp.Ingredients = [];
                temp.Quantity = [];
                for(i=0;i<current.Ingredients.length;i++){
                    temp.Ingredients.push(current.Ingredients[i]);
                    temp.Quantity.push(current.Quantity[i]);
                }
////                console.log("---POs--");
//                o.purchaseOrders.push(temp);
////                console.log(o.purchaseOrders);
            }
        });
    }
    
    o.createOrder = function(dataObj){
        return $http({
            method: 'POST',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.recordRestful/createRecordJson',
            params: dataObj,
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
        
    }
    
    o.editRecord = function(dataObj){
         return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.recordRestful/editRecord',
            params: dataObj,
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
     o.deleteRecord = function(dataObj){
         return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.recordRestful/deleteRecord',
            params: dataObj,
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
    
    return o;
    
    return o;
})

//Table Controller
webApp.controller('TableController', ['$window','SupplierService','$scope','$uibModal', function($window,SupplierService,$scope,$modal){

//	$scope.suppliers = [
//        {supplierId:1,name:"Fresh Steak Gods",contactNumber:91239124,type:"Steak"},
//        {supplierId:2,name:"VegeFarm",contactNumber:99999999,type:"Vegetables"}
//    ];
    $scope.suppliers;
    SupplierService.getOrders().then(function(response) {
//        $scope.result = response.data;
        $scope.ingredientsList = response.data;
        $scope.items = response.data
        $scope.suppliers = response.data;
    }, function(error) {
        console.log('opsssss' + error);
    });
    $scope.items = $scope.suppliers;
    
    //modal
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
    
    //create New Supplier
    $scope.newSupplier = {};
    $scope.createSupplier = function(){
        console.log($scope.newSupplier);
        SupplierService.createSupplier($scope.newSupplier);
        //send to database
        $window.location.href = '#/suppliers';
        SupplierService.getOrders()
    }
    
}]);

//Menu Controller
webApp.controller('MenuController', ['$window','SupplierService','$scope','$uibModal', function($window,SupplierService,$scope,$modal){

//	$scope.suppliers = [
//        {supplierId:1,name:"Fresh Steak Gods",contactNumber:91239124,type:"Steak"},
//        {supplierId:2,name:"VegeFarm",contactNumber:99999999,type:"Vegetables"}
//    ];
    $scope.suppliers;
    SupplierService.getOrders().then(function(response) {
//        $scope.result = response.data;
        $scope.ingredientsList = response.data;
        $scope.items = response.data
        $scope.suppliers = response.data;
    }, function(error) {
        console.log('opsssss' + error);
    });
    $scope.items = $scope.suppliers;
    
    //modal
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
    
    //create New Supplier
    $scope.newSupplier = {};
    $scope.createSupplier = function(){
        console.log($scope.newSupplier);
        SupplierService.createSupplier($scope.newSupplier);
        //send to database
        $window.location.href = '#/suppliers';
        SupplierService.getOrders()
    }
    
}]);

//Supplier Service
webApp.factory('SupplierService', function($http,SERVER) {
   
    var o = {
        state: 0,
        orders: [],
    };
    
    o.createSupplier = function(dataObj){
        console.log(dataObj);
        return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.SupplierRestful/createSupplier',
            params: dataObj,
        }).success(function(data){
            //console.log(data);
            o.orders = data;
        });
    }
    
     o.getOrders = function(){
        return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.SupplierRestful/getAllSuppliers',
//            params: {param1: "ULTRAMAN KangKong"}
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
     
     o.editSupplier = function(dataObj){
         console.log("---");
         console.log(dataObj);
        return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.SupplierRestful/editSupplier',
            params: dataObj
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
     
     o.deleteSupplier = function(dataObj){
         console.log("---");
         console.log(dataObj);
        return $http({
            method: 'GET',
            //change URL to delete
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.SupplierRestful/deleteSupplier',
            params: dataObj
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
     
    return o;
})

//Ingredient Service
webApp.factory('EditIngredient', function($http,SERVER) {
   
    var o = {
        orders: [],
        currentItem: {ingredientId:8,category:"Dessert",name:"Ice-cream8",description:"Melts in your mouth"}
    };
    
     o.getOrders = function(){
        console.log("getAllIngredients");
        return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.IngredientsRestful/getAllIngredients',
//            params: {name:"Supersonic one punch man"}
//            params: {id: 1001}
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
    //            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.PurchaseOrder/getPurchaseOrder',
    var o = {
        currentItem:{},
        purchaseOrders: []
    }
    o.getOrders = function(){
        console.log("getAllPurchaseOrders");
        return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.purchaseOrderRestful/GetAllPurchaseOrder',
//            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.purchaseOrderRestful/getPurchaseOrder',
//            params: {id:"501"}
        }).success(function(data){
//            console.log(data);
            for(j=0;j<data.length;j++){
                var temp = {};
                var current = data[j];
//                console.log(data[j]);
                temp.ID = current.ID;
                temp.DateCreated = current.DateCreated;
                temp.SupplierName = current.SupplierName;
                temp.Ingredients = [];
                temp.Prices = [];
                temp.Quantity = [];
                for(i=0;i<current.Ingredients.length;i++){
                    temp.Ingredients.push(current.Ingredients[i]);
                    temp.Prices.push(current.Prices[i]);
                    temp.Quantity.push(current.Quantity[i]);
                }
//                console.log("---POs--");
                o.purchaseOrders.push(temp);
//                console.log(o.purchaseOrders);
            }
        });
    }
    
    o.createOrder = function(dataObj){
        return $http({
            method: 'POST',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.purchaseOrderRestful/createPurchaseOrderJson',
            params: dataObj,
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
    
    o.editOrder = function(dataObj){
         return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.purchaseOrderRestful/editPurchaseOrder',
            params: dataObj,
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
     o.deleteOrder = function(dataObj){
         return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.purchaseOrderRestful/deletePurchaseOrder',
            params: dataObj,
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
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



