(function () {
    'use strict'
    angular
        .module('user')
        .controller('user.profileController', userProfileController);

    userProfileController.$inject = ['$scope', 'userStore', 'authenticationService'];

    function userProfileController($scope, userStore, authenticationService) {
        $scope.model = {
            currentUser: null
        };

        (function activate() {
            $scope.model.currentUser = authenticationService.currentUser;
            $scope.sharedData.activeTab = 'profile';
            //
            userStore.get($scope.model.currentUser.id, function (resp) {
                $scope.model.user = resp;
                CONSTS.propsToLower($scope.model.user);
            });
            //
            $scope.model.updateUser = updateUser;
        })();

        function updateUser() {
            $scope.model.user.id = $scope.model.currentUser.id;
            userStore.update($scope.model.user).then(function (data) {
                $scope.model.user = data;
                $scope.model.updated = true;
            });
        };
    }
})();