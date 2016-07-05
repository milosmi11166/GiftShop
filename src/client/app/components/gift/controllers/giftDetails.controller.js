(function () {
    'use strict'
    angular
        .module('gift')
        .controller('gift.detailsController', giftDetailsController);

    giftDetailsController.$inject = ['$scope', '$state', '$stateParams', '$window','giftStore', 'userApi', 'authenticationService', 'offerApi', 'growl'];

    function giftDetailsController($scope, $state, $stateParams, $window, giftStore, userApi, authenticationService, offerApi, growl) {
        var vm = this;
        var currentUser;
        var giftId;

        (function activate() {
            giftId = $stateParams.giftId || null;
            currentUser = authenticationService.currentUser;
            vm.currentUser = currentUser;
            vm.makeOffer = makeOffer;
            vm.acceptOffer = acceptOffer;


            giftStore.getById(giftId, function (resp) {
                //giftStore.currentGift = resp;
                vm.gift = resp;
                userApi.get(vm.gift.OwnerId, function (resp) {
                    vm.owner = resp;
                    vm.isMyGift = currentUser ? currentUser.id == vm.owner.Id : false;
                });
            });

            getOffers();


        })();

        function makeOffer(offer) {
            offer.ownerId = vm.owner.Id;
            offer.offererId = vm.currentUser.id;
            offer.giftId = giftId;
            offerApi.add(offer).then(function (data) {
                growl.success('Offer successfully sent');
                getOffers();
            }, function (err) {
                growl.error('Error sending your offer. Try again later.');
            });
        }

        function getOffers() {
            offerApi.getByGift(giftId, function (resp) {
                vm.currentOffers = resp || [];
                vm.currentOffers.forEach(function (offer) {
                    CONSTS.propsToLower(offer);
                    if (offer.offererId == vm.currentUser.id) {
                        vm.offerMade = true;
                        vm.title = 'You already made an offer for this gift.'
                    }
                    if(offer.accepted === '1'){
                        vm.haveAcceptedOffer = true;
                        vm.title = 'This gift has accepted offer already.'
                    }
                });
            });
        }

        function acceptOffer(offer) {
            var confirm = $window.confirm('Are you sure that you want to accept this offer?');
            if (confirm) {
                offer.accepted = 1;
                offerApi.update(offer).then(function(){
                    growl.success('Offer accepted');
                    getOffers();
                }, function(err){
                    growl.error('Error accepting offer. Try again later.');
                });
            }

        }
    }
})();