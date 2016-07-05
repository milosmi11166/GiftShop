(function () {
    'use strict'
    angular
        .module('gift')
        .controller('gift.newController', newGiftController);

    newGiftController.$inject = ['$scope', '$state', 'giftStore', 'categoryApi', 'growl'];

    function newGiftController($scope, $state, giftStore, categoryApi, growl) {
        var vm = this;

        (function activate() {
            vm.gift = {
                active: true
            };
            vm.categories = [];
            vm.addGift = addGift;
            categoryApi.get(function (resp) {
                vm.categories = resp;
            });
        })();

        function addGift() {
            giftStore.insert(vm.gift).then(function (data) {
                growl.success('Gift successfully added');
                $state.go('user.myGifts');
            }, function (err) {
                alert(err);
            });
        }
    }
})();