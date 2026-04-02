import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CustomTitle from "@/shared/components/CustomTitle";

interface PreferencesCheckboxListProps {
  preferences: string[];
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export default function PreferencesCheckboxList({
  preferences,
  options,
  onChange,
}: PreferencesCheckboxListProps) {
  return (
    <Box >
      <CustomTitle
        variant="h6"
        align="left"
        text="Preferencias alimenticias"
      />
      <Grid container spacing={2}>
        {options.map((option) => (
          <Grid size={{ xs: 12, md: 6 }} key={option.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.includes(option.value)}
                  onChange={() => onChange(option.value)}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                  sx={{
                    color: "#77A787",
                    "&.Mui-checked": { color: "#77A787" },
                  }}
                />
              }
              label={option.label}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
