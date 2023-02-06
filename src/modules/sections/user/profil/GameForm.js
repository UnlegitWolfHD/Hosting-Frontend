import PropTypes from 'prop-types';

// @mui
import { Grid, Card, CardContent, Box, Paper, Typography } from '@mui/material';


// ----------------------------------------------------------------------

GameForm.propTypes = {
  gameData: PropTypes.array
};

export default function GameForm({ gameData }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={2} md={5} lg={12}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(2, 1fr)',
              }}
            >
              {gameData.map((i, index) => (
                <Paper key={index} variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                  <Box sx={{ mb: 0.5 }}></Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {i.gameName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {i.rankName}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

  );
}
