import { Alert, Box, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import ChatComposer from '../components/ChatComposer';
import ChatMessage from '../components/ChatMessage';
import CitationList from '../components/CitationList';
import Sidebar from '../components/Sidebar';
import TracePanel from '../components/TracePanel';
import { useAssistantMutation } from '../hooks/useAssistantMutation';
import { useAppStore } from '../store/appStore';

export default function ChatPage() {
  const { sessionId, messages, appendMessage, sessions, setSessions } = useAppStore();
  const { mutate, isPending, error } = useAssistantMutation();
  const [activeResponse, setActiveResponse] = useState<any | null>(null);

  const handleSubmitQuestion = (question: string) => {
    const userMessage = {
      id: uuid(),
      role: 'user',
      content: question,
      createdAt: new Date().toISOString(),
    } as const;

    appendMessage(userMessage);

    mutate(
      { question, session_id: sessionId },
      {
        onSuccess: (response) => {
          const assistantMessage = {
            id: uuid(),
            role: 'assistant',
            content: response.answer,
            createdAt: new Date().toISOString(),
            citations: response.citations,
            trace: response.trace,
            toolsUsed: response.tools_used,
            memoryUsed: response.memory_used,
            executionTimeMs: response.execution_time_ms,
          };

          appendMessage(assistantMessage);
          setActiveResponse(response);

          const nextSessions = [
            {
              id: sessionId,
              title: question.slice(0, 30) || 'New session',
              updatedAt: new Date().toISOString(),
            },
            ...sessions,
          ];

          setSessions(nextSessions);
        },
        onError: (err) => {
          appendMessage({
            id: uuid(),
            role: 'assistant',
            content: err instanceof Error ? err.message : 'Request failed.',
            createdAt: new Date().toISOString(),
          });
        },
      }
    );
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f3f6fb' }}>
      <Sidebar
        sessions={sessions}
        selectedSessionId={sessionId}
        onSelectSession={() => undefined}
      />

      <Box sx={{ flex: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1.2 }}>
            ASSISTANT CONSOLE
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.75 }}>
            AI operations chat
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 2.5, borderRadius: 3, minHeight: 520, background: '#ffffff' }}>
              <Stack spacing={2}>
                {messages.length === 0 ? (
                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    Ask a question to begin your session.
                  </Alert>
                ) : (
                  messages.map((message) => <ChatMessage key={message.id} message={message} />)
                )}

                {isPending && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
                    <CircularProgress size={18} />
                    <Typography>Thinking...</Typography>
                  </Box>
                )}

                {error && <Alert severity="error">{String(error)}</Alert>}
              </Stack>

              <Box sx={{ mt: 2 }}>
                <ChatComposer onSubmit={handleSubmitQuestion} disabled={isPending} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 2.5, borderRadius: 3, background: '#ffffff' }}>
              {activeResponse ? (
                <>
                  <CitationList citations={activeResponse.citations ?? []} />
                  <TracePanel trace={activeResponse.trace ?? []} />
                </>
              ) : (
                <Typography color="text.secondary">No answer yet.</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
