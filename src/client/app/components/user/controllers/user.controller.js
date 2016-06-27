(function () {
    'use strict'
    angular
        .module('user')
        .controller('userController', userController);

    userController.$inject = ['$scope'];

    function userController($scope) {
        var vm = this;
        vm.ctrlName = "User controller";

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

    userProfileController.$inject = ['$scope', 'userStore', 'authenticationApi'];

    function userProfileController($scope, userStore, authenticationApi) {
        $scope.model = {
            currentUser: null
        };

        (function activate() {
            $scope.model.currentUser = authenticationApi.currentUser;
            $scope.sharedData.activeTab = 'profile';
            //
            userStore.get($scope.model.currentUser.id);
            $scope.model.user = userStore.user;
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

    myGiftsController.$inject = ['$scope', 'giftStore', 'authenticationApi'];

    function myGiftsController($scope, giftStore, authenticationApi) {
        var currentUser = null;
        $scope.model = {};

        (function activate() {
            currentUser = authenticationApi.currentUser;
            $scope.sharedData.activeTab = 'myGifts';

            giftStore.get(null, currentUser.id);
            $scope.model.myGifts = giftStore.myGifts;
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

(function () {
    'use strict'
    angular
        .module('user')
        .controller('user.myOffersController', myOffersController);

    myOffersController.$inject = ['$scope', 'giftStore', 'authenticationApi'];

    function myOffersController($scope, giftStore, authenticationApi) {
        var currentUser = null;
        $scope.model = {};

        (function activate() {
            currentUser = authenticationApi.currentUser;
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

