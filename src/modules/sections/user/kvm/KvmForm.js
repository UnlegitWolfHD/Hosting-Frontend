import React from 'react';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Card, CardContent, Slider, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

KvmForm.propTypes = {
  kvmParams: PropTypes.object,
  kvmTemplates: PropTypes.object,
  onSubmitData: PropTypes.func
};

export default function KvmForm({ kvmParams, kvmTemplates, onSubmitData }) {
  const [cores, setCores] = React.useState(1);
  const [ram, setRam] = React.useState(1);
  const [storage, setStorage] = React.useState(16);
  const [selectedTemplate, setSelectedTemplate] = React.useState('');

  const defaultValues = {
    cores: kvmParams.minCores,
    ram: kvmParams.minRam,
  };

  const methods = useForm({
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
            <FormProvider onSubmit={handleSubmit(onSubmit)}>
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
                <Grid item xs={12} md={6} lg={8}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">OS</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedTemplate}
                      label="Age"
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                    >
                      {kvmTemplates.map((e, index) => {
                        <MenuItem value={e.id}>{e.name}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
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
