import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import type { EvidenceCitation } from '../types/api';

type Props = {
  citations: EvidenceCitation[];
};

export default function CitationList({ citations }: Props) {
  if (!citations.length) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Citations
      </Typography>
      <List dense>
        {citations.map((citation, index) => (
          <ListItem key={`${citation.source ?? 'citation'}-${index}`} disableGutters>
            <ListItemText
              primary={citation.title ?? citation.source ?? `Source ${index + 1}`}
              secondary={citation.content ?? 'No snippet available'}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
