import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { KvmForm } from '../sections/user/kvm';
// mock

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [kvmList, setKVMList] = useState([]);

  const saveData = (data) => {

  }

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          KVM Rootserver
        </Typography>
        <KvmForm userData={""} onSubmitData={saveData} />
      </Container>
    </>
  );
}