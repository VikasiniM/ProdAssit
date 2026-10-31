import { Box, Typography } from '@mui/material';

export default function NotFoundPage() {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h6">Page not found.</Typography>
    </Box>
  );
}
