"use client";
import { useState } from "react";
import QuestionCard from "../components/QuestionCard";
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    try {
      const endpoint = 'https://opentdb.com/api.php?amount=10&type=multiple';
      const response = await fetch(endpoint);
      const data = await response.json();
      const formattedQuestions = data.results.map((q: any) => ({
        ...q,
        answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
      }));
      setQuestions(formattedQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };
  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === 10) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-10">
      <h1 className="text-5xl font-extrabold text-sky-500 mb-6">Test Your Mind</h1>
      
      {gameOver || userAnswers.length === 10 ? (
        <button 
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all" 
          onClick={startTrivia}
        >
          {userAnswers.length === 10 ? "Restart Quiz" : "Start Quiz"}
        </button>
      ) : null}
      {!gameOver && <p className="text-2xl text-sky-600 font-bold mt-4">Score: {score}</p>}
      {loading && <p className="mt-10 text-sky-500 animate-pulse font-semibold">Loading Questions...</p>}
      {!loading && !gameOver && (
        <>
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={10}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers.length > number ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
          {userAnswers.length === number + 1 && number !== 9 && (
            <button 
              className="mt-6 bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
              onClick={nextQuestion}
            >
              Next Question
            </button>
          )}
        </>
      )}
    </div>
  );
}