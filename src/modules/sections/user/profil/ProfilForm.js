import PropTypes from 'prop-types';

import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Card, CardContent, Avatar } from '@mui/material';

import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

ProfilForm.propTypes = {
  userData: PropTypes.object,
  onSubmitData: PropTypes.func
};

export default function ProfilForm({ userData, onSubmitData }) {
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
      <Grid item xs={12} md={4} lg={4}>
        <Card>
          <CardContent>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar alt={"test"} src={"https://aquatoesports.eu/wp-content/uploads/2021/11/Aquatotransparent-1.png"} sx={{ width: 128, height: 128 }} />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
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
                <Grid item xs={12} md={4} lg={6}>
                  <RHFTextField name="username" label="Username" />
                </Grid>
                <Grid item xs={12} md={4} lg={6}>
                  <RHFTextField name="email" label="Email" />
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
      </Grid>
    </Grid>

  );
}
