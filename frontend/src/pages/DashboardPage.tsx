import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';

export default function DashboardPage() {
  const stats = [
    { label: 'Sessions', value: '12' },
    { label: 'Queries today', value: '86' },
    { label: 'Avg. response', value: '1.4s' },
    { label: 'Citations used', value: '325' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" variant="body2">
                  {stat.label}
                </Typography>
                <Typography variant="h4">{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Operational overview</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              This dashboard is intentionally light and ready to extend as the backend exposes more
              analytics.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
