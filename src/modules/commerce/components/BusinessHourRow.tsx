import { Box } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import { formatTime } from "@/shared/utils/dateFormat";
import { DAY_LABELS } from "@/modules/commerce/utils/constants";
import type { BusinessHoursResponse } from "@/modules/commerce/interfaces/responses/business-hours.response";

export default function BusinessHourRow({ bh }: { bh: BusinessHoursResponse }) {
  const dayLabel = DAY_LABELS[bh.dayOfWeek] ?? bh.dayOfWeek;

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="space-between"
      mb={1.5}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: bh.closed ? "#9CA3AF" : "#5A9A6E",
            mt: 0.4,
            flexShrink: 0,
          }}
        />
        <CustomTitle
          text={dayLabel}
          variant="body2"
          color="#2D2D2D"
          fontWeight={500}
          align="left"
        />
      </Box>

      {bh.closed ? (
        <CustomTitle
          text="Cerrado"
          variant="body2"
          color="#9CA3AF"
          align="right"
          fontWeight="normal"
        />
      ) : (
        <Box textAlign="right">
          {bh.openTime && bh.closeTime && (
            <CustomTitle
              text={`${formatTime(bh.openTime)} a ${formatTime(bh.closeTime)}`}
              variant="body2"
              color="#6B7280"
              align="right"
              fontWeight="normal"
            />
          )}
          {bh.afternoonOpenTime && bh.afternoonCloseTime && (
            <CustomTitle
              text={`${formatTime(bh.afternoonOpenTime)} a ${formatTime(bh.afternoonCloseTime)}`}
              variant="body2"
              color="#6B7280"
              align="right"
              fontWeight="normal"
            />
          )}
        </Box>
      )}
    </Box>
  );
}
