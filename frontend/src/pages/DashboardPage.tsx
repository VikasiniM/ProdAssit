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
  TableContainer,
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

const filters = ['All', 'Ops', 'Support', 'AI', 'Compliance'];

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
const trendSeries = [68, 80, 62, 90, 76, 88, 94];
const operationRows = [
  { workflow: 'Support intake', owner: 'Ops Team', status: 'Healthy', sla: '94%', throughput: '2.4k/hr', group: 'Ops' },
  { workflow: 'Risk review', owner: 'Compliance', status: 'Monitoring', sla: '87%', throughput: '1.8k/hr', group: 'Compliance' },
  { workflow: 'Knowledge sync', owner: 'AI Platform', status: 'Delayed', sla: '72%', throughput: '1.1k/hr', group: 'AI' },
  { workflow: 'Escalation queue', owner: 'Customer Care', status: 'Healthy', sla: '96%', throughput: '3.1k/hr', group: 'Support' },
];
const reportCards = [
  { title: 'Resolved tickets', value: '2,480', delta: '+8.3%' },
  { title: 'Knowledge coverage', value: '92%', delta: '+3.7%' },
  { title: 'Automation rate', value: '73%', delta: '+5.1%' },
  { title: 'Escalation time', value: '17m', delta: '-2.1%' },
];

export default function DashboardPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const isDark = themeMode === 'dark';
  const pageBackground = isDark
    ? 'linear-gradient(180deg, #020817 0%, #0f172a 100%)'
    : 'linear-gradient(180deg, #f4f7fb 0%, #eef4ff 100%)';
  const panelBackground = isDark ? '#0f172a' : '#ffffff';
  const panelBorder = isDark ? 'rgba(148, 163, 184, 0.18)' : '#e2e8f0';
  const textColor = isDark ? '#e2e8f0' : '#0f172a';
  const secondaryText = isDark ? '#94a3b8' : '#475569';
  const surfaceColor = isDark ? '#111827' : '#f8fafc';
  const inputBackground = isDark ? '#0b1120' : '#ffffff';

  const visibleRows = useMemo(() => {
    if (selectedFilter === 'All') return operationRows;
    return operationRows.filter((row) => row.group === selectedFilter);
  }, [selectedFilter]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, minHeight: '100vh', background: pageBackground, color: textColor }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
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
          <IconButton
            size="small"
            onClick={() => setThemeMode((current) => (current === 'light' ? 'dark' : 'light'))}
            sx={{ backgroundColor: alpha('#ffffff', isDark ? 0.06 : 0.9), border: `1px solid ${panelBorder}` }}
          >
            {isDark ? <Brightness7Rounded /> : <Brightness4Rounded />}
          </IconButton>
          <IconButton
            size="small"
            sx={{ backgroundColor: alpha('#ffffff', isDark ? 0.06 : 0.9), border: `1px solid ${panelBorder}` }}
          >
            <NotificationsNoneRounded />
          </IconButton>
          <Avatar sx={{ bgcolor: isDark ? '#1e293b' : '#0f172a', width: 38, height: 38 }}>VP</Avatar>
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <ToggleButtonGroup
          value={selectedFilter}
          exclusive
          onChange={(_, value) => value && setSelectedFilter(value)}
          size="small"
          sx={{ flexWrap: 'wrap', gap: 1 }}
        >
          {filters.map((filter) => (
            <ToggleButton
              key={filter}
              value={filter}
              sx={{
                borderRadius: 999,
                borderColor: panelBorder,
                color: textColor,
                backgroundColor: selectedFilter === filter ? alpha('#3b82f6', isDark ? 0.18 : 0.12) : 'transparent',
              }}
            >
              {filter}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Chip label="System healthy" color="success" />
      </Stack>

      <Grid container spacing={3}>
        {stats.map(({ label, value, change, icon: Icon }) => (
          <Grid item xs={12} sm={6} md={3} key={label}>
            <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" color={secondaryText}>
                      {label}
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1, color: textColor }}>
                      {value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: isDark ? '#1e293b' : '#e0ecff', color: textColor, width: 44, height: 44 }}>
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
          <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ color: textColor }}>Workflow health</Typography>
                <Assessment color="primary" />
              </Stack>

              {workflows.map((item) => (
                <Box key={item.name} sx={{ mb: 3 }}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography fontWeight={500} sx={{ color: textColor }}>{item.name}</Typography>
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
                      backgroundColor: isDark ? '#1e293b' : '#e2e8f0',
                      '& .MuiLinearProgress-bar': { backgroundColor: item.color },
                    }}
                  />
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
                  {activities.map((item) => (
                    <ListItem key={item} disableGutters sx={{ px: 0 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Timeline fontSize="small" color="primary" />
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ variant: 'body2', color: textColor }}
                        />
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
          <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ color: textColor }}>Throughput trend</Typography>
                <Chip label="+14.8%" color="success" />
              </Stack>

              <Stack direction="row" spacing={1} alignItems="flex-end" sx={{ minHeight: 180, px: 0.5 }}>
                {trendSeries.map((value, index) => (
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
                    <Typography variant="caption" color={secondaryText} sx={{ mt: 1 }}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ color: textColor }}>Operations pulse</Typography>
                <MonitorHeart color="success" />
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1, color: textColor }}>
                  96.8%
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight={700}>
                  service confidence
                </Typography>
              </Stack>
              <Typography variant="body2" color={secondaryText} sx={{ mt: 2 }}>
                Critical systems are operational, and the AI workflow is tracking within expected SLA bands.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: textColor }}>
              Workflow operations
            </Typography>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: secondaryText }}>Workflow</TableCell>
                  <TableCell sx={{ color: secondaryText }}>Owner</TableCell>
                  <TableCell sx={{ color: secondaryText }}>Status</TableCell>
                  <TableCell sx={{ color: secondaryText }}>SLA</TableCell>
                  <TableCell sx={{ color: secondaryText }}>Throughput</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row.workflow} hover>
                    <TableCell sx={{ color: textColor }}>{row.workflow}</TableCell>
                    <TableCell sx={{ color: textColor }}>{row.owner}</TableCell>
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
                    <TableCell sx={{ color: textColor }}>{row.sla}</TableCell>
                    <TableCell sx={{ color: textColor }}>{row.throughput}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        {reportCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Card sx={{ background: panelBackground, border: `1px solid ${panelBorder}` }}>
              <CardContent>
                <Typography variant="body2" color={secondaryText}>{card.title}</Typography>
                <Typography variant="h5" sx={{ mt: 1, color: textColor }}>{card.value}</Typography>
                <Typography variant="caption" color="success.main" sx={{ mt: 0.5, display: 'block' }}>
                  {card.delta}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
