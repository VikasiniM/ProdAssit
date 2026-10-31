import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useAppStore } from '../store/appStore';

export default function SessionsPage() {
  const { sessions } = useAppStore();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sessions
      </Typography>

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
              <Card>
                <CardContent>
                  <Typography variant="h6">{session.title}</Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
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
