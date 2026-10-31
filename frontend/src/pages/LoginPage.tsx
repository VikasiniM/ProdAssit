import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 480 }}>
        <CardContent>
          <Stack spacing={3}>
            <Typography variant="h4">Sign in</Typography>
            <TextField label="Email" fullWidth />
            <TextField label="Password" type="password" fullWidth />
            <Button variant="contained" size="large">
              Continue
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
