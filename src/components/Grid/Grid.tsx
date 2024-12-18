import { Grid, Paper } from "@mui/material";

const GridComponent: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Paper style={{ padding: 10}}>oi</Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper style={{ padding: 10}}>teste</Paper>
      </Grid>
    </Grid>
  );
};

export default GridComponent;
