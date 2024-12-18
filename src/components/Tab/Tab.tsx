import { Tabs, Tab, Box } from "@mui/material";

const TabComponent: React.FC = () => {
  return (
    <div>
        <Box>
            <Tabs aria-label="tabs example">
                <Tab label="teste 1" />
                <Tab label="teste 2" />
                <Tab label="teste 3" />
            </Tabs>
        </Box>
    </div>
  );
};

export default TabComponent;
