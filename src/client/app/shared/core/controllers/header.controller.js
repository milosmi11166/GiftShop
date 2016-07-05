(function () {
    'use strict'
    angular
        .module('core')
        .controller('headerController', headerController);

    headerController.$inject = ['$scope', '$state', 'authenticationService'];

    function headerController($scope, $state, authenticationService) {
        var vm = this;
        var STORAGE_ID = 'current-user'
        vm.ctrlName = "Header controller";

        (function activate() {
            var currentUser = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            vm.currentUser = currentUser; 
            authenticationService.currentUser = currentUser;
            vm.logout = logout;
        })();

        $scope.$on('authenticationService:loginSuccess', function (event, user) {
            vm.currentUser = user;
            localStorage.setItem(STORAGE_ID, JSON.stringify(user));
            authenticationService.currentUser = user;
        });

        function logout() {
            vm.currentUser = null;
            authenticationService.currentUser = null;
            localStorage.removeItem(STORAGE_ID);
            $state.go('home');
        }

    }
})();

