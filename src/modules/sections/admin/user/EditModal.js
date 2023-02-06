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

// ----------------------------------------------------------------------

EditModal.propTypes = {
  onFinish: PropTypes.func,
  data: PropTypes.object,
  selfAdminlevel: PropTypes.number
};

export default function EditModal({ onFinish, data, selfAdminlevel }) {

  const LoginSchema = Yup.object().shape();
  const defaultValues = {
    id: data.id,
    name: data.name,
    email: data.email,
    adminlevel: data.adminlevel,
    password: ''
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
    onFinish(data)
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
            spacing={3}
          >
            <Grid item xs={12} md={4} lg={6}>
              <RHFTextField name="name" label="Username" />
            </Grid>
            <Grid item xs={12} md={4} lg={6}>
              <RHFTextField name="email" label="Email" />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <RHFTextField name="adminlevel" label="AdminLevel" />
            </Grid>
            <Grid item xs={12} md={4} lg={6}>
              <RHFTextField name="password" label="Neues Password" />
            </Grid>
            <Grid item xs={0} md={0} lg={5}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Speichern
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </CardContent>
    </Card>
  );
}