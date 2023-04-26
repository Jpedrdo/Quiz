import React, { useState, useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { ReactComponent as DashboardSvg } from "../assets/dashboardSvg.svg";
import { VictoryPie, VictoryLabel } from "victory";
import { separeteByType, percentagePerfomace } from "../utils";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  marginTop: 4,
  justifyContent: "space-between",
  maxWidth: "85%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
  },
}));

const Dashboard = () => {
  const answeredState = useSelector((state) => state.answered.answered);
  const [typesLength, setTypesLength] = useState([]);
  const [hits, setHits] = useState(0);
  const [percentage, setPercentage] = useState("0%");
  const [perfomace, setPerformace] = useState({ text: "", color: "#fff" });

  const calcPercentage = (partialValue) => {
    return (100 * partialValue) / answeredState.length;
  };

  useEffect(() => {
    if (answeredState.length) {
      const separeted = separeteByType(answeredState, "resultTypeFormated");
      setTypesLength(separeted);
      if (separeted[0].id === 1) {
        const correctAmount = separeted[0].amount;
        const percentageClean = Math.trunc(calcPercentage(correctAmount));
        const performaceBy = percentagePerfomace(percentageClean);

        setHits(correctAmount);
        setPercentage(`${percentageClean}%`);
        setPerformace(performaceBy);
      }
    }
  }, [answeredState]);

  return (
    <Box>
      {!answeredState.length ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          pt={2}
          sx={{ textAlign: "center" }}
        >
          <DashboardSvg width="400" height="320" />
          <Typography color="secondary" pt={5}>
            Here you will see your stats
          </Typography>
        </Box>
      ) : (
        <Root>
          <Box
            sx={{ width: 380, height: 380, minWidth: 380, minHeight: 380 }}
            mt={-3.5}
          >
            <svg viewBox="0 0 200 200">
              <VictoryPie
                standalone={false}
                width={200}
                height={200}
                labels={() => null}
                data={typesLength}
                x={"name"}
                y={"amount"}
                innerRadius={80}
                labelRadius={100}
                style={{
                  data: {
                    fill: ({ datum }) => {
                      return datum.color;
                    },
                  },
                }}
              />
              <VictoryLabel
                textAnchor="middle"
                style={{ fontSize: 20 }}
                x={100}
                y={100}
                text={percentage}
              />
            </svg>
          </Box>
          <Box mt={2}>
            <Box pb={2}>
              <Typography color="secondary" sx={{ fontWeight: "bold" }}>
                Answered questions: {answeredState.length}
              </Typography>
              <Typography color="secondary">
                Correct: {`${hits}/${answeredState.length}`}
              </Typography>
            </Box>
            {typesLength.map(({ name, amount, color }) => (
              <Box key={name} display="flex" alignItems="center" pb={3}>
                <Box sx={{ background: color, width: 15, height: 15 }} mr={2} />
                <Typography
                  key={name}
                  sx={{ color: color }}
                >{`${name} (${amount})`}</Typography>
              </Box>
            ))}
            <Box
              width="100%"
              sx={{
                background: perfomace.color,
                textAlign: "center",
                borderRadius: 2,
              }}
              p={0.4}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {perfomace.text}
              </Typography>
            </Box>
          </Box>
        </Root>
      )}
    </Box>
  );
};

export default Dashboard;
