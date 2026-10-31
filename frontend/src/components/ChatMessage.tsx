import { Box, Chip, Divider, Paper, Stack, Typography } from '@mui/material';
import type { ChatMessage as ChatMessageType } from '../types/api';

type Props = {
  message: ChatMessageType;
};

export default function ChatMessage({ message }: Props) {
  const isAssistant = message.role === 'assistant';

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: isAssistant ? 'grey.100' : 'primary.main',
        color: isAssistant ? 'text.primary' : 'common.white',
        border: '1px solid',
        borderColor: isAssistant ? 'grey.200' : 'primary.dark',
      }}
    >
      <Stack spacing={1.5}>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          {isAssistant ? 'Assistant' : 'You'} • {new Date(message.createdAt).toLocaleTimeString()}
        </Typography>

        <Typography sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{message.content}</Typography>

        {message.toolsUsed && message.toolsUsed.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {message.toolsUsed.map((tool) => (
              <Chip key={tool} label={tool} size="small" color={isAssistant ? 'primary' : 'secondary'} />
            ))}
          </Stack>
        )}

        {message.memoryUsed && message.memoryUsed.length > 0 && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Memory used
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {message.memoryUsed.map((item) => (
                <Chip key={item} label={item} size="small" variant="outlined" />
              ))}
            </Stack>
          </Box>
        )}

        {message.executionTimeMs && (
          <Typography variant="caption" sx={{ opacity: 0.75 }}>
            Response time: {message.executionTimeMs} ms
          </Typography>
        )}

        {message.citations && message.citations.length > 0 && (
          <Box>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Citations
            </Typography>
            {message.citations.map((citation, index) => (
              <Box key={`${citation.source ?? 'citation'}-${index}`} sx={{ mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>
                  {citation.title ?? citation.source ?? `Source ${index + 1}`}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {citation.content ?? 'No snippet available.'}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Stack>
    </Paper>
  );
}
