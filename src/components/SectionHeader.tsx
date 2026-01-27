import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
}

export default function SectionHeader({ title }: Props) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1.5,
        mb: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",      
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={600}
        letterSpacing={0.5}
      >
        {title}
      </Typography>
    </Box>
  );
}
