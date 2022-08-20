function gotoAddQuestions(){
    window.location.href = "../login.html"
}

function addQuestionsPg(){
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    if(name == "admin" && password == "123"){
        window.location.href = "../questions.html";
        getQuestions();
        renderQuestions();
    }
    else{
        alert("Incorrect Data");
    }
}


//Getting required elements
const start_btn_parent = document.querySelector(".start_btn")
const start_btn = document.querySelector(".start_btn button");
const info_box_parent = document.querySelector(".info_box_parent");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box_parent = document.querySelector(".quiz_box_parent");
const quiz_box = document.querySelector(".quiz_box");
let next_que = quiz_box.querySelector(".next_que");
const result_box_parent = document.querySelector(".result_box_parent");
const result_box = document.querySelector(".result_box");
const replay_quiz = result_box.querySelector(".button .restart");
const quit_quiz = result_box.querySelector(".button .quit");
var addQuestionBtn = document.getElementById("addQuestionBtn");




const timeForQue = 15;


//If start Quiz button is pressed
start_btn.onclick = ()=>{
    info_box_parent.classList.add("activateInfoP");
    start_btn_parent.classList.add("closeStartBtn"); 
    addQuestionBtn.remove();   
}

exit_btn.onclick = ()=>{
    info_box_parent.classList.remove("activateInfoP");   //remove info_box
    start_btn_parent.classList.remove("closeStartBtn"); 
}

continue_btn.onclick = ()=>{
    info_box_parent.classList.remove("activateInfoP");   //remove info_box
    quiz_box_parent.classList.add("activateQuizBoxP");   //Show the Quiz box
    showQuestion(0);
    startTimer(timeForQue);
}

let que_count = 0;

//When click on next button
next_que.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        showQuestion(que_count);
        clearInterval(count);
        startTimer(timeForQue);
        next_que.style.display = "none";
    }
    else{
        console.log("Completed.")
        showResult();
    }
}


const options_list = document.querySelector('.options_list');
//Getting questions and options from array
function showQuestion(index){
    //Load text of 
    const que_text = document.querySelector('.que_text');
    que_text.innerHTML = `<span>${questions[index].numb}.${questions[index].question}</span>`

    //Clear the previous options before entering the new one
    options_list.innerHTML = "";
    
    //Load options for question 
    for(var i = 0; i < questions[index].options.length; i++){
    options_list.innerHTML += `<div class="option" onclick = "checkAnswer(this,'${questions[index].answer}')"><span>${questions[index].options[i]}</span></div>`}

    //Question count in bottom
    const que_count = document.querySelector('.total_que')
    que_count.innerHTML = `<span><p>${questions[index].numb}</p> of <p>${questions.length}</p>Qustions</span>`

    //Converting next button into submit on last MCQs
    if(questions[index].numb == questions.length){
        let submit_btn = document.querySelector('.next_que');
        submit_btn.innerHTML = "Submit Quiz";
        submit_btn.setAttribute("onclick","showResult()");
    }

}

let score = 0;


function checkAnswer(selected,answer){
    clearInterval(count);
    //Add score by one if answer is true
    if(selected.textContent == answer){
        selected.classList.add("correctAnswer");
        score++;
        
    }else{
        selected.classList.add("wrongAnswer");
    }
    let options = options_list.querySelectorAll(".option");
    //Choose automatically the correct answer
    for(var i = 0; i < options.length; i++){
        options[i].classList.add('disableBtn');
        if(options[i].textContent == answer){
           options[i].classList.add("correctAnswer");
        }   
    }         
    next_que.style.display = "block";
}

let timer_sec = document.querySelector(".timer_sec");
let count;

function startTimer(time){
    count = setInterval(timer, 1000);
    function timer(){
        timer_sec.textContent = time;
        time--;
        if(time < 9){
            let addZero = timer_sec.textContent;
            timer_sec.textContent = "0" + addZero
        }
        if(time < 0){
            clearInterval(count);
            timer_sec.textContent = '00';
            let options = options_list.querySelectorAll(".option");

            //Disable all options
            for(var i = 0; i < options.length; i++){
            options[i].classList.add('disableBtn');}

            //Show the next button
            next_que.style.display = "block";
        }
    }
    
}

function showResult(){
    info_box_parent.classList.remove("activateInfoP");   //remove info_box
    quiz_box_parent.classList.remove("activateQuizBoxP");   //remove the info_box
    result_box_parent.classList.add("activateResultBoxP"); //Activate Result box

    var obtScore = document.getElementById("obtScore");
    obtScore.innerHTML = score;

    var totalScore = document.getElementById("totalScore");
    totalScore.innerHTML = questions.length;
    
}
