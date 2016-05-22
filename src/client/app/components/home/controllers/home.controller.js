(function () {
    'use strict'
    angular
        .module('home')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope', 'homeService'];

    function homeController($scope, homeService) {
        var vm = this;
        vm.ctrlName = "Home controller";
        
        (function activate() {
            console.log('Home controller activation.');
        })();
    }
})();