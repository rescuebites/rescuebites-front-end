import { useState, ReactNode } from "react";
import { Box, Collapse } from "@mui/material";
import SectionHeader from "./SectionHeader";

interface Props {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <Box>
      <SectionHeader title={title} onClick={handleToggle} open={open} />

      <Collapse in={open}>
        <Box mt={1}>{children}</Box>
      </Collapse>
    </Box>
  );
}