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
