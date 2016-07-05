(function () {
    'use strict'
    angular
        .module('user')
        .controller('user.myOffersController', myOffersController);

    myOffersController.$inject = ['$scope', 'giftStore', 'authenticationService', 'offerApi'];

    function myOffersController($scope, giftStore, authenticationService, offerApi) {
        var currentUser = null;
        $scope.model = {};

        (function activate() {
            currentUser = authenticationService.currentUser;
            $scope.sharedData.activeTab = 'myOffers';
            //
            offerApi.getForUser(currentUser.id, function (resp) {
                $scope.model.myOffers = resp;
            });
            //
            $scope.model.togleSelection = togleSelection;
        })();

        function togleSelection() {
            $scope.model.myOffers.forEach(function (item) {
                item.selected = !item.selected;
            });
        }
    }
})();