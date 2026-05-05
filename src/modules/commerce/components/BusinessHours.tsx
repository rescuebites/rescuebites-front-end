import { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Typography,
  Switch,
  Stack,
  Divider,
  Paper,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { CalendarDays, Sunrise, SunMoon } from "lucide-react";

const GREEN = "#77A787";

interface Shift {
  enabled: boolean;
  open: string;
  close: string;
}

interface DayShifts {
  morning: Shift;
  afternoon: Shift;
}

type ShiftKey = keyof DayShifts;
type TimeField = "open" | "close";

interface Day {
  id: string;
  label: string;
  closed: boolean;
  shifts: DayShifts;
}

interface TimePickerTarget {
  dayId: string;
  shiftKey: ShiftKey;
  field: TimeField;
  current: string;
}

const greenSwitchSx = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: GREEN },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: GREEN },
};

// ─── TimePickerDialog ─────────────────────────────────────────────────────────

interface TimePickerDialogProps {
  target: TimePickerTarget | null;
  onClose: () => void;
  onConfirm: (
    dayId: string,
    shiftKey: ShiftKey,
    field: TimeField,
    value: string,
  ) => void;
}

const TimePickerDialog = ({
  target,
  onClose,
  onConfirm,
}: TimePickerDialogProps) => {
  // key en el padre fuerza el remount cuando cambia el target, reiniciando el estado
  const [value, setValue] = useState(target?.current ?? "08:00");

  const handleConfirm = () => {
    if (!target || !value) return;
    onConfirm(target.dayId, target.shiftKey, target.field, value);
    onClose();
  };

  return (
    <Dialog
      open={!!target}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle sx={{ pb: 1, fontWeight: 700, fontSize: "20px" }}>
        Seleccionar hora de {target?.field === "open" ? "apertura" : "cierre"}
      </DialogTitle>
      <DialogContent>
        <TextField
          type="time"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          inputProps={{ step: 60 }}
          fullWidth
          autoFocus
          sx={{ mt: 1, minWidth: 200 }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit" sx={{ fontSize: "17px" }}>
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{
            bgcolor: GREEN,
            "&:hover": { bgcolor: "#6e9254" },
            fontSize: "17px",
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─── TimeButton ───────────────────────────────────────────────────────────────

interface TimeButtonProps {
  label: string;
  value: string;
  onClick: () => void;
}

const TimeButton = ({ label, value, onClick }: TimeButtonProps) => (
  <Box>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ fontSize: "15px" }}
    >
      {label}
    </Typography>
    <Box
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        px: 1,
        py: 0.5,
        minWidth: 90,
        cursor: "pointer",
        transition: "border-color 0.15s",
        "&:hover": { borderColor: GREEN },
      }}
    >
      <Typography variant="body2" sx={{ fontSize: "17px" }}>
        {value}
      </Typography>
      <Typography variant="caption" sx={{ ml: "auto", opacity: 0.5 }}>
        🕐
      </Typography>
    </Box>
  </Box>
);

// ─── MorningShiftSection ──────────────────────────────────────────────────────
// Turno mañana siempre activo, sin switch, renombrado a "Turno mañana / único"

interface MorningShiftSectionProps {
  shift: Shift;
  onTimeClick: (field: TimeField) => void;
}

const MorningShiftSection = ({
  shift,
  onTimeClick,
}: MorningShiftSectionProps) => (
  <Box>
    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
      <Sunrise size={20} color="#888" />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: "17px" }}
      >
        Turno mañana / único
      </Typography>
    </Stack>
    <Stack direction="row" spacing={2}>
      <TimeButton
        label="Apertura"
        value={shift.open}
        onClick={() => onTimeClick("open")}
      />
      <TimeButton
        label="Cierre"
        value={shift.close}
        onClick={() => onTimeClick("close")}
      />
    </Stack>
  </Box>
);

// ─── AfternoonShiftSection ────────────────────────────────────────────────────
// Turno tarde opcional con switch

interface AfternoonShiftSectionProps {
  shift: Shift;
  onToggle: () => void;
  onTimeClick: (field: TimeField) => void;
}

const AfternoonShiftSection = ({
  shift,
  onToggle,
  onTimeClick,
}: AfternoonShiftSectionProps) => (
  <Box>
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <SunMoon size={20} color="#888" />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "19px" }}
        >
          Turno tarde
        </Typography>
      </Stack>
      <Switch
        size="small"
        checked={shift.enabled}
        onChange={onToggle}
        sx={greenSwitchSx}
        onClick={(e) => e.stopPropagation()} // Para que no se propague la hora seleccionada anteriormente
      />
    </Stack>
    <Collapse in={shift.enabled}>
      <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
        <TimeButton
          label="Apertura"
          value={shift.open}
          onClick={() => onTimeClick("open")}
        />
        <TimeButton
          label="Cierre"
          value={shift.close}
          onClick={() => onTimeClick("close")}
        />
      </Stack>
    </Collapse>
  </Box>
);

// ─── DayCard ──────────────────────────────────────────────────────────────────

interface DayCardProps {
  day: Day;
  isTemplate: boolean;
  onToggleDay: (dayId: string) => void;
  onToggleShift: (dayId: string, shiftKey: ShiftKey) => void;
  onTimeClick: (
    dayId: string,
    shiftKey: ShiftKey,
    field: TimeField,
    current: string,
  ) => void;
  onCopyTemplate: (dayId: string) => void;
}

const DayCard = ({
  day,
  isTemplate,
  onToggleDay,
  onToggleShift,
  onTimeClick,
  onCopyTemplate,
}: DayCardProps) => (
  <Paper
    variant="outlined"
    onClick={() => onCopyTemplate(day.id)}
    sx={{
      borderRadius: 2,
      overflow: "hidden",
      borderColor: isTemplate ? GREEN : undefined,
      borderWidth: isTemplate ? 2 : 1,
      cursor: "pointer",
    }}
  >
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: 2, py: 1.5 }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <CalendarDays size={17} color="#555" />
        <Typography
          variant="subtitle2"
          fontWeight={700}
          sx={{ fontSize: "18px" }}
        >
          {day.label}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: "16px" }}
        >
          Abierto
        </Typography>
        <Switch
          size="small"
          checked={!day.closed}
          onChange={() => onToggleDay(day.id)}
          sx={greenSwitchSx}
          onClick={(e) => e.stopPropagation()}
        />
      </Stack>
    </Stack>

    <Collapse in={!day.closed}>
      <Divider />
      <Stack spacing={1.5} sx={{ px: 2, py: 1.5 }}>
        <MorningShiftSection
          shift={day.shifts.morning}
          onTimeClick={(field) =>
            onTimeClick(day.id, "morning", field, day.shifts.morning[field])
          }
        />
        <Divider />
        <AfternoonShiftSection
          shift={day.shifts.afternoon}
          onToggle={() => onToggleShift(day.id, "afternoon")}
          onTimeClick={(field) =>
            onTimeClick(day.id, "afternoon", field, day.shifts.afternoon[field])
          }
        />
      </Stack>
    </Collapse>
  </Paper>
);

// ─── Estado inicial ───────────────────────────────────────────────────────────

const makeShifts = (afternoonEnabled = false): DayShifts => ({
  morning: { enabled: true, open: "08:00", close: "12:00" },
  afternoon: { enabled: afternoonEnabled, open: "15:00", close: "20:00" },
});

const INITIAL_DAYS: Day[] = [
  { id: "monday", label: "Lunes", closed: false, shifts: makeShifts(true) },
  { id: "tuesday", label: "Martes", closed: false, shifts: makeShifts() },
  { id: "wednesday", label: "Miércoles", closed: false, shifts: makeShifts() },
  { id: "thursday", label: "Jueves", closed: false, shifts: makeShifts() },
  { id: "friday", label: "Viernes", closed: false, shifts: makeShifts() },
  { id: "saturday", label: "Sábado", closed: true, shifts: makeShifts() },
  { id: "sunday", label: "Domingo", closed: true, shifts: makeShifts() },
];

// ─── Componente principal ─────────────────────────────────────────────────────

interface BusinessHoursProps {
  days: Day[];
  onDaysChange: Dispatch<SetStateAction<Day[]>>;
}

export default function CommerceBusinessHours({
  days,
  onDaysChange,
}: BusinessHoursProps) {
  const [pickerTarget, setPickerTarget] = useState<TimePickerTarget | null>(
    null,
  );

  const templateId = days.find((d) => !d.closed)?.id;

  // Al hacer click en cualquier card que no sea el template,
  // replica los horarios del template a todos los días abiertos
  const handleCopyTemplate = (dayId: string): void => {
    if (!templateId || dayId === templateId) return;
    const template = days.find((d) => d.id === templateId);
    if (!template) return;

    onDaysChange((prev) =>
      prev.map((d) =>
        d.id === templateId || d.closed
          ? d
          : { ...d, shifts: JSON.parse(JSON.stringify(template.shifts)) },
      ),
    );
  };

  const handleToggleDay = (dayId: string): void => {
    onDaysChange((prev) =>
      prev.map((d) => (d.id === dayId ? { ...d, closed: !d.closed } : d)),
    );
  };

  const handleToggleShift = (dayId: string, shiftKey: ShiftKey): void => {
    onDaysChange((prev) =>
      prev.map((d) => {
        if (d.id !== dayId) return d;
        return {
          ...d,
          shifts: {
            ...d.shifts,
            [shiftKey]: {
              ...d.shifts[shiftKey],
              enabled: !d.shifts[shiftKey].enabled,
            },
          },
        };
      }),
    );
  };

  // Pasa el valor actual del campo para que el picker lo muestre correctamente
  const handleTimeClick = (
    dayId: string,
    shiftKey: ShiftKey,
    field: TimeField,
    current: string,
  ): void => {
    setPickerTarget({ dayId, shiftKey, field, current });
  };

  const handleTimeConfirm = (
    dayId: string,
    shiftKey: ShiftKey,
    field: TimeField,
    value: string,
  ): void => {
    onDaysChange((prev) =>
      prev.map((d) => {
        if (d.id !== dayId) return d;
        return {
          ...d,
          shifts: {
            ...d.shifts,
            [shiftKey]: { ...d.shifts[shiftKey], [field]: value },
          },
        };
      }),
    );
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", pb: 1 }}>
      <Stack spacing={1.5}>
        {days.map((day) => (
          <DayCard
            key={day.id}
            day={day}
            isTemplate={day.id === templateId}
            onToggleDay={handleToggleDay}
            onToggleShift={handleToggleShift}
            onTimeClick={handleTimeClick}
            onCopyTemplate={handleCopyTemplate}
          />
        ))}
      </Stack>

      {/* key fuerza el remount del Dialog cuando cambia el target,
          garantizando que los selects se inicialicen con el valor correcto */}
      <TimePickerDialog
        key={
          pickerTarget
            ? `${pickerTarget.dayId}-${pickerTarget.shiftKey}-${pickerTarget.field}`
            : "closed"
        }
        target={pickerTarget}
        onClose={() => setPickerTarget(null)}
        onConfirm={handleTimeConfirm}
      />
    </Box>
  );
}

export type { Day };
export { INITIAL_DAYS };
