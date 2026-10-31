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
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { name: 'Jan', volume: 18, conversion: 65 },
  { name: 'Feb', volume: 25, conversion: 72 },
  { name: 'Mar', volume: 23, conversion: 70 },
  { name: 'Apr', volume: 36, conversion: 80 },
  { name: 'May', volume: 42, conversion: 84 },
  { name: 'Jun', volume: 50, conversion: 88 },
  { name: 'Jul', volume: 48, conversion: 91 },
];

const reportRows = [
  { region: 'North America', coverage: '94%', revenue: '$420K', status: 'Healthy' },
  { region: 'Europe', coverage: '89%', revenue: '$381K', status: 'Stable' },
  { region: 'APAC', coverage: '91%', revenue: '$448K', status: 'Healthy' },
  { region: 'LATAM', coverage: '76%', revenue: '$214K', status: 'Watch' },
];

export default function ReportsPage() {
  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: 'linear-gradient(180deg, #f4f7fb 0%, #eef4ff 100%)' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1.2 }}>
            REPORTS
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5 }}>
            Performance intelligence
          </Typography>
        </Box>
        <Chip label="Q3 summary" color="primary" variant="outlined" />
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Demand trend
              </Typography>
              <Box sx={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Area type="monotone" dataKey="volume" stroke="#2563eb" fill="url(#colorVolume)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Conversion rate
              </Typography>
              <Box sx={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Area type="monotone" dataKey="conversion" stroke="#16a34a" fill="#86efac" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Regional performance
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Region</TableCell>
                    <TableCell>Coverage</TableCell>
                    <TableCell>Revenue</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportRows.map((row) => (
                    <TableRow key={row.region} hover>
                      <TableCell>{row.region}</TableCell>
                      <TableCell>{row.coverage}</TableCell>
                      <TableCell>{row.revenue}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          size="small"
                          color={row.status === 'Healthy' ? 'success' : row.status === 'Stable' ? 'primary' : 'warning'}
                        />
                      </TableCell>
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
