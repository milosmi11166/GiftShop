(function () {
    'use strict'
    angular
        .module('user')
        .controller('authenticationController', authenticationController);

    authenticationController.$inject = ['$scope', 'authenticationService'];

    function authenticationController($scope, authenticationService) {
        var vm = this;
        vm.ctrlName = "Authentication controller";
        vm.user = {
            username: null,
            password: null     
         }
         vm.login = login;
         
         
        (function activate() {
            console.log('Authentication controller activation.');
        })();
        
        function login(){
            console.log('Login user: ', vm.user);
            // authenticationService.login(vm.user).then(function(data){
                
            // }, function(error){
                
            // });
        }
    }
})();

