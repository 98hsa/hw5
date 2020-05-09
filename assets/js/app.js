$(document).ready(function(){

    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);

})
var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',

    questions: {
        q1: "Az önce ekranda yer alan görüntüler hangi şehrimize aittir?",
        q2: 'Yukarıda dinlediğiniz şarkı kime aittir?',
        q3:  'Bakır elementinin sembolü nedir?',
        q4: 'Masal dünyasında prenses tarafından öpülünce prense dönüşen hayvan hangisidir?',
        q5: "Atatürk tarafından 4 Eylül 1919 tarihinde Sivas Kongresi'nde kurulmuş olan gazetenin adını söyleyiniz?",
        q6: 'İstiklal Marşımızın bestecisi kimdir?',
        q7: 'Divan şiirinde şairlerin kullandığı takma ada ne denir?',
    },
    options: {
        q1: ['Ankara', 'Erzurum', 'Kayseri', 'Sivas'],
        q2: ['Barış Manço', 'Cem Karaca', 'Erkin Koray', 'MFÖ'],
        q3: ['Cr', 'Cu'],
        q4: ['Kaplumbağ', 'Kurbağa', 'Kuş'],
        q5: ['Hakimiyeti Milliye','İrade-i Milliye','terakkiperver','Tasvir-i Efkâr'],
        q6: ['Mustafa Kemal Atatürk','Mehmet Akif Ersoy','Osman Zeki Üngör','Edgar Manas'],
        q7: ['Münşeat', 'Müflis', 'Tecahül', 'Mahlas', 'Mübağla'],
    },
    answers: {
        q1: 'Sivas',
        q2: 'Barış Manço',
        q3: 'Cu',
        q4: 'Kurbağa',
        q5: 'İrade-i Milliye',
        q6: 'Osman Zeki Üngör',
        q7: 'Mahlas',
    },

    startGame: function(){
        // restarting game results
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);


        $('#game').show();
        $('#foto').show();

        $('#results').html('');

        $('#timer').text(trivia.timer);

        $('#start').hide();
        $('#foto').hide();
        $('#remaining-time').show();

        trivia.nextQuestion();

    },

    nextQuestion : function(){

        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        if(!trivia.timerOn){
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);


        var questionOptions = Object.values(trivia.options)[trivia.currentSet];

        $.each(questionOptions, function(index, key){
            $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
        })

    },

    timerRunning : function(){

        if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if(trivia.timer === 4){
                $('#timer').addClass('last-seconds');
            }
        }
        else if(trivia.timer === -1){
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
        }
        else if(trivia.currentSet === Object.keys(trivia.questions).length){

            $('#results')
                .html('<h3>Oynadığın için teşekkürler!</h3>'+
                    '<p>Doğru: '+ trivia.correct +'</p>'+
                    '<p>Yanlış: '+ trivia.incorrect +'</p>'+
                    '<p>Cevapsız: '+ trivia.unanswered +'</p>'+
                    '<p>Tekrar denemelisin!</p>');

            $('#game').hide();

            $('#start').show();
        }
    },

    guessChecker : function() {

        var resultId;

        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

        if($(this).text() === currentAnswer){

            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Doğru cevap!</h3>');
        }
        else{
            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Bir dahaki sefer iyi şanslar!  Cevap: '+ currentAnswer +'</h3>');
        }
    },
    guessResult : function(){

        trivia.currentSet++;

        $('.option').remove();
        $('#results h3').remove();

        trivia.nextQuestion();

    }
}