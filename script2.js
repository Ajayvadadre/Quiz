const questions = [
    {
      question:
        "The ratio of boys to girls in a class is 3:5. If there are 36 girls, how many boys are there in the class?",
      options: ["23", "15", "22", "27"],
      correctAnswer: "22",
    },
    {
      question: "Number of primitive data types in Java are?",
      options: ["6", "9", "7", "8"],
      correctAnswer: "8",
    },
    {
      question: "Select the valid statement.",
      options: [
        "char[] ch = new char(5)",
        "char[] ch = new char[5]",
        "char[] ch = new char()",
        "char[] ch = new char[]",
      ],
      correctAnswer: "char[] ch = new char[5]",
    },
    {
      question:
        "When an array is passed to a method, what does the method receive?",
      options: [
        "The reference of the array",
        "A copy of the array",
        "Length of array",
        "Copy of first element",
      ],
      correctAnswer: "The reference of the array",
    },
    {
      question: " In which of the following is toString() method defined?",
      options: ["java.lang.String", "java.lang.Object", "java.lang.util", "None"],
      correctAnswer: "java.lang.Object",
    },
    {
      question: "compareTo() returns",
      options: ["True", "False", "An int value ", "None"],
      correctAnswer: "An int value",
    },
  ];
  const containers = document.getElementById('containers')
  const questionsContainer = document.getElementById("questions-container");
  const showResultsBtn = document.getElementById("showResultsBtn");
  const showCorrectBtn = document.getElementById("showCorrectBtn");
  const marksContainer = document.getElementById("marks-container");
  const correctContainer = document.getElementById("correct-container");
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("popup");
  let userAnswers = [];
  
  //----#changed this function---
  questions.forEach((q, index) => {  
      // Create a container for each question
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question-container");

    // Create a div for the question text and append it to the question container
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
    questionElement.style.marginLeft = "10px";
    questionElement.style.marginBottom = "30px";

    questionContainer.appendChild(questionElement);

    // Loop through options and create a container for each option
    q.options.forEach((opt, i) => {
        const optionContainer = document.createElement("div");

        // Create radio input for each option
        const optionElement = document.createElement("input");
        optionElement.type = "radio";
        optionElement.name = `q${index}`;
        optionElement.value = opt;
        optionElement.id = `q${index}o${i}`;

        // Create label for the option and append both to the option container
        const labelElement = document.createElement("label");
        labelElement.htmlFor = `q${index}o${i}`;
        labelElement.textContent = opt;

        // style for the options
        optionContainer.appendChild(optionElement);
        optionContainer.appendChild(labelElement);
        optionContainer.style.marginBottom = "20px";
        optionContainer.style.marginLeft = "10px";
        optionContainer.style.color = "#676b70";
        optionContainer.style.cursor= 'pointer'


        // Append the option container to the question container
        questionContainer.appendChild(optionContainer);
    });

    // Append the question container to the main containers div
    containers.appendChild(questionContainer);
  });
  

  function submitAnswers() {
    userAnswers = [];
  
    questions.forEach((q, index) => {
      const selectedOption = document.querySelector(
        `input[name="q${index}"]:checked`
      );
      if (selectedOption) {
        const userAnswer = selectedOption.value;
        userAnswers.push({
          questionNumber: index + 1,
          correctAnswer: q.correctAnswer,
          userAnswer: userAnswer,
        });
      }
    });
  
    // Show Thank You popup
    overlay.style.display = "block";
    popup.style.display = "block";
  }
  
  
  function showResults() {
    const totalQuestions = questions.length;
    const correctAnswers = userAnswers.filter(
      (answer) => answer.correctAnswer === answer.userAnswer
    ).length;

    //# Display marks ---calling the pie chart
    UpdateThePieChart(correctAnswers,totalQuestions-correctAnswers)
    const pieChartDiv = document.querySelector(".pie-chart");
    pieChartDiv.style.display = "block";
  }

  function showCorrectAnswers() {
    // Display correct answers table
    correctContainer.innerHTML = `
          <h2>Correct Answers</h2>
          <table id="correct-table">
              <thead>
                  <tr>
                      <th>Question Number</th>
                      <th>Correct Answer</th>
                  </tr>
              </thead>
              <tbody>
                  ${questions
                    .map(
                      (q, index) => `
                      <tr>
                          <td>${index + 1}</td>
                          <td>${q.correctAnswer}</td>
                      </tr>
                  `
                    )
                    .join("")}
              </tbody>
          </table>
      `;
  
    // Show correct answers container
    correctContainer.style.display = "block";
  }
  
  // Close Thank You popup
  function closePopup() {
    overlay.style.display = "none";
    popup.style.display = "none";
    showResultsBtn.style.display = "inline-block";
    showCorrectBtn.style.display = 'inline-block'
  }
  

  //--------#Added Pie chart----------- 

function UpdateThePieChart(correct,incorrect){  
const ResultChart = document.getElementById('myChart').getContext('2d');
console.log('Updating Pie Chart', correct, incorrect);
if (window.ResultChart) {
    window.ResultChart.destroy();
}
window.ResultChart = new Chart(ResultChart, {
    type: "pie",
    data: {
        labels: ["Correct Answers", "Incorrect Answers"],
        datasets: [{
            data: [correct, incorrect],
            backgroundColor: ["#4caf50", "#e74c3c"],
        }],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: "bottom",
        },
    },
});
}



