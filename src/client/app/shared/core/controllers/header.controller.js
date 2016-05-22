(function () {
    'use strict'
    angular
        .module('core')
        .controller('headerController', headerController);

    headerController.$inject = ['$scope'];

    function headerController($scope) {
        var vm = this;
        vm.ctrlName = "Header controller";
        vm.title = "Shop";
         
        (function activate() {
            console.log('Header controller activation.');
        })();
    }
})();

