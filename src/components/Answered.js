import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItemButton,
  MenuItem,
  Button,
  Menu,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import QuestionEdit from "./QuestionEdit";
import { ReactComponent as RespondidasSvg } from "../assets/respondidasSvg.svg";
import { separeteByType, truncate } from "../utils";

const Answered = () => {
  const answeredState = useSelector((state) => state.answered.answered);
  const [answered, setAnswered] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [typesLength, setTypesLength] = useState([{ name: "All", amount: 0 }]);
  const [currentType, setCurrentType] = useState(
    `All (${answeredState.length})`
  );
  const [viewMode, setViewMode] = useState(false);
  const [quetionSelected, setQuestionSelected] = useState({});
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event) => setAnchorEl(event.currentTarget);

  const handleCloseMenu = () => setAnchorEl(null);

  const handleMenu = (type) => {
    const { name, amount } = typesLength[type];
    const newTypeList = answeredState.filter((item) => {
      return name === "All"
        ? item
        : item.resultTypeFormated.toLowerCase().indexOf(name.toLowerCase()) >=
            0;
    });

    setAnswered(newTypeList);
    setCurrentType(`${name} (${amount})`);
    handleCloseMenu();
  };

  const handleView = (answ) => {
    setQuestionSelected(answ);
    setViewMode(!!answ);
  };

  useEffect(() => {
    if (answeredState.length) {
      setAnswered(answeredState);
      setTypesLength([
        { name: "All", amount: answeredState.length },
        ...separeteByType(answeredState, "resultTypeFormated"),
      ]);
      setCurrentType(`All (${answeredState.length})`);
    }
  }, [answeredState]);

  return (
    <Box>
      {!answeredState.length ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          pt={4}
          sx={{ textAlign: "center" }}
        >
          <RespondidasSvg width="400" height="300" />
          <Typography color="secondary" pt={5}>
            Here you will see your response history
          </Typography>
        </Box>
      ) : (
        <Box hidden={viewMode}>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box pr={1}>
              <Typography
                color="secondary"
                sx={{ fontSize: 16, fontWeight: "bold" }}
              >
                Answers
              </Typography>
            </Box>
            <Button
              aria-controls={openMenu ? "menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClickMenu}
              color="secondary"
              sx={{ padding: 0, textTransform: "none", margin: 0 }}
            >
              <Typography color="secondary" sx={{ fontSize: 16 }}>
                {currentType}
              </Typography>
              {openMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            {typesLength.length > 1 && (
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {typesLength.map(({ name, amount }, index) => (
                  <MenuItem
                    key={name}
                    onClick={() => handleMenu(index)}
                  >{`${name} (${amount})`}</MenuItem>
                ))}
              </Menu>
            )}
          </Box>
          <Box pt={0.5} pb={2}>
            <Typography sx={{ color: "#6b7280" }}>
              Click on the question to see
            </Typography>
          </Box>
          <List
            sx={{
              width: "100%",
              overflow: "auto",
              maxHeight: "500px",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "darkgrey",
                outline: "1px solid slategrey",
              },
            }}
          >
            {answered.map((answ, index) => (
              <ListItemButton
                key={`${answ.question} ${index}`}
                sx={{ paddingTop: 3, paddingBottom: 3 }}
                onClick={() => handleView(answ)}
              >
                <Box width="100%" display="flex" flexDirection="column">
                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box display="flex" flexDirection="row" pr={3}>
                      <Typography component="span">
                        <Typography
                          color="secondary"
                          component="span"
                        >{`${answ.id}) `}</Typography>
                        {answ.question}
                      </Typography>
                    </Box>
                    <Box>
                      {answ.result.error ? (
                        <CancelIcon sx={{ color: answ.result.color }} />
                      ) : (
                        <CheckCircleIcon sx={{ color: answ.result.color }} />
                      )}
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "#6b7280",
                      }}
                    >
                      {truncate(`Your answer: ${answ.answers[answ.correct]}`)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ color: answ.result.color }}>
                      Resultado: {answ.resultType}
                    </Typography>
                  </Box>
                </Box>
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
      {viewMode && (
        <Box>
          <QuestionEdit question={quetionSelected} handleView={handleView} />
        </Box>
      )}
    </Box>
  );
};

export default Answered;
