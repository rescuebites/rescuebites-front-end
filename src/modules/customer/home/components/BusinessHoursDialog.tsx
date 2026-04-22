import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { BusinessHoursResponse } from "@/modules/commerce/interfaces/responses/business-hours.response";
import type { DayOfWeek } from "@/modules/commerce/interfaces/requests/business-hours.request";
import { DAY_ORDER, DAY_OF_WEEK_META } from "@/modules/commerce/utils/constants";

const JS_DAY_TO_DOW: DayOfWeek[] = [
  "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY",
];

function formatTime(time: string | null): string {
  if (!time) return "";
  return time.substring(0, 5); // "HH:mm:ss" → "HH:mm"
}

interface BusinessHoursDialogProps {
  open: boolean;
  onClose: () => void;
  businessHours: BusinessHoursResponse[];
  commerceName?: string;
}

export default function BusinessHoursDialog({
  open,
  onClose,
  businessHours,
  commerceName,
}: BusinessHoursDialogProps) {
  const todayDow = JS_DAY_TO_DOW[new Date().getDay()];
  const hoursByDay = new Map(businessHours.map((h) => [h.dayOfWeek, h]));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        <Typography variant="h6" fontWeight={600} color="#2D2D2D">
          Horarios{commerceName ? ` — ${commerceName}` : ""}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 2, pb: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {DAY_ORDER.map((dow) => {
            const isToday = dow === todayDow;
            const entry = hoursByDay.get(dow);
            const label = DAY_OF_WEEK_META[dow].label;

            let hoursText: string;
            if (!entry || entry.closed) {
              hoursText = "Cerrado";
            } else if (!entry.openTime || !entry.closeTime) {
              hoursText = "Horario no disponible";
            } else {
              const morning = `${formatTime(entry.openTime)} – ${formatTime(entry.closeTime)}`;
              const hasAfternoon = entry.afternoonOpenTime && entry.afternoonCloseTime;
              hoursText = hasAfternoon
                ? `${morning}  /  ${formatTime(entry.afternoonOpenTime)} – ${formatTime(entry.afternoonCloseTime)}`
                : morning;
            }

            const isClosed = !entry || entry.closed || !entry.openTime || !entry.closeTime;

            return (
              <Box
                key={dow}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: isToday ? "#EAF3EC" : "transparent",
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={isToday ? 700 : 400}
                  color={isToday ? "#2D7A47" : "#2D2D2D"}
                  sx={{ minWidth: 90 }}
                >
                  {label}
                  {isToday && (
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ ml: 0.75, color: "#2D7A47" }}
                    >
                      (hoy)
                    </Typography>
                  )}
                </Typography>

                <Typography
                  variant="body2"
                  color={isClosed ? "#B0B0B0" : isToday ? "#2D7A47" : "#555"}
                  fontWeight={isToday ? 600 : 400}
                  textAlign="right"
                >
                  {hoursText}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
