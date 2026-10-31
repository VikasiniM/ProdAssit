import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useAppStore } from '../store/appStore';

export default function SessionsPage() {
  const { sessions } = useAppStore();

  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: 'linear-gradient(180deg, #f4f7fb 0%, #eef4ff 100%)' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1.2 }}>
            SESSION INSIGHTS
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5 }}>
            Conversation history
          </Typography>
        </Box>

        <Chip label={`${sessions.length} total sessions`} color="primary" variant="outlined" />
      </Stack>

      <Grid container spacing={3}>
        {sessions.length === 0 ? (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography>No session history yet.</Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          sessions.map((session) => (
            <Grid item xs={12} md={6} lg={4} key={session.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h6">{session.title}</Typography>
                    <Chip label="Active" color="success" size="small" />
                  </Stack>
                  <Typography color="text.secondary" sx={{ mt: 1.5 }}>
                    {new Date(session.updatedAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
