angular.module('inscricao').controller('EventosDetalhadosController',
    function($window, $scope, Eventos) {

        $scope.eventos = [];
        $scope.imagens = [];

        $scope.pagina = 1;
        console.log("teste");

        function buscaEventos() {
            Eventos.query({ pagina: $scope.pagina },
                function(eventos) {
                    $scope.eventos = eventos;
                    console.log(eventos);
                },
                function(erro) {
                    console.log("Não foi possível obter a lista de Eventos");
                    console.log(erro);
                });
        };

        buscaEventos();

        function recarrega() {
            // Recarrega a página para forçar a recarga das estrelas de avaliação
            $window.location.reload()
        }

        $scope.remove = function(evento) {
            if ($window.confirm('Deseja realmente remover este evento?')) {
                Evento.delete({ id: evento._id },
                    recarrega(),
                    function(erro) {
                        console.log(erro);
                        $scope.mensagem = { texto: 'Não foi possível remover o evento' };
                    }
                );
            }
        };
    });