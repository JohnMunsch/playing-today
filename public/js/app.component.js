angular.module('Playing', ['ngComponentRouter']).component('app', {
    template: "<ng-outlet></ng-outlet>",
    $routeConfig: [
        {
            path: '/signInOrRegister',
            name: 'SignInOrRegister',
            component: 'signInOrRegister'
        },
        {
            path: '/',
            name: 'Main',
            component: 'main',
            useAsDefault: true
        },
        {
            path: '/status/:status',
            name: 'SetStatus',
            component: 'main'
        },
        {
            path: '/game/:id',
            name: 'Game',
            component: 'game'
        }
    ]
}).value('$routerRootComponent', 'app');
