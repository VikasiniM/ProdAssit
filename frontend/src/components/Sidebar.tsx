import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import type { SessionSummary } from '../types/api';

type Props = {
  sessions: SessionSummary[];
  selectedSessionId: string;
  onSelectSession: (sessionId: string) => void;
};

export default function Sidebar({ sessions, selectedSessionId, onSelectSession }: Props) {
  return (
    <Box sx={{ width: 280, borderRight: 1, borderColor: 'divider', minHeight: '100vh', p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Sessions
      </Typography>

      <List disablePadding>
        {sessions.length === 0 ? (
          <ListItem>
            <ListItemText primary="No session history yet" secondary="Ask a question to begin." />
          </ListItem>
        ) : (
          sessions.map((session) => (
            <ListItem key={session.id} disablePadding>
              <ListItemButton
                selected={session.id === selectedSessionId}
                onClick={() => onSelectSession(session.id)}
              >
                <ListItemText
                  primary={session.title}
                  secondary={new Date(session.updatedAt).toLocaleString()}
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="caption" color="text.secondary">
        ProdAssist AI Assistant
      </Typography>
    </Box>
  );
}
