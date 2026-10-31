import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import type { AgentTraceStep } from '../types/api';

type Props = {
  trace: AgentTraceStep[];
};

export default function TracePanel({ trace }: Props) {
  if (!trace.length) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Trace
      </Typography>
      <List dense>
        {trace.map((step, index) => (
          <ListItem key={`${step.name}-${index}`} disableGutters>
            <ListItemText
              primary={`${step.name} — ${step.status}`}
              secondary={JSON.stringify(step.details ?? {}, null, 2)}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
