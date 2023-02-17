import React from 'react';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Card, CardContent, Slider, Typography } from '@mui/material';

import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

KvmForm.propTypes = {
  userData: PropTypes.object,
  onSubmitData: PropTypes.func
};

export default function KvmForm({ userData, onSubmitData }) {
  const [cores, setCores] = React.useState(1);
  const [ram, setRam] = React.useState(1);
  const [storage, setStorage] = React.useState(16);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('E-Mail muss eine gültige E-Mail-Adresse sein').required('Email ist erforderlich'),
  });

  const defaultValues = {
    username: userData.name,
    email: userData.email,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    onSubmitData(data)
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={2} md={5} lg={8}>
        <Card>
          <CardContent>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12} md={6} lg={8}>
                  <Typography id="non-linear-slider" gutterBottom>
                    CPU Kerne: {cores}
                  </Typography>
                  <Slider
                    value={cores}
                    min={1}
                    step={1}
                    max={8}
                    onChange={(e) => setCores(e.target.value)}
                    aria-labelledby="non-linear-slider"
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <Typography id="non-linear-slider" gutterBottom>
                    Arbeitsspeicher: {ram}GB
                  </Typography>
                  <Slider
                    value={ram}
                    min={1}
                    step={1}
                    max={16}
                    onChange={(e) => setRam(e.target.value)}
                    aria-labelledby="non-linear-slider"
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <Typography id="non-linear-slider" gutterBottom>
                    Speicherplatz: {storage}GB
                  </Typography>
                  <Slider
                    value={storage}
                    min={16}
                    step={16}
                    max={128}
                    onChange={(e) => setStorage(e.target.value)}
                    aria-labelledby="non-linear-slider"
                  />
                </Grid>
                <Grid item xs={0} md={0} lg={5}>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Bestellen für
                  </LoadingButton>
                </Grid>
              </Grid>
            </FormProvider>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

  );
}
