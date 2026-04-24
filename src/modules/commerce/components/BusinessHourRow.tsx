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
      mb={2}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            bgcolor: bh.closed ? "#9CA3AF" : "#5A9A6E",
            mt: -0.4,
            flexShrink: 0,
          }}
        />
        <CustomTitle
          text={dayLabel}
          variant="body2"
          color="#2D2D2D"
          fontWeight={600}
          align="left"
          fontSize={{ xs: 15, sm: 17 }}
        />
      </Box>

      {bh.closed ? (
        <CustomTitle
          text="Cerrado"
          variant="body2"
          color="#9CA3AF"
          align="right"
          fontWeight={500}
          fontSize={{ xs: 15, sm: 17 }}
        />
      ) : (
        <Box textAlign="right">
          {bh.openTime && bh.closeTime && (
            <CustomTitle
              text={`${formatTime(bh.openTime)} a ${formatTime(bh.closeTime)}`}
              variant="body2"
              color="#6B7280"
              align="right"
              fontWeight={500}
              fontSize={{ xs: 15, sm: 17  }}
            />
          )}
          {bh.afternoonOpenTime && bh.afternoonCloseTime && (
            <CustomTitle
              text={`${formatTime(bh.afternoonOpenTime)} a ${formatTime(bh.afternoonCloseTime)}`}
              variant="body2"
              color="#6B7280"
              align="right"
              fontWeight={500}
              fontSize={{ xs: 15, sm: 17 }}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
