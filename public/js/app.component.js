angular.module('Playing', ['ngComponentRouter']).component('app', {
    template: "<ng-outlet></ng-outlet>",
    $routeConfig: [
        {
            path: '/',
            name: 'Main',
            component: 'main',
            useAsDefault: true
        },
        {
            path: '/signInOrRegister',
            name: 'SignInOrRegister',
            component: 'signInOrRegister'
        }
    ]
}).value('$routerRootComponent', 'app');
