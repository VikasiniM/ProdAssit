import React, { useMemo, useState } from 'react';
import {
  alpha,
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  Assessment,
  AutoAwesome,
  Brightness4Rounded,
  Brightness7Rounded,
  Group,
  MonitorHeart,
  NotificationsNoneRounded,
  SearchRounded,
  Speed,
  Timeline,
  WarningAmber,
} from '@mui/icons-material';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import EnterpriseMetricCard from '../components/EnterpriseMetricCard';

const filters = ['All', 'Ops', 'Support', 'AI', 'Compliance'];
const trendData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 52 },
  { name: 'Mar', value: 56 },
  { name: 'Apr', value: 64 },
  { name: 'May', value: 72 },
  { name: 'Jun', value: 80 },
  { name: 'Jul', value: 87 },
];

const workflowRows = [
  { workflow: 'Support intake', owner: 'Ops Team', status: 'Healthy', value: '94%', group: 'Ops' },
  { workflow: 'Risk review', owner: 'Compliance', status: 'Monitoring', value: '87%', group: 'Compliance' },
  { workflow: 'Knowledge sync', owner: 'AI Platform', status: 'Delayed', value: '72%', group: 'AI' },
  { workflow: 'Escalation queue', owner: 'Customer Care', status: 'Healthy', value: '96%', group: 'Support' },
];

const reportData = [
  { name: 'Resolved', value: 320 },
  { name: 'Queued', value: 210 },
  { name: 'Escalated', value: 96 },
  { name: 'Reviewed', value: 140 },
];

export default function DashboardPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const isDark = themeMode === 'dark';
  const pageBackground = isDark
    ? 'linear-gradient(180deg, #020817 0%, #0f172a 100%)'
    : 'linear-gradient(180deg, #f4f7fb 0%, #eef4ff 100%)';
  const panelBackground = isDark ? '#0f172a' : '#ffffff';
  const panelBorder = isDark ? 'rgba(148,163,184,0.17)' : '#e2e8f0';
  const textColor = isDark ? '#e2e8f0' : '#0f172a';
  const secondaryText = isDark ? '#94a3b8' : '#475569';
  const surfaceColor = isDark ? '#111827' : '#f8fafc';
  const inputBackground = isDark ? '#0b1120' : '#ffffff';

  const visibleRows = useMemo(() => {
    if (selectedFilter === 'All') return workflowRows;
    return workflowRows.filter((row) => row.group === selectedFilter);
  }, [selectedFilter]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, minHeight: '100vh', background: pageBackground, color: textColor }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="caption" color={secondaryText} sx={{ letterSpacing: 1.2 }}>
            ENTERPRISE AI PORTAL
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5, color: textColor }}>
            Operations overview
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ width: { xs: '100%', md: 'auto' } }}>
          <TextField
            size="small"
            placeholder="Search workflows"
            InputProps={{
              startAdornment: <SearchRounded fontSize="small" sx={{ mr: 1, color: secondaryText }} />,
            }}
            sx={{
              minWidth: { xs: '100%', md: 220 },
              backgroundColor: inputBackground,
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: inputBackground,
                color: textColor,
                borderRadius: 2,
              },
            }}
          />
          <Chip label="12 alerts" color="warning" variant={isDark ? 'filled' : 'outlined'} />
          <IconButton size="small" onClick={() => setThemeMode((current) => (current === 'light' ? 'dark' : 'light'))} sx={{ backgroundColor: alpha('#ffffff', isDark ? 0.06 : 0.9), border: `1px solid ${panelBorder}` }}>
            {isDark ? <Brightness7Rounded /> : <Brightness4Rounded />}
          </IconButton>
          <IconButton size="small" sx={{ backgroundColor: alpha('#ffffff', isDark ? 0.06 : 0.9), border: `1px solid ${panelBorder}` }}>
            <NotificationsNoneRounded />
          </IconButton>
          <Avatar sx={{ bgcolor: isDark ? '#1e293b' : '#0f172a', width: 38, height: 38 }}>VP</Avatar>
        </Stack>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <ToggleButtonGroup value={selectedFilter} exclusive onChange={(_, value) => value && setSelectedFilter(value)} size="small" sx={{ flexWrap: 'wrap', gap: 1 }}>
          {filters.map((filter) => (
            <ToggleButton key={filter} value={filter} sx={{ borderRadius: 999, borderColor: panelBorder, color: textColor, backgroundColor: selectedFilter === filter ? alpha('#3b82f6', isDark ? 0.18 : 0.12) : 'transparent' }}>
              {filter}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Chip label="System healthy" color="success" />
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <EnterpriseMetricCard title="Active sessions" value="128" change="+12.4%" icon={Group} tone="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EnterpriseMetricCard title="Avg response" value="1.4s" change="-8.2%" icon={Speed} tone="success" positive={false} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EnterpriseMetricCard title="Automation" value="87%" change="+5.1%" icon={AutoAwesome} tone="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EnterpriseMetricCard title="Alerts" value="14" change="Needs review" icon={WarningAmber} tone="warning" positive={false} />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ color: textColor }}>Workflow health</Typography>
                <Assessment color="primary" />
              </Stack>

              {workflowRows.map((item) => (
                <Box key={item.workflow} sx={{ mb: 3 }}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography fontWeight={500} sx={{ color: textColor }}>{item.workflow}</Typography>
                    <Chip label={item.status} size="small" color={item.status === 'Healthy' ? 'success' : item.status === 'Monitoring' ? 'warning' : 'error'} />
                  </Stack>
                  <LinearProgress variant="determinate" value={item.status === 'Healthy' ? 82 : item.status === 'Monitoring' ? 64 : 42} sx={{ height: 10, borderRadius: 999, backgroundColor: isDark ? '#1e293b' : '#e2e8f0', '& .MuiLinearProgress-bar': { backgroundColor: item.status === 'Healthy' ? '#16a34a' : item.status === 'Monitoring' ? '#f59e0b' : '#ef4444' } }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ color: textColor }}>AI assistant</Typography>
                <AutoAwesome color="primary" />
              </Stack>

              <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                Ask about support bottlenecks, workflow summary, or performance signals.
              </Alert>

              <Box sx={{ p: 2, background: surfaceColor, borderRadius: 2, border: `1px solid ${panelBorder}` }}>
                <Typography variant="subtitle2" sx={{ color: textColor }}>Latest request</Typography>
                <Typography variant="body2" sx={{ mt: 1, color: textColor }}>
                  “Summarize the current support backlog and identify likely blockers.”
                </Typography>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" sx={{ color: textColor }}>Recent activity</Typography>
                <List disablePadding sx={{ mt: 1.5 }}>
                  {['Issue review', 'Knowledge refresh', 'Model validation', 'Workflow update'].map((item) => (
                    <ListItem key={item} disableGutters sx={{ px: 0 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Timeline fontSize="small" color="primary" />
                        <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2', color: textColor }} />
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
        <Grid item xs={12} lg={8}>
          <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: textColor, mb: 2 }}>Volume trend</Typography>
              <Box sx={{ width: '100%', height: 260 }}>
                <ResponsiveContainer>
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#cbd5e1'} />
                    <XAxis dataKey="name" stroke={secondaryText} />
                    <YAxis stroke={secondaryText} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#2563eb" fill="url(#trendFill)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: textColor, mb: 2 }}>Workflow mix</Typography>
              <Box sx={{ width: '100%', height: 260 }}>
                <ResponsiveContainer>
                  <BarChart data={reportData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#cbd5e1'} />
                    <XAxis dataKey="name" stroke={secondaryText} />
                    <YAxis stroke={secondaryText} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ color: textColor }}>Workflow operations</Typography>
              <Chip label="Live monitoring" color="primary" variant="outlined" />
            </Stack>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: secondaryText }}>Workflow</TableCell>
                  <TableCell sx={{ color: secondaryText }}>Owner</TableCell>
                  <TableCell sx={{ color: secondaryText }}>Status</TableCell>
                  <TableCell sx={{ color: secondaryText }}>SLA</TableCell>
                  <TableCell sx={{ color: secondaryText }}>Latency</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row.workflow} hover>
                    <TableCell sx={{ color: textColor }}>{row.workflow}</TableCell>
                    <TableCell sx={{ color: textColor }}>{row.owner}</TableCell>
                    <TableCell>
                      <Chip label={row.status} size="small" color={row.status === 'Healthy' ? 'success' : row.status === 'Monitoring' ? 'warning' : 'error'} />
                    </TableCell>
                    <TableCell sx={{ color: textColor }}>{row.value}</TableCell>
                    <TableCell sx={{ color: textColor }}>{row.status === 'Healthy' ? '1.3s' : row.status === 'Monitoring' ? '2.1s' : '4.7s'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
            <CardContent>
              <Typography variant="body2" color={secondaryText}>Resolved tickets</Typography>
              <Typography variant="h5" sx={{ mt: 1, color: textColor }}>2,480</Typography>
              <Typography variant="caption" color="success.main" sx={{ mt: 0.5, display: 'block' }}>+8.3%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
            <CardContent>
              <Typography variant="body2" color={secondaryText}>Knowledge coverage</Typography>
              <Typography variant="h5" sx={{ mt: 1, color: textColor }}>92%</Typography>
              <Typography variant="caption" color="success.main" sx={{ mt: 0.5, display: 'block' }}>+3.7%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
            <CardContent>
              <Typography variant="body2" color={secondaryText}>Automation rate</Typography>
              <Typography variant="h5" sx={{ mt: 1, color: textColor }}>73%</Typography>
              <Typography variant="caption" color="success.main" sx={{ mt: 0.5, display: 'block' }}>+5.1%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
            <CardContent>
              <Typography variant="body2" color={secondaryText}>Escalation time</Typography>
              <Typography variant="h5" sx={{ mt: 1, color: textColor }}>17m</Typography>
              <Typography variant="caption" color="success.main" sx={{ mt: 0.5, display: 'block' }}>-2.1%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ color: textColor }}>Operations pulse</Typography>
              <MonitorHeart color="success" />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1, color: textColor }}>96.8%</Typography>
              <Typography variant="body2" color="success.main" fontWeight={700}>service confidence</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
