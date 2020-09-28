$(document).ready(function () {
    $("#keyboard-upper-container").hide();
    $("#keyboard-lower-container").show();
    let current = 0;
    let currentLetter = 0;
    let keyList = $(".key");
    let sentences = [
        "ten ate neite ate nee enet ite ate inet ent eate",
        "Too ato too nOt enot one toTAnot anot tOO aNot",
        "oat itain oat tain nate eate tea anne inant nean",
        "itant eate anot eat nato inate eat anot tain eat",
        "nee ene ate ite tent tiet ent ine ene ete ene ate"
    ];
    let sentenceDiv = $('#sentence');
    sentenceDiv.text(sentences[current]);
    let $highLight = $("#yellow-block");
    let $letterDiv = $("#target-letter");
    let incorrectKeys = 0;
    let time = 0;
    let minutes;
    let $wpmDiv = $('#wpm')
    let $resetDiv = $('#reset')
    let $yesBtn = $("#yesBtn")
    //let $noBtn = $(`#noBtn`)

    setInterval(() => {
        time++;
        minutes = (time / 60);
        //console.log(minutes)
    }, 1000)

    function changePic(param) {
        
        if (param == "wrong") {
            $("#feedback").html('<img src="wrong.png" width="50px" height="50px"/>');
        } else if (param == "right") {
            $("#feedback").html('<img src="correct.png" width="50px" height="50px"/>');
        } else {
            $("#feedback").html("");
        }
    }
    //let $letterDivText = $letterDiv.text(sentences[current][currentLetter]);



    function reset() {
        current++;
        currentLetter = 0;
        $highLight.width(0);
        $("#sentence").text(sentences[current]);
    }

    function reset2() {
        current = 0;
        currentLetter = 0;
        incorrectKeys = 0;
        $highLight.width(0);
        $wpmDiv.hide()
        $resetDiv.hide()
    }

    $('#yesBtn').click(() => {
        //reset2();    
        location.reload();
    })

    var down = false;
    $wpmDiv.hide()
    $resetDiv.hide()

    $(document).keydown(function (e) {

        if (currentLetter == sentences[current].lenght) {
            reset();
            changePic("");
            if (current == sentences.lenght) {

                sentenceDiv.text(sentences[current]);
                changePic();
                $wpmDiv.show()
                $resetDiv.show()
                //word per minute
                let score = 55 / minutes - 2 * incorrectKeys
                $wpmDiv.text(Math.floor(score) + ' words/minute')
                console.log(minutes)
            }
        } else {
            if (e.key == sentences[current][currentLetter]) {
                changePic("right");
                down = true;
                currentLetter++;
                //showing letter expected
                $letterDiv.text(sentences[current][currentLetter]);
                $highLight.width(17 + $highLight.width());
                if (down) {
                    return;
                }
            } else {
                changePic("wrong");


                if (e.keyCode == 16) {
                    changePic("right");
                } else {
                    incorrectKey++;

                }
            }
            //reset when game over
        }

    });

    //highlighting key pressed
    $(document).keydown(function (e) {
        for (let i = 0; i < keyList.length; i++) {
            if (e.key == keyList[i].innerText) {
                $(keyList[i]).css("background-color", "yellow");
//showing capital keyboard when 'SHIFT' pressed
            } else if (e.keyCode == 16) {
                lowKeyboard.hide();
                capKeyboard.show();
            }
        }
    });

    $(document).keyup(function (e) {
        down = false;

        //changing bg color back to normal when key unpressed
        for (let i = 0; i < keyList.length; i++) {
            if (e.key == keyList[i].innerText) {
                $(keyList[i]).css("background-color", "");
            } else if (e.keyCode == 16) {
                changePic("");
                lowKeyboard.show();
                capKeyboard.hide();
            }
        }
    });
});






//let sentences = [
//  "ten ate neite ate nee enet ite ate inet ent eate",
//  "Too ato too nOt enot one toTAnot anot tOO aNot",
//  "oat itain oat tain nate eate tea anne inant nean",
//    "itant eate anot eat nato inate eat anot tain eat",
//  "nee ene ate ite tent tiet ent ine ene ete ene ate"
//];
//let sentenceIndex = 0;
//currentSentence = sentences[sentenceIndex],
//    letterIndex = 0,
//    currentLetter = currentSentence[letterIndex];

//$("#keyboard-upper-container").hide();
//$("#sentence").append(currentSentence);
//$("#target-letter").append(currentLetter);

//$(document).keydown(function (e) {
//    console.log(e.key.charCodeAt(0));

//   if (e.key.charCodeAt(0) === 83) {
//        $("#keyboard-lower-container").hide();
//        $("#keyboard-upper-container").show();
//    }

//    $(`#${e.key.charCodeAt(0)}`).css("background-color", "yellow");

//    if (e.key === currentLetter) {
//        letterIndex++;
//        currentLetter = currentSentence[letterIndex];
//        $("#target-letter").empty();

//        $("#target-letter").append(currentLetter);
//    }
//});

//$(document).keyup(function () {
//    $("#keyboard-upper-container").hide();
//    $("#keyboard-lower-container").show();

//    $(`#${e.key.charCodeAt(0)}`).css("background-color", "gray");
//});
//});

