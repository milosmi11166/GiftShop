(function () {
    'use strict'
    angular
        .module('user')
        .controller('userController');

    userController.$inject = ['$scope'];

    function userController($scope) {
        var vm = this;
        vm.ctrlName = "User controller";
         
        (function activate() {
            console.log('User controller activation.');
        })();
    }
})();