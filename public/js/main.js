angular.module('inscricao', ['ngRoute', 'ngResource', 'ngMask', 'ui.router'])
    .config(function($locationProvider, $stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('eventos', {
                url: '/',
                templateUrl: 'partials/eventosDetalhados.html',
                controller: 'EventosDetalhadosController'
            })
            .state('atividade', {
                url: '/eventoDetalhado/:id',
                templateUrl: 'partials/eventoDetalhado.html',
                controller: 'EventoDetalhadoController'
            })
            .state('inscricao', {
                url: '/inscricao/:id',
                templateUrl: 'partials/inscricao.html',
                controller: 'InscricaoController'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });
    });