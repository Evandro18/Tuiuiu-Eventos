angular.module('inscricao').controller('InscricaoController',
    function($window, $scope, Inscricao, Evento, $stateParams, $state, $filter) {

        $scope.inscricao = new Inscricao();
        $scope.evento = {};
        $scope.datas = [];

        $scope.hide = true;

        $scope.hideInscricao = false;

        $scope.ativo;

        $scope.cpf = '';

        $scope.inscricao.eventos = [];

        var isCpf = false;

        $scope.vagasExcedidas = false;

        var carregaEvento = function() {
            if ($stateParams.id) {
                Evento.get({ id: $stateParams.id },
                    function(evento) {
                        $scope.evento = evento;
                        console.log(evento);
                        pegaDatas();
                        $scope.filtroData = evento.atividades[0].dataInicialAtividade.substring(0, 12);
                    },
                    function(erro) {
                        $scope.mensagem = { texto: 'Evento não existe. Novo evento.', sucesso: false };
                        console.log(erro);
                    }
                );
            }
        }

        carregaEvento();

        var contemItem = function(objeto, lista) {
            for (var i = 0; i < lista.length; i++) {
                if (objeto._id === lista[i]._id) {
                    return i;
                }
            }
            return -1;
        }


        $scope.selecionaAtividades = function(atividade, ativo) {
            if (ativo && contemItem(atividade._id, $scope.inscricao.eventos[$scope.inscricao.eventos.length - 1].atividades) === -1) {
                $scope.inscricao.eventos[$scope.inscricao.eventos.length - 1].atividades.push(atividade);
            }
            if (!ativo) {
                $scope.inscricao.eventos[$scope.inscricao.eventos.length - 1].atividades.splice(contemItem(atividade, $scope.inscricao.eventos[$scope.inscricao.eventos.length - 1].atividades), 1);
            }
            console.log($scope.inscricao.eventos[$scope.inscricao.eventos.length - 1].atividades);
        }

        $scope.verificaQtdInscritos = function() {
            $scope.evento.atividades.forEach(function(atividade) {
                if (atividade.qtdInscritos === atividade.quantidadeVagas) {
                    var bloqueada = document.getElementById("atividades" + atividade._id);
                    bloqueada.setAttribute("disabled", "disabled");
                }
            });
        }

        $scope.filtra = function(data) {
            $scope.filtroData = data;
        }

        var validaInscricao = function(eventos, evento_id) {
            var resultado = false;
            eventos.forEach(function(evento) {
                if (evento.evento_id == evento_id) {
                    resultado = true;
                }
            });
            return resultado;
        }
        var adicionaEvento = function(inscricao) {
            inscricao.eventos.push({
                evento_id: $scope.evento._id,
                nome: $scope.evento.nome,
                dataInicial: $scope.evento.dataInicial,
                dataFinal: $scope.evento.dataFinal,
                local: $scope.evento.local,
                descricao: $scope.evento.descricao,
                atividades: []
            });
        }
        $scope.verificaCpf = function() {
            if ($scope.cpf.length > 0) {
                cpf = $scope.cpf.replace(/\./g, '').replace(/\-/g, '');
                isCpf = verificaCPF(cpf);
                $scope.hideInscricao = isCpf ? true : false;
                if (isCpf) {

                    $scope.verificaQtdInscritos();

                    Inscricao.get({ cpf: $scope.cpf },
                        function(inscricao) {
                            if (inscricao.cpf) {
                                if (validaInscricao(inscricao.eventos, $scope.evento._id)) {
                                    alert('CPF já inscrito nesse evento');
                                    $state.go('eventos');
                                } else {
                                    adicionaEvento(inscricao);
                                    $scope.inscricao = inscricao;
                                    $scope.inscricao.nasc = new Date($scope.inscricao.nasc);
                                }
                            } else {
                                $scope.inscricao = new Inscricao();
                                $scope.inscricao.eventos = [];
                                adicionaEvento($scope.inscricao);
                                $scope.inscricao.cpf = $scope.cpf;
                            }
                        },
                        function(erro) {
                            console.log('Não foi possível encontrar este cpf');
                            console.log(erro);
                        })
                } else {
                    alert('CPF inválido!');
                }
            }
        };

        $('#tipoAtividade').change(function() {
            if (this.value === "outro") {
                this.value = "";
                $scope.hide = false;
            } else {
                $scope.hide = true;
            }
        });

        var pegaDatas = function() {
            $scope.evento.atividades.forEach(function(atividade) {
                if ($scope.datas.indexOf(atividade.dataInicialAtividade.substring(0, 10)) === -1) {
                    $scope.datas.push(atividade.dataInicialAtividade.substring(0, 10));
                }
            }, this);
        }

        $scope.salva = function() {
            console.log($scope.inscricao);
            if ($scope.inscricao.eventos[$scope.inscricao.eventos.length - 1].atividades.length > 0) {
                $scope.inscricao.$save({ cpf: undefined })
                    .then(
                        function(inscricao) {
                            $scope.inscricao = new Inscricao();
                            $scope.mensagem = { texto: 'Inscrição realizada com sucesso.', sucesso: true };
                            alert('Inscrição realizada com sucesso !');
                            $state.go('eventos');
                        },
                        function(erro) {
                            console.log(erro);
                            $scope.mensagem = { texto: 'Ocorreu um erro ao realizar inscrição', sucesso: false };
                        }
                    );
            } else {
                alert('Selecione ao menos uma atividade !.');
            }
        }
    });

    var verificaCPF = (strCpf) => {
        var resto;
        if (strCpf === "00000000000" || strCpf === "11111111111" || strCpf === "22222222222" || 
            strCpf === "33333333333" || strCpf === "44444444444" || strCpf === "55555555555" || 
            strCpf === "66666666666" || strCpf === "77777777777" || strCpf === "88888888888" || 
            strCpf === "99999999999") {
            return false;
        }

        resto = calculaRestoSoma(strCpf, 11, 9)
        console.log(`Resto: ${resto}`)
        
        if (!verificaDigito(resto, strCpf, strCpf.substring(9, 10))) {
             return false   
        }

        resto = calculaRestoSoma(strCpf, 12, 10)
        console.log(`Resto: ${resto}`)
        return verificaDigito(resto, strCpf, strCpf.substring(10, 11))
    }

    var verificaDigito = (resto, strCpf, digitoVerificador) => {
        resto = 11 - resto;
        if (resto > 9) {
            resto = 0;
        }

        if (resto != parseInt(digitoVerificador)) {
            return false;
        }
        return true
    }

    var calculaRestoSoma = (strCpf, numInicio, fimLaco) => {
        let soma = 0
        for (i = 1; i <= fimLaco; i++) {
            let digito = parseInt(strCpf.substring(i - 1, i))
            soma = soma + digito * (numInicio - i);
        }
        return soma % 11
    }