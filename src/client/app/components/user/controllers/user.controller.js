(function () {
    'use strict'
    angular
        .module('user')
        .controller('userController', userController);

    userController.$inject = ['$scope'];

    function userController($scope) {
        var vm = this;

        (function activate() {
            $scope.sharedData = {};
        })();
    }
})();

