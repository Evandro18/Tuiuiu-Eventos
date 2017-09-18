angular.module('inscricao').controller('EventoDetalhadoController',
    function($stateParams, $routeParams, $scope, $timeout, Evento, $state, $filter) {


        $scope.requerido = true;

        $scope.logo = '';

        $scope.evento = {};

        $scope.state = $state.current;
        $scope.params = $stateParams;
        console.log($scope.params);

        $scope.evento.pessoas = [];
        $scope.pessoa = {};

        $scope.dataInicial = '';
        $scope.dataFinal = '';
        console.log("evento");
        $scope.datas = [];

        var pegaDatas = function() {
            $scope.evento.atividades.forEach(function(atividade) {
                if ($scope.datas.indexOf(atividade.dataInicialAtividade.substring(0, 10)) === -1) {
                    $scope.datas.push(atividade.dataInicialAtividade.substring(0, 10));
                }
            }, this);
        }

        $scope.filtra = function(data) {
            $scope.filtroData = data;
        }

        var carregaEvento = function() {
            if ($stateParams.id) {
                Evento.get({ id: $stateParams.id },
                    function(evento) {
                        console.log(evento);
                        $scope.evento = evento;
                        pegaDatas();
                        $scope.dataInicial = formataData(evento.dataInicial);
                        $scope.dataFinal = formataData(evento.dataFinal);
                        $scope.filtroData = evento.atividades[0].dataInicialAtividade.substring(0, 12);
                    },
                    function(erro) {
                        $scope.mensagem = { texto: 'Evento não existe. Novo evento.', sucesso: false };
                        console.log(erro);
                    }
                );
            } else {
                $scope.evento = new Evento();
                $scope.nome = 'Novo evento';
            }
        }

        function transformData(data) {
            data = data.toString();
            return new Date(parseInt(data.substring(6, 10)), parseInt(data.substring(4, 6)) - 1, parseInt(data.substring(0, 3)));
        }

        function formataData(data) {
            var temp = data.toString().replace(/\-/g, "");
            return temp.substring(6, 8) + "/" + temp.substring(4, 6) + "/" + temp.substring(0, 4);
        }

        carregaEvento();
        console.log("EventoDetalhadoController");
    });