(function () {
    'use strict'
    angular
        .module('gift')
        .controller('gift.editController', editGiftController);

    editGiftController.$inject = ['$scope', '$state', '$stateParams', 'Upload', 'giftStore', 'categoryApi', 'growl'];

    function editGiftController($scope, $state, $stateParams, Upload, giftStore, categoryApi, growl) {
        var vm = this;
        var giftId;

        (function activate() {
            giftId = $stateParams.giftId || null;
            //
            vm.updateGift = updateGift;
            vm.uploadPic = uploadPic;
            //
            giftStore.getById(giftId, function (resp) {
                vm.gift = resp;
                CONSTS.propsToLower(vm.gift);
            });
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

        function uploadPic(file, imageNumber) {
            file.upload = Upload.upload({
                url: GLOBAL_SETTINGS.apiPath + 'image/giftId/' + giftId + '/imageNumber/' + imageNumber,
                data: { file: file },
            });
            file.upload.then(function (response) {
                growl.success('File successfully uploaded');
            }, function (response) {
                if (response.status > 0) {
                    var errorMsg = response.status + ': ' + response.data;
                    growl.error('Error uploading file');
                }
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }


    }
})();