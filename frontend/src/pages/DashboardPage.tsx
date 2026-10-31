import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
} from '@mui/material';
import {
  Assessment,
  AutoAwesome,
  Group,
  MonitorHeart,
  Speed,
  Timeline,
  WarningAmber,
} from '@mui/icons-material';

const stats = [
  { label: 'Active sessions', value: '128', change: '+12.4%', icon: Group },
  { label: 'Avg. response', value: '1.4s', change: '-8.2%', icon: Speed },
  { label: 'Automation', value: '87%', change: '+5.1%', icon: AutoAwesome },
  { label: 'Alerts', value: '14', change: 'Needs review', icon: WarningAmber },
];

const workflows = [
  { name: 'Customer intelligence', status: 'Healthy', progress: 82, color: '#16a34a' },
  { name: 'Support triage', status: 'Monitoring', progress: 64, color: '#f59e0b' },
  { name: 'Knowledge sync', status: 'Delayed', progress: 42, color: '#ef4444' },
];

const activities = ['Issue review', 'Knowledge refresh', 'Model validation', 'Workflow update'];

const chartSeries = [68, 80, 62, 90, 76, 88, 94];

const operationRows = [
  { workflow: 'Support intake', owner: 'Ops Team', status: 'Healthy', sla: '94%', throughput: '2.4k/hr' },
  { workflow: 'Risk review', owner: 'Compliance', status: 'Monitoring', sla: '87%', throughput: '1.8k/hr' },
  { workflow: 'Knowledge sync', owner: 'AI Platform', status: 'Delayed', sla: '72%', throughput: '1.1k/hr' },
  { workflow: 'Escalation queue', owner: 'Customer Care', status: 'Healthy', sla: '96%', throughput: '3.1k/hr' },
];

export default function DashboardPage() {
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
            ENTERPRISE AI PORTAL
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5 }}>
            Operations overview
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Chip label="System healthy" color="success" />
          <Avatar sx={{ bgcolor: '#0f172a', width: 38, height: 38 }}>VP</Avatar>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {stats.map(({ label, value, change, icon: Icon }) => (
          <Grid item xs={12} sm={6} md={3} key={label}>
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: '#e0ecff', color: '#0f172a', width: 44, height: 44 }}>
                    <Icon />
                  </Avatar>
                </Stack>
                <Typography variant="body2" color="primary" sx={{ mt: 2, fontWeight: 600 }}>
                  {change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">Workflow health</Typography>
                <Assessment color="primary" />
              </Stack>

              {workflows.map((item) => (
                <Box key={item.name} sx={{ mb: 3 }}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography fontWeight={500}>{item.name}</Typography>
                    <Chip
                      label={item.status}
                      size="small"
                      color={item.status === 'Healthy' ? 'success' : item.status === 'Monitoring' ? 'warning' : 'error'}
                    />
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={item.progress}
                    sx={{
                      height: 10,
                      borderRadius: 999,
                      backgroundColor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': { backgroundColor: item.color },
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h6">AI assistant</Typography>
                <AutoAwesome color="primary" />
              </Stack>

              <Alert severity="info" sx={{ mb: 2 }}>
                Ask about support bottlenecks, workflow summary, or performance signals.
              </Alert>

              <Box sx={{ p: 2, background: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                <Typography variant="subtitle2">Latest request</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  “Summarize the current support backlog and identify likely blockers.”
                </Typography>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2">Recent activity</Typography>
                <List disablePadding sx={{ mt: 1.5 }}>
                  {activities.map((item) => (
                    <ListItem key={item} disableGutters sx={{ px: 0 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Timeline fontSize="small" color="primary" />
                        <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
                      </Stack>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} lg={7}>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">Throughput trend</Typography>
                <Chip label="+14.8%" color="success" />
              </Stack>

              <Stack direction="row" spacing={1} alignItems="flex-end" sx={{ minHeight: 180, px: 0.5 }}>
                {chartSeries.map((value, index) => (
                  <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: 28,
                        height: `${value}%`,
                        minHeight: 18,
                        borderRadius: '8px 8px 0 0',
                        background: 'linear-gradient(180deg, #93c5fd 0%, #2563eb 100%)',
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">Operations pulse</Typography>
                <MonitorHeart color="success" />
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1 }}>
                  96.8%
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight={700}>
                  service confidence
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Critical systems are operational, and the AI workflow is tracking within expected SLA bands.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Workflow operations
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Workflow</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>SLA</TableCell>
                    <TableCell>Throughput</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {operationRows.map((row) => (
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
                      <TableCell>{row.sla}</TableCell>
                      <TableCell>{row.throughput}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
