
angular.module('authentication').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/components/authentication/views/login.view.html',
                controller: 'authenticationController',
                controllerAs: 'vm',
                resolve: {
                    authStore: ['authenticationService', storeFn]
                }
            }).state('register', {
                url: '/register',
                templateUrl: 'app/components/authentication/views/register.view.html',
                controller: 'authenticationController',
                controllerAs: 'vm',
                resolve: {
                    authStore: ['authenticationService', storeFn]
                }
            });
    }]);

function storeFn(authenticationService) {
    // Get the correct module (API or localStorage).
    return authenticationService.then(function (module) {
        return module;
    });
}