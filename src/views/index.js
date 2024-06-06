import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import HistoryIcon from "@mui/icons-material/History";
import { a11yProps } from "../utils";
import { TabPanel, Dashboard, Questions, Answered } from "../components";

const Views = () => {
  const [value, setValue] = useState(0);

  const handleChangeTab = (_, newValue) => setValue(newValue)

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        minHeight: "500px",
      }}
    >
      <Box width="850px">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChangeTab}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="tab-main-components"
        >
          <Tab
            value={0}
            icon={<DashboardIcon />}
            label="Dashboard"
            {...a11yProps(0)}
          />
          <Tab
            width={400}
            value={1}
            icon={<QuestionMarkIcon />}
            label="Quiz"
            {...a11yProps(1)}
          />
          <Tab
            value={2}
            icon={<HistoryIcon />}
            label="Answered"
            {...a11yProps(2)}
          />
        </Tabs>
        <Box pt={3} pb={3} pl={4} pr={4} height="350px" minHeight="350px">
          <TabPanel value={value} index={0}>
            <Dashboard />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Questions />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Answered />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default Views;
