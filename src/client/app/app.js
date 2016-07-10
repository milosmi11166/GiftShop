//Start by defining the main module and adding the module dependencies
angular.module(AppConfig.appModuleName, AppConfig.appModuleDependencies);


angular.module(AppConfig.appModuleName).config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
}]);


//Then define the init function for starting up the application
angular.element(document).ready(function () {
    //Then init the app
    angular.bootstrap(document, [AppConfig.appModuleName]);
});

angular.module(AppConfig.appModuleName).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');

    // var STORAGE_ID = 'current-user';
    // var item = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    // $httpProvider.defaults.headers.common['Authorization'] = item ? 'Bearer ' + item.jwt : '';
}])
// angular.module(AppConfig.appModuleName).config(function ($locationProvider) {
//     // use the HTML5 History API
//     $locationProvider.html5Mode({
//         enabled: true,
//         requireBase: false
//     });
// });
angular.module(AppConfig.appModuleName).factory('httpRequestInterceptor',
    ['$rootScope', function ($rootScope) {
        return {
            request: function ($config) {
                var STORAGE_ID = 'current-user';
                var item = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
                if (item && item.jwt) {
                    $config.headers['Authorization'] = 'Bearer ' + item.jwt;
                }
                return $config;
            }
        };
    }]);