angular.module('inscricao').factory('Evento', function($resource) {
    // Ligação entre o AngularJS e os RESTful endpoints do Express de CRUD de avaliaçãooo
    return $resource('http://localhost:3300/inscricao/:id/:urlLogo', null, {
        'urlsave': { method: 'POST', params: { id: '@_id', urlLogo: '@urlLogo' } }
    });
});