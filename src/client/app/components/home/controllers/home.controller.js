(function () {
    'use strict'
    angular
        .module('home')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope', '$state', 'categoryStore'];

    function homeController($scope, $state, categoryStore) {
        var vm = this;
        vm.ctrlName = "Home controller";
        vm.categories = [];
        // vm.keyword = '';

        (function activate() {
            categoryStore.get(function (resp) {
                vm.categories = resp;
            });


            vm.doSearch = doSearch;
        })();


        function doSearch(keyword) {
            $state.go('searchGift', { keyword: keyword });
        };
    }
})();

