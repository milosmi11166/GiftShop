(function () {
    'use strict'
    angular
        .module('gift')
        .controller('giftController', giftController);

    giftController.$inject = ['$scope', 'store'];

    function giftController($scope, store) {
        var vm = this;
        vm.ctrlName = "Gift controller";
        vm.gifts = [];
        
        (function activate() {
            console.log('Gift controller activated.');
        })();
    }
})();

