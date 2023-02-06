import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Box, Card, Stack, CardContent } from '@mui/material';

import { LoadingButton } from '@mui/lab';
// components

import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

import announcementService from '../../../../services/announcements.service';

// ----------------------------------------------------------------------

CreateModal.propTypes = {
  onFinish: PropTypes.func,
};

export default function CreateModal({ onFinish }) {

  const LoginSchema = Yup.object().shape();

  const defaultValues = {
    title: '',
    description: '',
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
    announcementService.addAnnounce({
      "title": data.title,
      "description": data.description
    }).then((res) => {
      onFinish()
    })
  };

  return (
    <Card>
      <CardContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} sx={{ border: "1px solid white" }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} md={4} lg={6}>
              <RHFTextField name="title" label="Titel" />
            </Grid>
            <Grid item xs={12} md={4} lg={6}>
              <RHFTextField name="description" label="Beschreibung" />
            </Grid>
            <Grid item xs={0} md={0} lg={5}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Absenden
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </CardContent>
    </Card>
  );
}