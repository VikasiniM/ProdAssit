import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const operations = [
  { name: 'Support intake', owner: 'Ops Team', status: 'Healthy', sla: '94%', latency: '1.3s' },
  { name: 'Knowledge sync', owner: 'AI Platform', status: 'Monitoring', sla: '87%', latency: '2.2s' },
  { name: 'Escalation routing', owner: 'Customer Care', status: 'Healthy', sla: '96%', latency: '0.9s' },
  { name: 'Compliance review', owner: 'Risk Team', status: 'Delayed', sla: '72%', latency: '4.7s' },
];

export default function OperationsPage() {
  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: 'linear-gradient(180deg, #f4f7fb 0%, #eef4ff 100%)' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1.2 }}>
            OPERATIONS
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5 }}>
            Workflow operations
          </Typography>
        </Box>
        <Chip label="Live monitoring" color="primary" variant="outlined" />
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Workflow</TableCell>
                      <TableCell>Owner</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>SLA</TableCell>
                      <TableCell>Latency</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {operations.map((row) => (
                      <TableRow key={row.name} hover>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.owner}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            size="small"
                            color={row.status === 'Healthy' ? 'success' : row.status === 'Monitoring' ? 'warning' : 'error'}
                          />
                        </TableCell>
                        <TableCell>{row.sla}</TableCell>
                        <TableCell>{row.latency}</TableCell>
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
