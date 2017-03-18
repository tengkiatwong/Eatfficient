
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
    $scope.sortType     = 'ID'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
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
    $scope.sortType     = 'ID'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
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
        SupplierService.deleteSupplier($scope.deleteMessage);
//        RecordService.getOrders();
        $window.location.href = '#/suppliers';
        location.reload();
    }
}]);

webApp.controller('PoController', ['$window','$uibModal','PoService','$scope', function($window,$modal,PoService,$scope){
        $scope.sortType     = 'ID'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
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
    this.myDate = new Date();
    this.isOpen = false;
    $scope.sortType     = 'ID'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
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
        $scope.newRecord.PurchaseDate;
        for(i=0;i<$scope.choices.length;i++){
            $scope.newIngArr.push($scope.choices[i].ingredient);
            $scope.newQArr.push($scope.choices[i].quantity);
        }
        //Ingredients array normalize(Capitalize first letter)
        $scope.newRecord.Ingredients = $scope.newIngArr;
        for(i=0;i<$scope.newRecord.Ingredients.length;i++){
            $scope.newRecord.Ingredients[i] = $scope.newRecord.Ingredients[i].charAt(0).toUpperCase() + $scope.newRecord.Ingredients[i].slice(1);
        }
        $scope.newRecord.Quantity = $scope.newQArr;
        $scope.newRecord.Status = "pending";
         $scope.newRecord.PurchaseDate = $('#datepicker').val();
        console.log($scope.newRecord.PurchaseDate);
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
webApp.controller('TableController', ['$route','TableService','$window','$scope','$uibModal', function($route,TableService,$window,$scope,$modal){
    $scope.arrs = TableService.data;
    
    $scope.activate = function(ID){
        console.log(ID);
    }
    
    $scope.up = function(ID){
        for(i=0;i<$scope.arrs.length;i++){
            //console.log($scope.arrs[i].ID);
            if($scope.arrs[i].ID==ID){
                TableService.currentItem = $scope.arrs[i];
            }
        }
    }
//    console.log($stateParams);
}]);

webApp.controller('TableEditController', ['$route','TableService','$window','$scope','$uibModal', function($route,TableService,$window,$scope,$modal){
    $scope.currentItem = TableService.currentItem;
//    console.log($scope.currentItem);
    $scope.draggableObjects = [{name:' '}];
    $scope.droppedObjects1 = [];

    $scope.arr = [];
    $scope.rows = TableService.create.rows; //height (how many arrays)
    $scope.cols = TableService.create.cols; //width (size of array[])
    var dataSet = $scope.currentItem.Arr;
    for(i=0;i<dataSet.length;i++){
        var curr = [];
        for(j=0;j<dataSet[0].length;j++){
            if(dataSet[i][j]==true){
                curr[j] = {
                    position:i+","+j,
                    items : [{name:' ',host:[i,j]}],
//                    host: [i,j]
                };
            }
            else{
                curr[j] = {
                    position:i+","+j,
                    items : []
                };
            }
        }
        $scope.arr.push(curr);
    }
//    console.log($scope.arr);

    $scope.resize = function(){
        if(TableService.rows==$scope.rows && TableService.cols==$scope.cols)
            return;

        if($scope.rows>10 || $scope.cols>20){
            alert("size is too large!");
            return;
        }

        TableService.create.rows = $scope.rows;
        TableService.create.cols = $scope.cols;
        $route.reload();
    }
        
    
    $scope.onDropComplete=function(data,evt){;
        //drop new table
        var targetID = $(evt.event.target).attr("targetID");
        targetID = targetID.substring(0,targetID.length);
        var coordinate = targetID.split(",");
        coordinate[0] = parseInt(coordinate[0]);
        coordinate[1] = parseInt(coordinate[1]);
        var current = $scope.arr[coordinate[0]][coordinate[1]];
        var newObj = angular.copy(data);
        newObj.host = coordinate;
        current.items = [];
        current.items.push(newObj);

    }

    $scope.onDragSuccess1=function(data,evt){
        var targetID = $(evt.event.target).attr("targetID");
    }
    $scope.pro = function(data,evt){
        console.log(data);
        var coord = data.host;
        console.log(coord);
        if(data.host == null)
            return;
        var current = $scope.arr[coord[0]][coord[1]];
        current.items = [];
    }

    $scope.saveLayout = function(){
        var arr = $scope.arr;
        var masterArr = [];
        var count = 0;
        for(i=0;i<arr.length;i++){
            var curr = [];
            for(j=0;j<arr[0].length;j++){
                if(arr[i][j].items.length==1){
                    curr.push(true);
                    count+=1;
                }

                else
                    curr.push(false);
            }
            masterArr.push(curr);
        }
        var master1  = {};
        master1.ID = $scope.currentItem.ID;
        master1.Arr = masterArr;
        master1.Name = $scope.currentItem.Name;
        master1.Active = false;
        master1.Tables = count;
        console.log(master1);
    }
    
}]);

webApp.controller('TableCreateController', ['$route','TableService','$window','$scope','$uibModal', function($route,TableService,$window,$scope,$modal){
        $scope.draggableObjects = [{name:' '}];
        $scope.droppedObjects1 = [];
        $scope.Name = "";
        $scope.arr = [];
        $scope.rows = TableService.create.rows; //height (how many arrays)
        $scope.cols = TableService.create.cols; //width (size of array[])
    
        for(i=0;i<$scope.rows;i++){
            var curr = [];
            for(j=0;j<$scope.cols;j++){
                curr[j] = {
                    position:i+","+j,
                    items : []
                };
            }
            $scope.arr.push(curr);
        }
        console.log($scope.arr);
        
        $scope.resize = function(){
            console
            if(TableService.rows==$scope.rows && TableService.cols==$scope.cols)
                return;
            
            if($scope.rows>14 || $scope.cols>27){
                $scope.rows=14;
                $scope.cols=27;
                alert("size is too large!123");
                return;
            }
            
            TableService.create.rows = $scope.rows;
            TableService.create.cols = $scope.cols;
            $route.reload();
        }
        
    
        $scope.onDropComplete=function(data,evt){
            console.log("-----Drop Complete");
//            console.log(evt.event.target.innerText);
            console.log(evt.event.target);
//            console.log("---"+targetID);
            if(targetID=="remove"){
                console.log("remove fired");
                return;
            }
            
            //drop new table
            var targetID = $(evt.event.target).attr("targetID");
            targetID = targetID.substring(0,targetID.length);
            var coordinate = targetID.split(",");
            coordinate[0] = parseInt(coordinate[0]);
            coordinate[1] = parseInt(coordinate[1]);
            var current = $scope.arr[coordinate[0]][coordinate[1]];
            var newObj = angular.copy(data);
            newObj.host = coordinate;
            current.items = [];
            current.items.push(newObj);
            console.log(current.items);
        }
        
        $scope.onDragSuccess1=function(data,evt){
            var targetID = $(evt.event.target).attr("targetID");
            console.log(evt);
        }
        $scope.pro = function(data,evt){
            var coord = data.host;
            console.log(coord);
            if(data.host == null)
                return;
            var current = $scope.arr[coord[0]][coord[1]];
            current.items = [];
        }
        
        $scope.saveLayout = function(){
            var arr = $scope.arr;
            var masterArr = [];
            var count = 0
            for(i=0;i<arr.length;i++){
                var curr = [];
                for(j=0;j<arr[0].length;j++){
                    if(arr[i][j].items.length==1){
                        count+=1;
                        curr.push(true);
                    }
                    else
                        curr.push(false);
                }
                masterArr.push(curr);
            }
            
            var master1  = {};
            master1.Arr = masterArr;
            master1.Name = $scope.Name;
            master1.Active = false;
            master1.Tables = count;
            console.log(master1);
            // TableService.CreateTable(master1);
            
        }
    
}]);

//Table Service
webApp.factory('TableService',function($http,SERVER){
    var o = {
        create: {rows:6,cols:12},
        data: [
            {Arr:[ 
                [true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
                [true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
            
            ], Active:true,Name:"Christmas Arrangement",ID:"05",Tables:100},
            {Arr:[ 
                [true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
                [true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
[true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false,true,true,false,false],
            
            ], Active:false,Name:"Default Arrangement",ID:"08",Tables:100}
              ],
        currentItem:{},
    }
    return o;
})

//Menu Controller
webApp.controller('MenuController', ['$window','MenuService','$scope','$uibModal', function($window,MenuService,$scope,$modal){
    
    $scope.menus = MenuService.menus;
    $scope.monthNames = ["filler","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
//    SupplierService.getOrders().then(function(response) {
////        $scope.result = response.data;
//        $scope.ingredientsList = response.data;
//        $scope.items = response.data
//        $scope.suppliers = response.data;
//    }, function(error) {
//        console.log('opsssss' + error);
//    });
    $scope.items = $scope.menus;
    
    //modal
    $scope.getForecasts = function(){
        $modal.open({
                templateUrl: 'forecasts.html',
                controller: ['MenuService','$scope', '$uibModalInstance','items', function (MenuService,$scope, $instance, items) {
                    $scope.forecasts = MenuService.forecasts;
                    $scope.currentForecast = $scope.forecasts[0];
                    $scope.selectForecast;
                    
                    $scope.updateCurrent = function(){
                        for(i=0;i<$scope.forecasts.length;i++){
                            if($scope.forecasts[i].Name == $scope.selectForecast)
                                $scope.currentForecast = $scope.forecasts[i];
                        }
                    }
                    
                    
                    
                    
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
    
     $scope.getDetails = function(menuId){
        $modal.open({
                templateUrl: 'menuDetails.html',
                controller: ['MenuService','$scope', '$uibModalInstance','items', function (MenuService,$scope, $instance, items) {
                     $scope.monthNames = ["filler","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
                    $scope.items = items;
                    $scope.selectedItem;
                    for(i = 0; i<items.length; i++){
                        if(items[i].ID == menuId){
                            $scope.selectedItem=items[i];
                        }
                    }
                    MenuService.currentMenu = $scope.selectedItem;
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

webApp.controller('MenuCreateController', ['$route','MenuService','$window','$scope','$uibModal', function($route,MenuService,$window,$scope,$modal){
    $scope.forecasts = MenuService.forecasts;
    console.log($scope.forecasts);
    $scope.currentForecast = $scope.forecasts[0];
    $scope.selectForecast;
    $scope.StartDate;
    $scope.EndDate;
    $scope.selectMain;
    
     $scope.moveItem = function(item, from, to) {

        console.log('Move item   Item: '+item+' From:: '+from+' To:: '+to);
        //Here from is returned as blank and to as undefined
         for(i=0;i<item.length;i++){
            var idx=from.indexOf(item[i]);
            if (idx != -1) {
                from.splice(idx, 1);
                to.push(item[i]);      
            }
         }
    };
    $scope.moveAll = function(from, to) {

        console.log('Move all  From:: '+from+' To:: '+to);
        //Here from is returned as blank and to as undefined

        angular.forEach(from, function(item) {
            to.push(item);
        });
        from.length = 0;
    };           
    
    $scope.selectedmains = [];                                
    $scope.selectedapps = [];                                
    $scope.selecteddrinks = [];                                
    $scope.selecteddesserts= []; 
    
    $scope.mains = $scope.currentForecast.MainDishes;
    $scope.apps = $scope.currentForecast.Appetisers;
    $scope.drinks = $scope.currentForecast.Drinks;
    $scope.desserts = $scope.currentForecast.Desserts;
   
    
    
    $scope.updateCurrent = function(){
        $('#menupicker').show();
        for(i=0;i<$scope.forecasts.length;i++){
            if($scope.forecasts[i].Name == $scope.selectForecast)
                $scope.currentForecast = $scope.forecasts[i];
        }
        $scope.mains = $scope.currentForecast.MainDishes;
        $scope.apps = $scope.currentForecast.Appetisers;
        $scope.drinks = $scope.currentForecast.Drinks;
         $scope.desserts = $scope.currentForecast.Desserts;
        console.log($scope.currentForecast);
    }
    
    $scope.createMenu = function(){
        var master = {};
        master.Name = $scope.Name;
        master.MainDishes = $scope.selectedmains;
        master.Appetisers = $scope.selectedapps;
        master.Drinks = $scope.selecteddrinks;
        master.Desserts = $scope.selecteddesserts;
        master.StartDate = $('#datepicker').val();
        master.EndDate = $('#datepicker2').val();
        master.BasedOn = $scope.currentForecast.Name;
        if(master.StartDate==""||master.EndDate==""){
            alert("please enter dates correctly");
            return;
        }
        //Menu Service save call
        console.log(master);
    }
    
}]);

webApp.controller('MenuEditController', ['$route','MenuService','$window','$scope','$uibModal', function($route,MenuService,$window,$scope,$modal){
    $scope.forecasts = MenuService.forecasts;
    $scope.currentForecast = $scope.forecasts[0];
    $scope.selectForecast;
    $scope.StartDate;
    $scope.EndDate;
    $scope.selectMain;
    
    $scope.currentMenu = MenuService.currentMenu;
    $scope.master = angular.copy($scope.currentMenu);
    console.log($scope.currentMenu);
    
     $scope.moveItem = function(item, from, to) {

        console.log('Move item   Item: '+item+' From:: '+from+' To:: '+to);
        //Here from is returned as blank and to as undefined
         for(i=0;i<item.length;i++){
            var idx=from.indexOf(item[i]);
            if (idx != -1) {
                from.splice(idx, 1);
                to.push(item[i]);      
            }
         }
    };
    $scope.moveAll = function(from, to) {

        console.log('Move all  From:: '+from+' To:: '+to);
        //Here from is returned as blank and to as undefined

        angular.forEach(from, function(item) {
            to.push(item);
        });
        from.length = 0;
    };           
    
    $scope.selectedmains = $scope.master.MainDishes;                                
    $scope.selectedapps = $scope.master.Appetisers;                                
    $scope.selecteddrinks = $scope.master.Drinks;                                
    $scope.selecteddesserts= $scope.master.Desserts; 
    
    $scope.mains = [];
    $scope.apps = [];
    $scope.drinks = [];
    $scope.desserts = [];
   
    
    
    $scope.updateCurrent = function(){
        $('#menupicker').show();
        for(i=0;i<$scope.forecasts.length;i++){
            if($scope.forecasts[i].Name == $scope.selectForecast)
                $scope.currentForecast = $scope.forecasts[i];
        }
        $scope.mains = $scope.currentForecast.MainDishes;
        $scope.apps = $scope.currentForecast.Appetisers;
        $scope.drinks = $scope.currentForecast.Drinks;
         $scope.desserts = $scope.currentForecast.Desserts;
        console.log($scope.currentForecast);
    }
    
    $scope.createMenu = function(){
//        var master = {};
//        master.Name = $scope.Name;
//        master.MainDishes = $scope.selectedmains;
//        master.Appetisers = $scope.selectedapps;
//        master.Drinks = $scope.selecteddrinks;
//        master.Desserts = $scope.selecteddesserts;
        $scope.master.StartDate = $('#datepicker').val();
        $scope.master.EndDate = $('#datepicker2').val();
        $scope.master.DateCreated = $scope.getDate();
        console.log($scope.master.DateCreated);
//        master.BasedOn = $scope.currentForecast.Name;
        if(master.StartDate==""||master.EndDate==""){
            alert("please enter dates correctly");
            return;
        }
//        //Menu Service save call
        console.log($scope.master);
    }
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
    
}]);

webApp.controller('MenuPreviewController', ['$route','MenuService','$window','$scope','$uibModal', function($route,MenuService,$window,$scope,$modal){
    $scope.menus = MenuService.menus;
    $scope.currentMenu = $scope.menus[0];
    $scope.selectMenu;
    
    console.log($scope.currentMenu);
    
    $scope.updateCurrent = function(){
        for(i=0;i<$scope.menus.length;i++){
            if($scope.menus[i].Name == $scope.selectMenu)
                $scope.currentMenu = $scope.menus[i];
        }
    }

    $scope.print = function(){
        var pdf = new jsPDF('p', 'pt', 'letter');
         pdf.addHTML($('#printableArea')[0], function () {

             var fileName = $scope.currentMenu.Name+"_"+$scope.currentMenu.StartDate;
             //output new window or save
//             pdf.save(fileName);
             pdf.output("dataurlnewwindow");
         });
        }
    
    
}]);

webApp.factory('MenuService', function($http,SERVER) {
   
    var o = {
        state: 0,
        menus: [
            {ID:5,Name:"Christmas Menu",DateCreated:"12/05/2017",Active:true,
                MainDishes:["Steak","Fish & Chips","Garden Salad","Salmon Fillet","Escargot","Extra Item"],
                Appetisers:["Kimchi","Radish","Peas & Pods","Truffle Fries"],
                Drinks:["Coke","Mountain Dew","Pepsi","Root Beer"],
                Desserts:["Ice-cream","Peanut Bingsu","Mochi","Peaches"],
                SideDishes:["French Fries","Onion Rings","Coleslaw","Mac & Cheese"],
                BasedOn:"December 2017",
                StartDate: "1/12/2017",
                EndDate: "31/12/2017"
            },
            {ID:8,Name:"January Menu",DateCreated:"1/5/2018",Active:false,
                MainDishes:["Ribeye","Tenderloin","Salt Bae","Salmon Fillet","Escargot","Filler"],
                Appetisers:["Kimchi","Radish","Peas & Pods","Truffle Fries","Filler"],
                Drinks:["Coke","Mountain Dew","Pepsi","Root Beer","Filler"],
                Desserts:["Ice-cream","Peanut Bingsu","Mochi","Peaches","Filler"],
                SideDishes:["French Fries","Onion Rings","Coleslaw","Mac & Cheese","Filler"],
                BasedOn:"January 2018",
                StartDate: "1/12/2017",
                EndDate: "31/12/2017"
            }
        ],
        forecasts: [
            {ID:5,Name:"Christmas Menu",DateCreated:"12/05/2017",
                MainDishes:["Steak123","Fish & Chips123","Garden Salad123","Salmon Fillet","Escargot","filler","filler2"],
                Appetisers:["Kimchi","Radish","Peas & Pods","Truffle Fries"],
                Drinks:["Coke","Mountain Dew","Pepsi","Root Beer"],
                Desserts:["Ice-cream","Peanut Bingsu","Mochi","Peaches"],
                SideDishes:["French Fries123","Onion Rings123","Coleslaw123","Mac & Cheese123"],
                StartDate: "1/12/2017",
                EndDate: "31/12/2017",
                LastUpdated:"10/08/2016"
            },
             {ID:5,Name:"January Menu",DateCreated:"12/05/2017",
                MainDishes:["Steak","Fish & Chips","Garden Salad","Salmon Fillet","Escargot"],
                Appetisers:["Kimchi","Radish","Peas & Pods","Truffle Fries"],
                Drinks:["Coke","Mountain Dew","Pepsi","Root Beer"],
                Desserts:["Ice-cream","Peanut Bingsu","Mochi","Peaches"],
                SideDishes:["French Fries","Onion Rings","Coleslaw","Mac & Cheese"],
                StartDate: "1/01/2017",
                EndDate: "31/02/2017",
                LastUpdated:"10/09/2016"
            },
             {ID:5,Name:"March Menu",DateCreated:"12/05/2017",
                MainDishes:["Steak","Fish & Chips","Garden Salad","Salmon Fillet","Escargot"],
                Appetisers:["Kimchi","Radish","Peas & Pods","Truffle Fries"],
                Drinks:["Coke","Mountain Dew","Pepsi","Root Beer"],
                Desserts:["Ice-cream","Peanut Bingsu","Mochi","Peaches"],
                SideDishes:["French Fries","Onion Rings","Coleslaw","Mac & Cheese"],
                StartDate: "1/03/2017",
                EndDate: "31/06/2017",
                LastUpdated:"10/12/2016"
            },
        ],
        currentMenu:{}
    };
    
    o.createMenu = function(dataObj){
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
    
     o.getMenu = function(){
        return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.SupplierRestful/getAllSuppliers',
//            params: {param1: "ULTRAMAN KangKong"}
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
     
     o.editMenu = function(dataObj){
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
     
     o.deleteMenu= function(dataObj){
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
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.InventoryManagementModule/createSupplier',
            params: dataObj,
        }).success(function(data){
            console.log(data);
            console.log("succes");
            o.orders = data;
        });
    }
    
     o.getOrders = function(){
        return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.InventoryManagementModule/getAllSuppliers',
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
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.InventoryManagementModule/editSupplier',
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
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.InventoryManagementModule/deleteSupplier',
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
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.InventoryManagementModule/getAllIngredients',
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
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.InventoryManagementModule/GetAllPurchaseOrder',
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
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.InventoryManagementModule/createPurchaseOrderJson',
            params: dataObj,
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
    
    o.editOrder = function(dataObj){
         return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.InventoryManagementModule/editPurchaseOrder',
            params: dataObj,
        }).success(function(data){
            console.log(data);
            o.orders = data;
        });
    }
     o.deleteOrder = function(dataObj){
         return $http({
            method: 'GET',
            url:SERVER.url+'/TestEnterprise-war/webresources/ejb.InventoryManagementModule/deletePurchaseOrder',
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



