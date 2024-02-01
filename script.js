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

const questionsContainer = document.getElementById("questions-container");
const showResultsBtn = document.getElementById("showResultsBtn");
const showCorrectBtn = document.getElementById("showCorrectBtn");
const marksContainer = document.getElementById("marks-container");
const correctContainer = document.getElementById("correct-container");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
let userAnswers = [];

questions.forEach((q, index) => {
  const questionElement = document.createElement("div");
  questionElement.classList.add("question-container");
  questionElement.innerHTML = 
  `<p>${index + 1}. ${q.question}</p>
  ${q.options.map(
            (opt, i) => `<input type="radio" name="q${index}" value="${opt}" id="q${index}o${i}">
            <label for="q${index}o${i}">${opt}</label><br> `).join("")} `;
  questionsContainer.appendChild(questionElement);
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

  // Display marks
  marksContainer.innerHTML = `
        <div class="marks">
            <h2>Your Results</h2>
            <p>Marks Obtained: ${correctAnswers}/${totalQuestions}</p>
        </div>
    `;

  // Show results container and correct button
  marksContainer.style.display = "block";
  showCorrectBtn.style.display = "inline-block";
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
}

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
  