import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

type Props = {
  onSubmit: (question: string) => void;
  disabled?: boolean;
};

export default function ChatComposer({ onSubmit, disabled = false }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue('');
  };

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        multiline
        minRows={2}
        maxRows={5}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask ProdAssist anything..."
        disabled={disabled}
      />
      <Button variant="contained" size="large" onClick={handleSubmit} disabled={disabled || !value.trim()}>
        Send
      </Button>
    </Stack>
  );
}
