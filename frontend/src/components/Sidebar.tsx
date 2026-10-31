import {
  alpha,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import {
  ChevronLeftRounded,
  ChevronRightRounded,
  ChatRounded,
  DashboardRounded,
  HistoryRounded,
  SettingsRounded,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import type { SessionSummary } from '../types/api';

type Props = {
  sessions: SessionSummary[];
  selectedSessionId: string;
  onSelectSession: (sessionId: string) => void;
};

const navItems = [
  { label: 'Overview', icon: DashboardRounded, path: '/' },
  { label: 'Assistant', icon: ChatRounded, path: '/chat' },
  { label: 'Sessions', icon: HistoryRounded, path: '/sessions' },
  { label: 'Settings', icon: SettingsRounded, path: '/login' },
];

export default function Sidebar({ sessions, selectedSessionId, onSelectSession }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const isCollapsed = false;

  return (
    <Box
      sx={{
        width: isCollapsed ? 88 : 280,
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0b1120 0%, #111827 100%)',
        color: '#e2e8f0',
        borderRight: '1px solid rgba(148, 163, 184, 0.2)',
        p: 2,
        transition: 'width 0.2s ease',
      }}
    >
      <Stack spacing={2.5} sx={{ height: '100%' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={isCollapsed ? 'center' : 'flex-start'}
          spacing={1.5}
          sx={{ px: 1.25, py: 1 }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: 1.5,
              background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            P
          </Box>

          {!isCollapsed && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                ProdAssist
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Enterprise AI
              </Typography>
            </Box>
          )}
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: isCollapsed ? 'center' : 'flex-end' }}>
          <IconButton
            size="small"
            sx={{ color: '#dbeafe', backgroundColor: 'rgba(255,255,255,0.04)' }}
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? <ChevronRightRounded /> : <ChevronLeftRounded />}
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.2)' }} />

        <List disablePadding>
          {navItems.map(({ label, icon: Icon, path }) => (
            <ListItem key={label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={location.pathname === path}
                onClick={() => navigate(path)}
                sx={{
                  borderRadius: 2,
                  color: 'inherit',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  '&.Mui-selected': {
                    backgroundColor: alpha('#60a5fa', 0.18),
                    color: '#e0f2fe',
                  },
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.04),
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: isCollapsed ? 0 : 36 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.2)' }} />

        {!isCollapsed && (
          <Box>
            <Typography variant="caption" sx={{ px: 1.5, color: '#94a3b8', textTransform: 'uppercase' }}>
              Recent sessions
            </Typography>

            <List disablePadding sx={{ mt: 1 }}>
              {sessions.length === 0 ? (
                <ListItem disablePadding>
                  <ListItemText
                    primary="No sessions yet"
                    secondary="Start a conversation"
                    primaryTypographyProps={{ color: '#dbeafe', fontWeight: 500 }}
                    secondaryTypographyProps={{ color: '#94a3b8' }}
                  />
                </ListItem>
              ) : (
                sessions.slice(0, 5).map((session) => (
                  <ListItem key={session.id} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      selected={session.id === selectedSessionId}
                      onClick={() => onSelectSession(session.id)}
                      sx={{
                        borderRadius: 2,
                        '&.Mui-selected': {
                          backgroundColor: alpha('#60a5fa', 0.16),
                        },
                      }}
                    >
                      <ListItemText
                        primary={session.title}
                        secondary={new Date(session.updatedAt).toLocaleString()}
                        primaryTypographyProps={{ color: '#e2e8f0', fontWeight: 500 }}
                        secondaryTypographyProps={{ color: '#94a3b8' }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))
              )}
            </List>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
