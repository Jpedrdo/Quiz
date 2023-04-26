import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { formatTypeString, stuffType } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { answered } from "../store/actions";
import QuestionForm from "./QuestionForm";
import { resultDefaultValue, sortById } from "../utils";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const QuestionEdit = ({ question, handleView }) => {
  const dispatch = useDispatch();
  const dispatchQuestions = (value) => dispatch(answered(value));
  const answeredState = useSelector((state) => state.answered.answered);
  const [answer, setAnswer] = useState(question.valueSelected);
  const [result, setResult] = useState(question.result);

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

    const newData = new Array(...answeredState, {
      ...question,
      resultType: text,
      valueSelected: answer,
      resultTypeFormated: formatType,
      result: newResult,
    });

    const newList = [
      ...new Map(newData.map((p) => [(({ id }) => id)(p), p])).values(),
    ];
    dispatchQuestions(sortById(newList));
  };

  const handleSubmit = () => {
    const wrongOrRight = Number(answer) === question.correct;
    const text = wrongOrRight ? "Right answer" : "Wrong answer";
    handleResult(text, !wrongOrRight);
  };

  const handleEdit = () => {
    setResult(resultDefaultValue);
    setAnswer(null);
  };

  return (
    <Box>
      <Box pb={3} mt={-0.5}>
        <Button
          color="secondary"
          sx={{ padding: 0, textTransform: "none", margin: 0 }}
          onClick={() => handleView()}
        >
          <ArrowBackIosNewIcon fontSize="small" />
          <Typography color="secondary" sx={{ fontSize: 20 }}>
            Back to list
          </Typography>
        </Button>
      </Box>
      <QuestionForm
        currentId={question.id}
        currentQuestion={question}
        result={result}
        handleResult={handleResult}
        answer={answer}
        handleChangeRadio={handleChangeRadio}
      />
      <Box pt={3} display="flex" flexDirection="row" justifyContent="flex-end">
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
          onClick={() => (result.submited ? handleEdit() : handleSubmit())}
        >
          {result.submited ? "Edit" : "Confirm"}
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionEdit;
