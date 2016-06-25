(function () {
    'use strict'
    angular
        .module('home')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope', 'categoryStore'];

    function homeController($scope, categoryStore) {
        var vm = this;
        vm.ctrlName = "Home controller";
        vm.categories = [];
        
        (function activate() {
            console.log('Home controller activated.');
            vm.categories = categoryStore.categories;
        })();
    }
})();

