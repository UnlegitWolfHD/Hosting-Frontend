import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Nicht gefunden
      </Typography>
      <Typography variant="body2" align="center">
        Keine Ergebnisse gefunden für &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>.
      </Typography>
    </Paper>
  );
}
