$(document).ready(function() {
    $('ul.tabs').tabs();
});

//inicializa dropdown
$(document).ready(function() {
    $('select').material_select();
});
$(document).ready(function() {
    $('.parallax').parallax();
});
//Outro dropdown
$('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false // Displays dropdown below the button
});


//Eventos Jquery
function chamaEvento() {
    $(document).ready(function() {
        $('ul.tabs').tabs('select_tab', 'evento');
    });
}




function chamaAtividade() {
    $(document).ready(function() {
        $('ul.tabs li.tab.tabEquipe').next('li').removeClass('disabled');
        $('ul.tabs').tabs('select_tab', 'atividade');
    });
}

function chamaModelCertificado() {
    $(document).ready(function() {
        $('ul.tabs li.tab.tabAtividade').next('li').removeClass('disabled');
        $('ul.tabs').tabs('select_tab', 'mCertificadoDeclaracao');
    });
}

/**Calendario em portugues */
$('.datepicker').pickadate({
    format: 'dd/mm/yyyy',
    language: 'pt-BR',
    monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    today: 'Hoje',
    clear: 'Limpar',
    close: 'Pronto',
    labelMonthNext: 'Próximo mês',
    labelMonthPrev: 'Mês anterior',
    labelMonthSelect: 'Selecione um mês',
    labelYearSelect: 'Selecione um ano',
    selectMonths: true,
    selectYears: 50,
    formatSubmit: 'dd/mm/yyyy',
    onSet: function(arg) {
        if ('select' in arg) {
            this.close();
        }
    }
});

window.scrollTo(0, 0);