
angular.module('user').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            // .state('user', {
            //     abstract: true,
            //     url: '/user',
            //     templateUrl: 'app/components/user/views/user.view.html',
            //     controller: 'userAbstractController'
            // }).state('login', {
            .state('login', {
                url: '/login',
                templateUrl: 'app/components/user/views/login.view.html',
                controller: 'authenticationController',
                controllerAs: 'vm',
                resolve: {
                    store: storeFn
                }
            }).state('register', {
                url: '/register',
                templateUrl: 'app/components/user/views/register.view.html',
                controller: 'authenticationController',
                controllerAs: 'vm',
                resolve: {
                    store: storeFn
                }
            });
    }]);

function storeFn(authenticationService) {
    // Get the correct module (API or localStorage).
    return authenticationService.then(function (module) {
        module.get();
        return module;
    });
}