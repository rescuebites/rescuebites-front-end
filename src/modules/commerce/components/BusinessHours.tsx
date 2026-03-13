import { useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { CalendarDays, Sunrise, SunMoon, LucideProps } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const GREEN = "#77A787";

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const MINUTES = ["00", "15", "30", "45"];
const PERIODS = ["AM", "PM"];

// ─── Types ────────────────────────────────────────────────────────────────────

interface Shift {
  enabled: boolean;
  open: string;
  close: string;
}

interface DayShifts {
  morning: Shift;
  afternoon?: Shift;
}

type ShiftKey = keyof DayShifts;
type TimeField = "open" | "close";

interface Day {
  id: string;
  label: string;
  enabled: boolean;
  shifts: DayShifts | null;
}

interface TimePickerTarget {
  dayId: string;
  shiftKey: ShiftKey;
  field: TimeField;
  current: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const parseTime = (value: string) => {
  const [time, period] = value.split(" ");
  const [hour, minute] = time.split(":");
  return { hour, minute, period };
};

const formatTime = (hour: string, minute: string, period: string): string =>
  `${hour}:${minute} ${period}`;

// ─── Switch con color verde ───────────────────────────────────────────────────

const greenSwitchSx = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: GREEN },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: GREEN },
};

// ─── TimePickerDialog ─────────────────────────────────────────────────────────

interface TimePickerDialogProps {
  target: TimePickerTarget | null;
  onClose: () => void;
  onConfirm: (dayId: string, shiftKey: ShiftKey, field: TimeField, value: string) => void;
}

const TimePickerDialog = ({ target, onClose, onConfirm }: TimePickerDialogProps) => {
  const parsed = target ? parseTime(target.current) : { hour: "08", minute: "00", period: "AM" };
  const [hour, setHour] = useState(parsed.hour);
  const [minute, setMinute] = useState(parsed.minute);
  const [period, setPeriod] = useState(parsed.period);

  const handleConfirm = () => {
    if (!target) return;
    onConfirm(target.dayId, target.shiftKey, target.field, formatTime(hour, minute, period));
    onClose();
  };

  return (
    <Dialog open={!!target} onClose={onClose} PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
      <DialogTitle sx={{ pb: 1, fontWeight: 700 }}>
        Seleccionar hora de {target?.field === "open" ? "apertura" : "cierre"}
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={1} alignItems="flex-end" sx={{ mt: 1 }}>
          <FormControl size="small">
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>Hora</Typography>
            <Select value={hour} onChange={(e: SelectChangeEvent) => setHour(e.target.value)} sx={{ minWidth: 70 }}>
              {HOURS.map((h) => <MenuItem key={h} value={h}>{h}</MenuItem>)}
            </Select>
          </FormControl>

          <Typography variant="h5" sx={{ pb: 0.8 }}>:</Typography>

          <FormControl size="small">
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>Min</Typography>
            <Select value={minute} onChange={(e: SelectChangeEvent) => setMinute(e.target.value)} sx={{ minWidth: 70 }}>
              {MINUTES.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl size="small">
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>&nbsp;</Typography>
            <Select value={period} onChange={(e: SelectChangeEvent) => setPeriod(e.target.value)} sx={{ minWidth: 70 }}>
              {PERIODS.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">Cancelar</Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{ bgcolor: GREEN, "&:hover": { bgcolor: "#6e9254" } }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─── TimeRow ──────────────────────────────────────────────────────────────────

interface TimeRowProps {
  open: string;
  close: string;
  onFieldClick: (field: TimeField) => void;
}

const TimeRow = ({ open, close, onFieldClick }: TimeRowProps) => (
  <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
    {([
      { label: "Apertura", value: open,  field: "open"  as TimeField },
      { label: "Cierre",   value: close, field: "close" as TimeField },
    ]).map(({ label, value, field }) => (
      <Box key={label}>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Box
          onClick={() => onFieldClick(field)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            px: 1,
            py: 0.5,
            minWidth: 110,
            cursor: "pointer",
            transition: "border-color 0.15s",
            "&:hover": { borderColor: GREEN },
          }}
        >
          <Typography variant="body2">{value}</Typography>
          <Typography variant="caption" sx={{ ml: "auto", opacity: 0.5 }}>🕐</Typography>
        </Box>
      </Box>
    ))}
  </Stack>
);

// ─── ShiftRow ─────────────────────────────────────────────────────────────────

interface ShiftRowProps {
  icon: React.ComponentType<LucideProps>;
  label: string;
  shift: Shift;
  onToggle: () => void;
  onFieldClick: (field: TimeField) => void;
}

const ShiftRow = ({ icon: Icon, label, shift, onToggle, onFieldClick }: ShiftRowProps) => (
  <Box>
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Icon size={14} color="#888" />
        <Typography variant="body2" color="text.secondary">{label}</Typography>
      </Stack>
      <Switch size="small" checked={shift.enabled} onChange={onToggle} sx={greenSwitchSx} />
    </Stack>
    <Collapse in={shift.enabled}>
      <TimeRow open={shift.open} close={shift.close} onFieldClick={onFieldClick} />
    </Collapse>
  </Box>
);

// ─── DayCard ──────────────────────────────────────────────────────────────────

interface DayCardProps {
  day: Day;
  isTemplate: boolean;
  onToggleDay: (dayId: string) => void;
  onToggleShift: (dayId: string, shiftKey: ShiftKey) => void;
  onFieldClick: (dayId: string, shiftKey: ShiftKey, field: TimeField, current: string) => void;
  onCardClick: (dayId: string) => void;
}

const DayCard = ({ day, isTemplate, onToggleDay, onToggleShift, onFieldClick, onCardClick }: DayCardProps) => (
  <Paper
    variant="outlined"
    onClick={() => onCardClick(day.id)}
    sx={{
      borderRadius: 2,
      overflow: "hidden",
      borderColor: isTemplate ? GREEN : undefined,
      borderWidth: isTemplate ? 2 : 1,
    }}
  >
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <CalendarDays size={16} color="#555" />
        <Typography variant="subtitle2" fontWeight={700}>{day.label}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography variant="caption" color="text.secondary">Abierto</Typography>
        <Switch
          size="small"
          checked={!day.enabled}
          onChange={() => onToggleDay(day.id)}
          sx={greenSwitchSx}
        />
      </Stack>
    </Stack>

    {day.shifts && (
      <Collapse in={!day.enabled}>
        <Divider />
        <Stack spacing={1.5} sx={{ px: 2, py: 1.5 }}>
          <ShiftRow
            icon={Sunrise}
            label="Turno mañana"
            shift={day.shifts.morning}
            onToggle={() => onToggleShift(day.id, "morning")}
            onFieldClick={(field) =>
              onFieldClick(day.id, "morning", field, day.shifts!.morning[field])
            }
          />
          {day.shifts.afternoon && (
            <>
              <Divider />
              <ShiftRow
                icon={SunMoon}
                label="Turno tarde"
                shift={day.shifts.afternoon}
                onToggle={() => onToggleShift(day.id, "afternoon")}
                onFieldClick={(field) =>
                  onFieldClick(day.id, "afternoon", field, day.shifts!.afternoon![field])
                }
              />
            </>
          )}
        </Stack>
      </Collapse>
    )}
  </Paper>
);

// ─── Datos iniciales ──────────────────────────────────────────────────────────

const makeShifts = (morningEnabled = true, afternoonEnabled = false): DayShifts => ({
  morning:   { enabled: morningEnabled,   open: "08:00 AM", close: "12:00 PM" },
  afternoon: { enabled: afternoonEnabled, open: "03:00 PM", close: "08:00 PM" },
});

const INITIAL_DAYS: Day[] = [
  { id: "monday",    label: "Lunes",     enabled: false, shifts: makeShifts(true, true)  },
  { id: "tuesday",   label: "Martes",    enabled: false, shifts: makeShifts(true, false) },
  { id: "wednesday", label: "Miércoles", enabled: false,  shifts: makeShifts()            },
  { id: "thursday",  label: "Jueves",    enabled: false,  shifts: makeShifts()            },
  { id: "friday",    label: "Viernes",   enabled: false,  shifts: makeShifts()            },
  { id: "saturday",  label: "Sábado",    enabled: true,  shifts: makeShifts()            },
  { id: "sunday",    label: "Domingo",   enabled: true,  shifts: makeShifts()            },
];

// ─── Componente principal ─────────────────────────────────────────────────────

export default function CommerceBusinessHours() {
  const [days, setDays] = useState<Day[]>(INITIAL_DAYS);
  const [pickerTarget, setPickerTarget] = useState<TimePickerTarget | null>(null);

  // ID del primer día habilitado (actúa como plantilla para el autocompletado)
  const templateId: string | undefined = days.find((d) => !d.enabled)?.id;

  // Cuando el usuario hace click en un día distinto al template,
  // propaga los shifts del template al resto de días habilitados.
  const handleCardClick = (dayId: string): void => {
    if (!templateId || dayId === templateId) return;
    const template = days.find((d) => d.id === templateId);
    if (!template?.shifts) return;

    setDays((prev) =>
      prev.map((d) =>
        d.id === templateId || !d.shifts
          ? d
          : { ...d, shifts: JSON.parse(JSON.stringify(template.shifts)) }
      )
    );
  };

  const toggleDay = (dayId: string): void => {
    setDays((prev) =>
      prev.map((d) => (d.id === dayId ? { ...d, enabled: !d.enabled } : d))
    );
  };

  const toggleShift = (dayId: string, shiftKey: ShiftKey): void => {
    setDays((prev) =>
      prev.map((d) => {
        if (d.id !== dayId || !d.shifts || !d.shifts[shiftKey]) return d;
        return {
          ...d,
          shifts: {
            ...d.shifts,
            [shiftKey]: { ...d.shifts[shiftKey]!, enabled: !d.shifts[shiftKey]!.enabled },
          },
        };
      })
    );
  };

  const handleFieldClick = (
    dayId: string,
    shiftKey: ShiftKey,
    field: TimeField,
    current: string
  ): void => {
    setPickerTarget({ dayId, shiftKey, field, current });
  };

  const handleTimeConfirm = (
    dayId: string,
    shiftKey: ShiftKey,
    field: TimeField,
    value: string
  ): void => {
    setDays((prev) =>
      prev.map((d) => {
        if (d.id !== dayId || !d.shifts || !d.shifts[shiftKey]) return d;
        return {
          ...d,
          shifts: {
            ...d.shifts,
            [shiftKey]: { ...d.shifts[shiftKey]!, [field]: value },
          },
        };
      })
    );
  };

  return (
    <Box sx={{ maxWidth: 340, mx: "auto", pb: 2, pr:2, pl:2 }}>
      <Typography variant="h6" fontWeight={600} fontSize={"26px"} gutterBottom >
        Horarios de atención
      </Typography>

      {templateId && (
        <Typography variant="caption" color="#999999" sx={{ display: "block", mb: 1.5 }}>
          Los horarios del primer día activo se copiarán al resto automáticamente.
        </Typography>
      )}

      <Stack spacing={1.5}>
        {days.map((day) => (
          <DayCard
            key={day.id}
            day={day}
            isTemplate={day.id === templateId}
            onToggleDay={toggleDay}
            onToggleShift={toggleShift}
            onFieldClick={handleFieldClick}
            onCardClick={handleCardClick}
          />
        ))}
      </Stack>

      <Box sx={{ mt: 3 }}>
        <Box
          component="button"
          sx={{
            bgcolor: "#6da17e",
            color: "#fff",
            border: "none",
            borderRadius: 2,
            px: 4,
            py: 1.2,
            fontSize: "18px",
            fontWeight: 550,
            cursor: "pointer",
            width: "100%",
            "&:hover": { bgcolor: "#77A787" },
          }}
        >
          Registrar Comercio
        </Box>
      </Box>

      <TimePickerDialog
        target={pickerTarget}
        onClose={() => setPickerTarget(null)}
        onConfirm={handleTimeConfirm}
      />
    </Box>
  );
}