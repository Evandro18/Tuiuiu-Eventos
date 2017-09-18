angular.module('inscricao').factory('Inscricao', function($resource) {
    // Ligação entre o AngularJS e os RESTful endpoints do Express de CRUD de avaliação
    return $resource('http://localhost:3300/api/inscricao/:cpf', { cpf: '@cpf' });
});