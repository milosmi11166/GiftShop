(function () {
    'use strict'
    angular
        .module('gift')
        .controller('gift.editController', editGiftController);

    editGiftController.$inject = ['$scope', '$state', '$stateParams', 'giftStore', 'categoryApi'];

    function editGiftController($scope, $state, $stateParams, giftStore, categoryApi) {
        var vm = this;
        var giftId;

        (function activate() {
            giftId = $stateParams.giftId || null;

            giftStore.getById(giftId, function (resp) {
                vm.gift = resp;
                CONSTS.propsToLower(vm.gift);
            });
            vm.updateGift = updateGift;
            categoryApi.get(function (resp) {
                vm.categories = resp;
            });
        })();

        function updateGift() {
            giftStore.update(vm.gift).then(function (data) {
                vm.gift = data;
                vm.updated = true;
            }, function (err) {
                console.log('Error updating gift', err);
            });
        }


    }
})();