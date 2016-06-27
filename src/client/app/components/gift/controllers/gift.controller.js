(function () {
    'use strict'
    angular
        .module('gift')
        .controller('gift.newController', newGiftController);

    newGiftController.$inject = ['$scope', '$state', 'giftStore', 'categoryApi'];

    function newGiftController($scope, $state, giftStore, categoryApi) {
        var vm = this;

        (function activate() {
            vm.gift = {
                active: true
            };
            vm.categories = [];
            vm.addGift = addGift;
            categoryApi.get();
            vm.categories = categoryApi.categories;
        })();

        function addGift() {
            giftStore.insert(vm.gift).then(function (data) {
                $state.go('home');
            }, function (err) {
                alert(err);
            });
        }
    }
})();

(function () {
    'use strict'
    angular
        .module('gift')
        .controller('gift.detailsController', giftDetailsController);

    giftDetailsController.$inject = ['$scope', '$state', '$stateParams', 'giftStore', 'userApi', 'authenticationApi'];

    function giftDetailsController($scope, $state, $stateParams, giftStore, userApi, authenticationApi) {
        var vm = this;
        var currentUser;
        var giftId;

        (function activate() {
            console.log('Gift Details');
            giftId = $stateParams.giftId || null;
            currentUser = authenticationApi.currentUser;
            giftStore.get(giftId)
                .query(function (resp) {
                    giftStore.currentGift = resp[0];
                    vm.gift = giftStore.currentGift;
                    userApi.api.query({ id: vm.gift.OwnerId }, function (resp) {
                        vm.owner = resp[0];
                        vm.isMyGift = currentUser ? currentUser.id == vm.owner.Id : false;

                    })

                });

        })();
    }
})();


(function () {
    'use strict'
    angular
        .module('gift')
        .controller('gift.editController', editGiftController);

    editGiftController.$inject = ['$scope', '$state', '$stateParams', 'giftStore', 'categoryApi'];

    function editGiftController($scope, $state, $stateParams, giftStore, categoryApi) {
        var vm = this;
        var giftId;

        (function activate() {
            giftId = $stateParams.giftId || null;

            giftStore.get(giftId)
                .query(function (resp) {
                    giftStore.currentGift = resp[0];
                    vm.gift = giftStore.currentGift;
                    // 
                    propsToLower(vm.gift);
                });
            vm.updateGift = updateGift;
            categoryApi.get();
            vm.categories = categoryApi.categories;
        })();

        function updateGift() {
            giftStore.update(vm.gift).then(function (data) {
                vm.gift = data;
                vm.updated = true;
            }, function (err) {
                console.log('Error updating gift', err);
            });
        }

        function propsToLower(obj) {
            for (var prop in obj) {
                var newPropName = prop[0].toLocaleLowerCase() + prop.substr(1, prop.length);
                vm.gift[newPropName] = vm.gift[prop];
            }
        }
    }
})();

