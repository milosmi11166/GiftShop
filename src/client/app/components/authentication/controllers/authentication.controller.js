(function () {
    'use strict'
    angular
        .module('authentication')
        .controller('authenticationController', authenticationController);

    authenticationController.$inject = ['$scope', '$state', 'authStore', 'growl'];

    function authenticationController($scope, $state, authStore, growl) {
        var vm = this;
        vm.ctrlName = "Authentication controller";
        vm.userLogin = {};
        vm.userSignup = {};

        vm.login = login;
        vm.signup = signup;

        (function activate() {
            console.log('Authentication controller activation.');
        })();

        // 

        function login() {
            console.log('Login user: ', vm.userLogin);
            authStore.login(vm.userLogin).then(function (data) {
                $state.go('home');
            }, function (err) {
                growl.error('Invalid username or password', { ttl: 5000 });
            });
        }

        function signup() {
            vm.userSignup.id = null;
            vm.userSignup.userTypeId = CONSTS.userTypeEnum.normal;
            vm.userSignup.created = null;

            console.log('Register user: ', vm.userSignup);
            authStore.register(vm.userSignup).then(function (data) {
                console.log('user inserted: ', data);
                $state.go('home');
            });
            // authenticationService.signup(vm.userSignup).then(function(data){

            // }, function(error){

            // });
        }
    }
})();

