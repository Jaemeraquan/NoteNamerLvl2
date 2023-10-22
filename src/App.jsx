import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import _, { fromPairs } from "lodash";
// import MainMenu from "./components/mainMenu.jsx"; // Import the MainMenu component
import StaffQuiz from "./components/staffQuiz.jsx"; // Import the Quiz component
import FretBoardQuiz from "./components/fretboardQuiz.jsx";
import "./App.css";
import AB from "./assets/images/staffA-B.jpg";
import AC from "./assets/images/staffA-C.jpg";
import AD from "./assets/images/staffA-D.jpg";
import GB from "./assets/images/staffG-B.jpg";
import GC from "./assets/images/staffG-C.jpg";
import GD from "./assets/images/staffG-D.jpg";
import ABaudio from "./assets/audio/pitch recognition audio-A-B.mp3";
import ACaudio from "./assets/audio/pitch recognition audio-A-C.mp3";
import ADaudio from "./assets/audio/pitch recognition audio-A-D.mp3";
import GBaudio from "./assets/audio/pitch recognition audio-G-B.mp3";
import GCaudio from "./assets/audio/pitch recognition audio-G-C.mp3";
import GDaudio from "./assets/audio/pitch recognition audio-G-D.mp3";
import hintAB from "./assets/images/fretboardA-B.jpg";
import hintAC from "./assets/images/fretboardA-C.jpg";
import hintAD from "./assets/images/fretboardA-D.jpg";
import hintGB from "./assets/images/fretboardG-B.jpg";
import hintGC from "./assets/images/fretboardG-C.jpg";
import hintGD from "./assets/images/fretboardG-D.jpg";
import "./components/mainMenu.css"
const originalQuestions = [
  {
    questionImage: AB,
    answerOptions: [
      { answerText: "B\nA", isCorrect: true },
      { answerText: "C\nA", isCorrect: false },
      { answerText: "D\nA", isCorrect: false },
      { answerText: "B\nG", isCorrect: false },
      { answerText: "C\nG", isCorrect: false },
      { answerText: "D\nG", isCorrect: false },
    ],
    answeraudio: ABaudio,
    answerHint: hintAB,
  },
    {
      questionImage: AC,
      answerOptions: [
        { answerText: "B\nA", isCorrect: false },
        { answerText: "C\nA", isCorrect: true },
        { answerText: "D\nA", isCorrect: false },
        { answerText: "B\nG", isCorrect: false },
        { answerText: "C\nG", isCorrect: false },
        { answerText: "D\nG", isCorrect: false },
      ],
      answeraudio: ACaudio,
      answerHint: hintAC,
    },
    {
      questionImage: AD,
      answerOptions: [
        { answerText: "B\nA", isCorrect: false },
        { answerText: "C\nA", isCorrect: false },
        { answerText: "D\nA", isCorrect: true },
        { answerText: "B\nG", isCorrect: false },
        { answerText: "C\nG", isCorrect: false },
        { answerText: "D\nG", isCorrect: false },
      ],
      answeraudio: ADaudio,
      answerHint: hintAD,
    },
    {
      questionImage: GB,
      answerOptions: [
        { answerText: "B\nA", isCorrect: false },
        { answerText: "C\nA", isCorrect: false },
        { answerText: "D\nA", isCorrect: false },
        { answerText: "B\nG", isCorrect: true },
        { answerText: "C\nG", isCorrect: false },
        { answerText: "D\nG", isCorrect: false },
      ],
      answeraudio: GBaudio,
      answerHint: hintGB,
    },
    {
      questionImage: GC,
      answerOptions: [
        { answerText: "B\nA", isCorrect: false },
        { answerText: "C\nA", isCorrect: false },
        { answerText: "D\nA", isCorrect: false },
        { answerText: "B\nG", isCorrect: false },
        { answerText: "C\nG", isCorrect: true },
        { answerText: "D\nG", isCorrect: false },
      ],
      answeraudio: GCaudio,
      answerHint: hintGC,
    },
    {
      questionImage: GD,
      answerOptions: [
        { answerText: "B\nA", isCorrect: false },
        { answerText: "C\nA", isCorrect: false },
        { answerText: "D\nA", isCorrect: false },
        { answerText: "B\nG", isCorrect: false },
        { answerText: "C\nG", isCorrect: false },
        { answerText: "D\nG", isCorrect: true },
      ],
      answeraudio: GDaudio,
      answerHint: hintGD,
    },

]

export default function App() {
  const [questions, setQuestions] = useState([...originalQuestions]);
  const [percentageScore, setPercentageScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [response, setResponse] = useState(" ");
  const [play] = useSound(questions[currentQuestion].answeraudio);
  const [isAnswered, setIsAnswered] = useState(false);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [showStaffQuiz, setShowStaffQuiz] = useState(true);
  const [showFretboardQuiz, setShowFretboardQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const startStaffQuiz = () => {
    setShowStaffQuiz(true);
    setShowFretboardQuiz(false);
    setSelectedAnswer(null)
  };
  const startFretboardQuiz = () => {
    setShowFretboardQuiz(true);
    setShowStaffQuiz(false);
    setSelectedAnswer(null)
  };
  document.documentElement.style.setProperty('--viewport-width', '100%');
  document.documentElement.style.setProperty('--viewport-height', '100%');
document.documentElement.style.setProperty('--viewport-initial-scale', '1');


useEffect(() => {
  const shuffledQuestions = _.cloneDeep(originalQuestions);

  shuffledQuestions.forEach((question) => {
    const allOptions = [...question.answerOptions];
    const correctAnswerIndex = allOptions.findIndex((option) => option.isCorrect);
    allOptions.splice(correctAnswerIndex, 1); // Remove correct answer
    shuffleArray(allOptions); // Shuffle incorrect options
    
    // Randomly select a position for the correct answer
    const randomPosition = Math.floor(Math.random() * 5);
    allOptions.splice(randomPosition, 0, question.answerOptions[correctAnswerIndex]);
    
    // Ensure there are only 6 options, even if correct answer was duplicated
    question.answerOptions = allOptions.slice(0, 5);
  });

  shuffleArray(shuffledQuestions);
  setQuestions(shuffledQuestions);
  setAskedQuestions([]);
}, []);

  function shuffleArray(array) {
    for (let i = 1; i < array.length; i++) {
      const j = Math.floor(Math.random() * (array.length - i)) + 1;
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  // Define a state variable to track the button text
  const [viewScoreText, setViewScoreText] = useState('View Score');

  // Event handler function to change the button text
  const handleViewScoreHover = () => {
    setViewScoreText(`${score}/${questionCount} (${percentageScore.toFixed(0)}%)`);
  };
  
  // Event handler function to reset the button text when hover ends
  const handleViewScoreLeave = () => {
    setViewScoreText('View Score');
  };
  function getNextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setResponse(" ");
      setIsAnswered(false);
    } else {
      const shuffledQuestions = _.cloneDeep(originalQuestions);
      shuffleArray(shuffledQuestions);
      setQuestions(shuffledQuestions);
      setCurrentQuestion(0);
      setResponse(" ");
      setIsAnswered(false);
    }
  }


  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
    //   const randomMessage = responseMessages[Math.floor(Math.random() * responseMessages.length)];
    // setResponse(randomMessage);
    //   document.getElementById("response").style.color = "green";
    //   document.getElementById("response").style.color = "green";
    console.log("Playing audio:", questions[currentQuestion].answeraudio);
    console.log("play function:", play); // Check if play is defined
      console.log(questions[currentQuestion].answeraudio);
        play(questions[currentQuestion].answeraudio); // Use the regular play function
  
      setIsAnswered(true);
      setTimeout(() => {
        getNextQuestion();
        setSelectedAnswer(null)
      }, 3000);
      setScore(score + 1);
      setQuestionCount(questionCount + 1);
      const newPercentageScore = ((score + 1) / (questionCount + 1)) * 100;
      setPercentageScore(newPercentageScore);
    } else {
    //   const randomMessage = wrongResponseMessages[Math.floor(Math.random() * wrongResponseMessages.length)];
    // setResponse(randomMessage);
    //   document.getElementById("response").style.color = "red";
      setQuestionCount(questionCount + 1);
      const newPercentageScore = (score / (questionCount + 1)) * 100;
      setPercentageScore(newPercentageScore);
    }
  };



  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setResponse(" ");
    setIsAnswered(false);
    setScore(0);
    setQuestionCount(0);
    setPercentageScore(0);
    const shuffledQuestions = _.cloneDeep(originalQuestions);
    shuffleArray(shuffledQuestions);
    setQuestions(shuffledQuestions);
    setSelectedAnswer(null)
  };
 
  return (
    <div className="app">
      { showStaffQuiz ? (
        <StaffQuiz
          questions={questions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          showScore={showScore}
          setShowScore={setShowScore}
          viewScoreText={viewScoreText}
          setViewScoreText={viewScoreText}
          handleViewScoreHover={handleViewScoreHover}
          handleViewScoreLeave={handleViewScoreLeave}
          response={response}
          setResponse={setResponse}
          play={play}
          isAnswered={isAnswered}
          setIsAnswered={setIsAnswered}
          score={score}
          setScore={setScore}
          questionCount={questionCount}
          setQuestionCount={setQuestionCount}
          percentageScore={percentageScore}
          setPercentageScore={setPercentageScore}
          getNextQuestion={getNextQuestion}
          handleAnswerOptionClick={handleAnswerOptionClick}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          restartQuiz={restartQuiz}
          startStaffQuiz={startStaffQuiz}
          startFretboardQuiz={startFretboardQuiz}
        />
      ) : showFretboardQuiz ? (
        <FretBoardQuiz
          questions={questions}
          currentQuestion={currentQuestion}
          handleViewScoreHover={handleViewScoreHover}
          handleViewScoreLeave={handleViewScoreLeave}
          viewScoreText={viewScoreText}
          setViewScoreText={viewScoreText}
          setCurrentQuestion={setCurrentQuestion}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          showScore={showScore}
          setShowScore={setShowScore}
          response={response}
          setResponse={setResponse}
          play={play}
          isAnswered={isAnswered}
          setIsAnswered={setIsAnswered}
          score={score}
          setScore={setScore}
          questionCount={questionCount}
          setQuestionCount={setQuestionCount}
          percentageScore={percentageScore}
          setPercentageScore={setPercentageScore}
          getNextQuestion={getNextQuestion}
          handleAnswerOptionClick={handleAnswerOptionClick}
          restartQuiz={restartQuiz}
          startStaffQuiz={startStaffQuiz}
          startFretboardQuiz={startFretboardQuiz}
        />
        ) : null}
    </div>
  );
}