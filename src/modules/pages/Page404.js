import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Page title="404 Not Found">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry, wurde nicht Gefunden!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Leider konnten wir die gesuchte Seite nicht finden. Vielleicht hast du dich bei der URL vertippt?
          </Typography>

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Zurück zur Startseite
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
