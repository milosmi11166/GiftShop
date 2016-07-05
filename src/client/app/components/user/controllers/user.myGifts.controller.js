(function () {
    'use strict'
    angular
        .module('user')
        .controller('user.myGiftsController', myGiftsController);

    myGiftsController.$inject = ['$scope', 'giftStore', 'authenticationService', 'growl'];

    function myGiftsController($scope, giftStore, authenticationService, growl) {
        var currentUser = null;
        $scope.model = {};

        (function activate() {
            currentUser = authenticationService.currentUser;
            $scope.sharedData.activeTab = 'myGifts';

            giftStore.getByOwner(currentUser.id, function (resp) {
                $scope.model.myGifts = resp;
            });
            //
            $scope.model.togleSelection = togleSelection;
            $scope.model.removeGift = removeGift;
        })();

        function togleSelection() {
            $scope.model.myGifts.forEach(function (item) {
                item.selected = !item.selected;
            });
        }

        function removeGift(gift) {
            giftStore.remove(gift.Id).then(function (resp) {
                $scope.model.myGifts = $scope.model.myGifts.filter(function (item) {
                    return item.Id !== gift.Id;
                });
                growl.success('Gift successfully deleted.');
            }, function (err) {
                growl.error('Error deleting gift');
            });
        }
    }
})();