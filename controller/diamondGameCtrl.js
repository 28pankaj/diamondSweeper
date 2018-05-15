 var app = angular.module('mydiamondGame', []);

 function createDiamondField() {
     var diamondField = {};
     diamondField.rows = [];

     for (var i = 0; i < 8; i++) {
         var row = {};
         row.spots = [];

         for (var j = 0; j < 8; j++) {
             var spot = {};
             spot.isCovered = true;
             spot.content = "empty";
             row.spots.push(spot);
         }

         diamondField.rows.push(row);
     }
     placeManyRandomDiamond(diamondField);
     return diamondField;
 }

 function getSpot(diamondField, row, column) {
     return diamondField.rows[row].spots[column];
 }

 function placeRandomDiamond(diamondField) {
     var row = Math.round(Math.random() * 7);
     var column = Math.round(Math.random() * 7);
     var spot = getSpot(diamondField, row, column);
     spot.content = "diamond";
 }

 function placeManyRandomDiamond(diamondField) {
     for (var i = 0; i < 8; i++) {
         placeRandomDiamond(diamondField);
     }

 }

 function hasReload(diamondField) {
     for (var y = 0; y < 8; y++) {
         for (var x = 0; x < 8; x++) {
             var spot = getSpot(diamondField, y, x);
             if (spot.isCovered && spot.content != "diamond") {
                 return false;
             }
         }
     }

     return true;
 }

 function hasWons(diamondField) {
     for (var y = 0; y < 8; y++) {
         for (var x = 0; x < 8; x++) {
             var spot = getSpot(diamondField, y, x);
             if (spot.isCovered && spot.content == "diamond") {
                 return false;
             }
         }
     }

     return true;
 }
 app.controller('diamondGameCtrl', function($scope, $window) {
     $scope.diamondField = createDiamondField();
     $scope.attempts = 0;
     $scope.diamondCount = 0
     $scope.uncoverSpot = function(spot) {
         spot.isCovered = false;
         if (!spot.isCovered) {
             $scope.attempts++;
             spot.disable = true;
         }
         if (!spot.isCovered && spot.content == "diamond") {
             $scope.diamondCountLength = true;
             $scope.diamondCount++;
         }
         if (hasWons($scope.diamondField)) {
             $scope.hasLostMessageVisible = true;

         } else {
             if (hasReload($scope.diamondField)) {
                 $scope.isWinMessageVisible = true;
                 spot.isCovered = false;
                 console.log($scope.diamondField)
             }
         }
     };
     $scope.reloadPage = function() {
        $window.location.reload();
     }
 });