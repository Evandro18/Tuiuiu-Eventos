angular.module('inscricao').factory('Eventos', function($resource) {
    // Ligação entre o AngularJS e os RESTful endpoints do Express de CRUD de avaliação
    return $resource('http://localhost:3300/inscricao/lista/:pagina', { pagina: '@pagina' });
});