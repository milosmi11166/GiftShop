(function () {
    'use strict'
    angular
        .module('core')
        .controller('headerController', headerController);

    headerController.$inject = ['$scope', 'authenticationApi'];

    function headerController($scope, authenticationApi) {
        var vm = this;
        vm.ctrlName = "Header controller";

        $scope.$on('loginSuccess', function () {
            vm.currentUser = authenticationApi.currentUser;
        });

        (function activate() {
            vm.currentUser = authenticationApi.currentUser;
        })();

    }
})();

