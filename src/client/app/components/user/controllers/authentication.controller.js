(function () {
    'use strict'
    angular
        .module('user')
        .controller('authenticationController', authenticationController);

    authenticationController.$inject = ['$scope', '$state', 'authStore'];

    function authenticationController($scope, $state, authStore) {
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
        
        function login(){
            console.log('Login user: ', vm.userLogin);
            authStore.login(vm.userLogin).then(function(data){
                $state.go('home');
            }, function(err){
                alert(err);
            });
        }
        
        function signup(){
            console.log('Login user: ', vm.userSignup);
            authStore.insert(vm.userSignup).then(function(data){
                console.log('user inserted: ', data);
                $state.go('home');
            });
             // authenticationService.signup(vm.userSignup).then(function(data){
                
            // }, function(error){
                
            // });
        }
    }
})();

