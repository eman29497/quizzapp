import React from 'react';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: any;
  questionNr: number;
  totalQuestions: number;
};
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <div className='bg-white p-8 rounded-2xl shadow-md max-w-[500px] w-full mt-10 border-gray-100'>
    <p className='text-sm font-semibold text-sky-500 uppercase tracking-widest mb-2'>
      Question: {questionNr} / {totalQuestions}
    </p>
    <h3 className='text-lg font-semibold text-gray-800 mb-6' 
        dangerouslySetInnerHTML={{ __html: question }} />    
    <div className='flex flex-col gap-3'>
      {answers?.map((answer, index) => (
        <button
          key={index}
          disabled={!!userAnswer}
          value={answer}
          onClick={callback}
          className='w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-sky-500 hover:bg-sky-50 /50 transition-all'
        >
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </button>
      ))}
    </div>
  </div>
);

export default QuestionCard;