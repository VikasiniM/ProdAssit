import {
  Box,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAppStore } from '../store/appStore';

const demoRows = [
  { workflow: 'Support intake', owner: 'Ops Team', status: 'Healthy', latency: '1.3s', updated: '2 min ago' },
  { workflow: 'Knowledge sync', owner: 'Knowledge Hub', status: 'Monitoring', latency: '2.6s', updated: '8 min ago' },
  { workflow: 'Escalation queue', owner: 'Customer Care', status: 'Healthy', latency: '1.1s', updated: '12 min ago' },
  { workflow: 'Compliance check', owner: 'Risk Team', status: 'Delayed', latency: '4.9s', updated: '26 min ago' },
];

export default function SessionsPage() {
  const { sessions } = useAppStore();

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, minHeight: '100vh', background: 'linear-gradient(180deg, #f4f7fb 0%, #eef4ff 100%)' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
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

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Operations summary
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Workflow</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Latency</TableCell>
                  <TableCell>Updated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {demoRows.map((row) => (
                  <TableRow key={row.workflow} hover>
                    <TableCell>{row.workflow}</TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        color={
                          row.status === 'Healthy'
                            ? 'success'
                            : row.status === 'Monitoring'
                              ? 'warning'
                              : 'error'
                        }
                      />
                    </TableCell>
                    <TableCell>{row.latency}</TableCell>
                    <TableCell>{row.updated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Recent sessions
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Session</TableCell>
                  <TableCell>Updated</TableCell>
                  <TableCell>Mode</TableCell>
                  <TableCell>Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>No session history yet.</TableCell>
                  </TableRow>
                ) : (
                  sessions.map((session) => (
                    <TableRow key={session.id} hover>
                      <TableCell>{session.title}</TableCell>
                      <TableCell>{new Date(session.updatedAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip label="AI assist" size="small" color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Chip label="Complete" size="small" color="success" />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
