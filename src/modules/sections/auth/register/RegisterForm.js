import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

import loginService from '../../../../services/login.service';


// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Username ist erforderlich'),
    email: Yup.string().email('E-Mail muss eine gültige E-Mail-Adresse sein').required('Email ist erforderlich'),
    password: Yup.string().required('Password ist erforderlich'),
  });

  const defaultValues = {
    username: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    loginService.register({
      Name: data.username,
      Email: data.email,
      Password: data.password,
      AllowExtraEmails: true
    }).then((res) => {
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 250);
    })
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="username" label="Username" />
        </Stack>

        <RHFTextField name="email" label="Email Addresse" />

        <RHFTextField
          name="password"
          label="Passwort"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Registrieren
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
