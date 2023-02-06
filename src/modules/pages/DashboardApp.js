// @mui
import { faker } from '@faker-js/faker';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// sections

import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import announcementService from '../../services/announcements.service';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function DashboardApp() {

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    loadNewestAnnouncements()
    setInterval(() => {
      loadNewestAnnouncements()
    }, 30000);
  }, [])

  const loadNewestAnnouncements = () => {
    announcementService.getNewest().then((res) => {
      setAnnouncements(res.data)
    })
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Willkommen zurück!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={6}>
            <AppNewsUpdate
              title="Neuste Ankündigungen"
              list={announcements}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
