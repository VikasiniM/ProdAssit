import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const settingsItems = [
  { label: 'Auto-escalation', enabled: true },
  { label: 'Notification digest', enabled: true },
  { label: 'AI knowledge sync', enabled: false },
  { label: 'Auto-retry workflows', enabled: true },
];

const systemRows = [
  { area: 'Authentication', status: 'Healthy', uptime: '99.99%' },
  { area: 'AI Gateway', status: 'Stable', uptime: '99.92%' },
  { area: 'Data Retrieval', status: 'Monitoring', uptime: '98.80%' },
  { area: 'Support Queue', status: 'Healthy', uptime: '99.88%' },
];

export default function SettingsPage() {
  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: 'linear-gradient(180deg, #f4f7fb 0%, #eef4ff 100%)' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1.2 }}>
            SETTINGS
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5 }}>
            Admin controls
          </Typography>
        </Box>
        <Chip label="Production ready" color="success" />
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Automation preferences
              </Typography>

              <Stack spacing={2}>
                {settingsItems.map((item) => (
                  <Stack key={item.label} direction="row" alignItems="center" justifyContent="space-between">
                    <Typography>{item.label}</Typography>
                    <Switch defaultChecked={item.enabled} color="primary" />
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Service health
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Area</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Uptime</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {systemRows.map((row) => (
                      <TableRow key={row.area} hover>
                        <TableCell>{row.area}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            size="small"
                            color={row.status === 'Healthy' ? 'success' : row.status === 'Stable' ? 'primary' : 'warning'}
                          />
                        </TableCell>
                        <TableCell>{row.uptime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
