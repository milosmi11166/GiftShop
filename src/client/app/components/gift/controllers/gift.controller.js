(function () {
    'use strict'
    angular
        .module('gift')
        .controller('gift.newController', newGiftController);

    newGiftController.$inject = ['$scope', '$state', 'giftStore', 'categoryApi', 'growl'];

    function newGiftController($scope, $state, giftStore, categoryApi, growl) {
        var vm = this;

        (function activate() {
            vm.gift = {
                active: true
            };
            vm.categories = [];
            vm.addGift = addGift;
            categoryApi.get(function (resp) {
                vm.categories = categoryApi.resp;
            });
        })();

        function addGift() {
            giftStore.insert(vm.gift).then(function (data) {
                growl.success('Gift successfully added');
                $state.go('user.myGifts');
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

    giftDetailsController.$inject = ['$scope', '$state', '$stateParams', 'giftStore', 'userApi', 'authenticationService'];

    function giftDetailsController($scope, $state, $stateParams, giftStore, userApi, authenticationService) {
        var vm = this;
        var currentUser;
        var giftId;

        (function activate() {
            giftId = $stateParams.giftId || null;
            currentUser = authenticationService.currentUser;
            giftStore.getById(giftId, function (resp) {
                //giftStore.currentGift = resp;
                vm.gift = resp;
                userApi.get(vm.gift.OwnerId, function (resp) {
                    vm.owner = resp;
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

            giftStore.getById(giftId, function (resp) {
                vm.gift = resp;
                CONSTS.propsToLower(vm.gift);
            });
            vm.updateGift = updateGift;
            categoryApi.get(function (resp) {
                vm.categories = resp;
            });
        })();

        function updateGift() {
            giftStore.update(vm.gift).then(function (data) {
                vm.gift = data;
                vm.updated = true;
            }, function (err) {
                console.log('Error updating gift', err);
            });
        }


    }
})();

(function () {
    'use strict'
    angular
        .module('gift')
        .controller('gift.searchController', searchGiftController);

    searchGiftController.$inject = ['$scope', '$state', '$stateParams', 'giftStore', 'categoryApi', 'authenticationService'];

    function searchGiftController($scope, $state, $stateParams, giftStore, categoryApi, authenticationService) {
        var vm = this;
        vm.categories = [];


        (function activate() {
            vm.categoryId = $stateParams.categoryId || '-1';
            vm.keyword = $stateParams.keyword || null;

            categoryApi.get(function (resp) {
                vm.categories = resp;
                vm.categories.splice(0, 0, { Id: '-1', Description: 'All categories' });
            });


            vm.currentUser = authenticationService.currentUser;
            vm.doSearch = doSearch;

            vm.doSearch(vm.currentUser.id, vm.categoryId, vm.keyword);
            //
        })();

        function doSearch(ownerId, categoryId, keyword) {
            if (keyword) {
                 giftStore.getByKeyword(ownerId, keyword, function (resp) {
                    vm.searchResults = resp;
                });
            } else {
               giftStore.getByCategory(ownerId, categoryId, function (resp) {
                    vm.searchResults = resp;
                });
            }

        }
    }
})();
