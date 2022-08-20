 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
  import { getDatabase, ref, set,push, onValue } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD-HNryVxU9zQQZGI0zcl7qrPUeF9DiKkU",
    authDomain: "quiz-app-7d2ea.firebaseapp.com",
    databaseURL: "https://quiz-app-7d2ea-default-rtdb.firebaseio.com",
    projectId: "quiz-app-7d2ea",
    storageBucket: "quiz-app-7d2ea.appspot.com",
    messagingSenderId: "887505641906",
    appId: "1:887505641906:web:56b17b36832687cfb7c4ab",
    measurementId: "G-7QHSNQVRGX"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const databs = getDatabase();

  

//renderQuestions
function renderQuestions(){
  var parent = document.getElementById("parent");
  parent.innerHTML = "";
  for(var i = 0; i < questions.length; i++){
    parent.innerHTML += `<div class="container">
    <div class="row">
      <div class="offset-md-3 col-md-6">
        <div class="bg-light my-3 p-3 rounded shadow">
          <p><strong>Question no. </strong> ${questions[i].numb} </p>
          <p><strong>Question : </strong> ${questions[i].question} </p>
          <p><strong>Options : </strong> ${questions[i].options} </p>
          <p><strong>Answer : </strong> ${questions[i].answer} </p>
        </div>
      </div>
    </div>
  </div>`
  }
  console.log("In render Function");
  console.log(questions.length);
}

var questions = [];   //global array
//Getting questions from database
function getQuestions(){
  var reference = ref(databs, 'questions/');
  var dummyQuestions = [];

  onValue(reference,function(data){
      dummyQuestions = Object.values(data.val());
      // console.log(dummyQuestions);
      questions.length = 0;
      for(var i = 0; i < dummyQuestions.length; i++){
        dummyQuestions[i].numb = i+1;
        questions.push(dummyQuestions[i]);
      } 
      renderQuestions();
  })
  
}




  window.addQuestion = function() {
    var question = document.getElementById("question").value;
    var option1 = document.getElementById("option1").value;
    var option2 = document.getElementById("option2").value;
    var option3 = document.getElementById("option3").value;
    var option4 = document.getElementById("option4").value;
    var answer = document.getElementById('answer').value;
    var options = [];
    var flag = 0

    if(option1 != ""){ options.push(option1); }
    if(option2 != ""){ options.push(option2); }
    if(option3 != ""){ options.push(option3); }
    if(option4 != ""){ options.push(option4); }
    
    for(var i = 0; i < options.length; i++){
        if(options[i] == answer){
          flag = 1;
        }
    }   
     
    var obj = { question, answer, options }

    if(question == "" || answer == ""){
        alert("Please, Enter Question")
    }
    else{

    if(flag == 1){    
    //Adding questions in dataBase
    var reference = ref(databs, 'questions/');
    var newRef = push(reference);
    obj.id = newRef.key;
    set(newRef,obj)
    getQuestions();
    }
    else{
      alert("Answer must match one of the option.");
    }

    } 

  }

getQuestions();
console.log(questions);