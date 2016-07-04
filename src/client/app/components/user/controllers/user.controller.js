(function () {
    'use strict'
    angular
        .module('user')
        .controller('userController', userController);

    userController.$inject = ['$scope'];

    function userController($scope) {
        var vm = this;

        (function activate() {
            console.log('User controller activation.');
            $scope.sharedData = {};
        })();
    }
})();

(function () {
    'use strict'
    angular
        .module('user')
        .controller('user.profileController', userProfileController);

    userProfileController.$inject = ['$scope', 'userStore', 'authenticationService'];

    function userProfileController($scope, userStore, authenticationService) {
        $scope.model = {
            currentUser: null
        };

        (function activate() {
            $scope.model.currentUser = authenticationService.currentUser;
            $scope.sharedData.activeTab = 'profile';
            //
            userStore.get($scope.model.currentUser.id, function (resp) {
                $scope.model.user = resp;
                CONSTS.propsToLower($scope.model.user);
            });
            //
            $scope.model.updateUser = updateUser;
        })();

        function updateUser() {
            $scope.model.user.id = $scope.model.currentUser.id;
            userStore.update($scope.model.user).then(function (data) {
                $scope.model.user = data;
                $scope.model.updated = true;
            });
        };
    }
})();

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

(function () {
    'use strict'
    angular
        .module('user')
        .controller('user.myOffersController', myOffersController);

    myOffersController.$inject = ['$scope', 'giftStore', 'authenticationService'];

    function myOffersController($scope, giftStore, authenticationService) {
        var currentUser = null;
        $scope.model = {};

        (function activate() {
            currentUser = authenticationService.currentUser;
            $scope.sharedData.activeTab = 'myOffers';
            //
            giftStore.getOffers(currentUser.id);
            $scope.model.myOffers = giftStore.myOffers;
            //
            $scope.model.togleSelection = togleSelection;
        })();

        function togleSelection() {
            $scope.model.myGifts.forEach(function (item) {
                item.selected = !item.selected;
            });
        }
    }
})();

