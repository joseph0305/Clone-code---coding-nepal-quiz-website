// getting all required elements

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec"); 



// If Start_Quiz button Clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // show the info box
}

// If Exit button Clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // hide the info box
}

// If Continue button Clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // hide the info box
    quiz_box.classList.add("activeQuiz"); // show the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(timeValue);
}

let que_count = 0;
let que_num = 1;
let counter;
let timeValue = 15;

const next_btn = quiz_box.querySelector(".next_btn")

// If next Button Clicked
next_btn.onclick = () => {
    if(que_count < questions.length - 1){
        que_count++;
        que_num++;
        showQuestions(que_count);
        queCounter(que_num);
        clearInterval(counter);
        startTimer(timeValue);
    }else{
        console.log("Questions completed")
    }
}

// gettiong questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + '. ' + questions[index].question + '</span>'; // question.js 에 있는 questions 변수
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)") // click 시 옆에 함수를 실행하시오
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';



function optionSelected(answer){
    let userAns = answer.textContent // 해당요소의 text
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns){
        answer.classList.add("correct");
        console.log("OK");
        answer.insertAdjacentHTML("beforeend",tickIcon); //?????
    }else{
        answer.classList.add("incorrect");
        console.log("wrong answer");
        answer.insertAdjacentHTML("beforeend",crossIcon)

        // if answer is incorrect then automtically selected the correct answer
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
            option_list.children[i].setAttribute("class", "option correct")
            option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }
    }

    //once user selected disabled all options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
}


function queCounter(index){
    
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuescountTag = '<span><p>' + index + '</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuescountTag;

}

function startTimer(time){            // figure it out some day
    counter = setInterval(timer , 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
    }
    // 1초 마다 특정함수를 실행시키고 싶을때
    // 예시: var timer = setInterval(function(){ 특정함수(); }, 1000)
}   // 이를 중지하고 싶을때
    // clearInterval(timer)

// 39:32