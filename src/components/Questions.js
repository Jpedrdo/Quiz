import React, { useState, memo } from "react";
import { Box, Button } from "@mui/material";
import { data } from "../data";
import { randomQuestion, formatTypeString, stuffType } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { answered } from "../store/actions";
import { resultDefaultValue } from "../utils";
import QuestionForm from "./QuestionForm";
import { ReactComponent as QuizSvg } from "../assets/quizSvg.svg";

const Questions = () => {
  const dispatch = useDispatch();
  const dispatchQuestions = (value) => dispatch(answered(value));
  const answeredState = useSelector((state) => state.answered.answered);
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(randomQuestion(data));
  const [currentId, setCurrentId] = useState(answeredState.length + 1);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultDefaultValue);

  const handleStartQuiz = () => setStartQuiz(true);

  const newQuestion = () => {
    setCurrentQuestion(randomQuestion(data));
    setResult(resultDefaultValue);
    setAnswer(null);
    setCurrentId(answeredState.length + 1);
  };

  const handleChangeRadio = (_, value) => setAnswer(value);

  const handleResult = (text, error) => {
    const formatType = formatTypeString(text);
    const newResult = {
      text: text,
      error: error,
      submited: true,
      color: stuffType[formatType.toLocaleLowerCase()],
    };
    setResult(newResult);

    dispatchQuestions([
      ...answeredState,
      {
        ...currentQuestion,
        id: currentId,
        valueSelected: answer,
        resultType: text,
        resultTypeFormated: formatType,
        result: newResult,
      },
    ]);
  };

  const handleSubmit = () => {
    const wrongOrRight = Number(answer) === currentQuestion.correct;
    const text = wrongOrRight ? "Right answer" : "Wrong answer";
    handleResult(text, !wrongOrRight);
  };

  return (
    <Box>
      {!startQuiz ? (
        <Box display="flex" flexDirection="column" alignItems="center" mt={-3}>
          <QuizSvg width="400" height="400" />
          <Box mt={-1}>
            <Button
              color="secondary"
              variant="outlined"
              sx={{ width: 400 }}
              onClick={handleStartQuiz}
            >
              {answeredState.length ? "Retake" : "Start"} questions
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <QuestionForm
            currentId={currentId}
            currentQuestion={currentQuestion}
            result={result}
            handleResult={handleResult}
            answer={answer}
            handleChangeRadio={handleChangeRadio}
          />
          <Box
            pt={3}
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
          >
            {!result.submited && (
              <Box pr={3}>
                <Button
                  pr={3}
                  color="secondary"
                  onClick={() => handleResult("Canceled", true)}
                >
                  Cancel
                </Button>
              </Box>
            )}
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disabled={answer === null && !result.submited}
              onClick={() => (result.submited ? newQuestion() : handleSubmit())}
            >
              {result.submited ? "Next" : "Confirm"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(Questions);
