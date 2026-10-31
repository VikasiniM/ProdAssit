import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import type { ElementType } from 'react';

type Props = {
  title: string;
  value: string;
  change: string;
  icon: ElementType;
  positive?: boolean;
  tone?: 'primary' | 'success' | 'warning' | 'error';
};

export default function EnterpriseMetricCard({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
  tone = 'primary',
}: Props) {
  const colorMap = {
    primary: '#2563eb',
    success: '#16a34a',
    warning: '#f59e0b',
    error: '#ef4444',
  };

  return (
    <Card sx={{ height: '100%', border: '1px solid rgba(148,163,184,0.18)' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              background: `${colorMap[tone]}1A`,
              color: colorMap[tone],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon fontSize="small" />
          </Box>
        </Stack>

        <Chip
          label={change}
          size="small"
          sx={{
            mt: 2,
            backgroundColor: positive ? 'rgba(22,163,74,0.12)' : 'rgba(239,68,68,0.12)',
            color: positive ? 'success.main' : 'error.main',
          }}
        />
      </CardContent>
    </Card>
  );
}
