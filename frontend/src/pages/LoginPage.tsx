import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, md: 3 },
        background: 'radial-gradient(circle at top, #e0ecff 0%, #f4f7fb 40%, #eef2ff 100%)',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 480, borderRadius: 4, overflow: 'hidden' }}>
        <Box
          sx={{
            px: 3,
            py: 2,
            background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)',
            color: '#fff',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            ProdAssist
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Secure enterprise access
          </Typography>
        </Box>

        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4">Welcome back</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Sign in to access your operations workspace.
              </Typography>
            </Box>

            <TextField label="Email address" fullWidth />
            <TextField label="Password" type="password" fullWidth />

            <Button variant="contained" size="large" sx={{ py: 1.25, borderRadius: 2 }}>
              Continue
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
