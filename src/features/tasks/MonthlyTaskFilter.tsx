import {TextField,Box} from "@mui/material";
import dayjs from "dayjs";

interface Props {
    month:dayjs.Dayjs;
    onMonthChange:(value:dayjs.Dayjs) => void;
}

export const MonthlyTaskFilter = ({month,onMonthChange}:Props) => {
    return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: "1fr",
        md: "repeat(12, 1fr)",
      }}
      gap={2}
      mb={2}
    >
      <Box
        gridColumn={{
          xs: "span 12",
          md: "span 3",
        }}
      >
        <TextField
          type="month"
          fullWidth
          label="Ay"
          value={month.format("YYYY-MM")}
          onChange={(e) =>
            onMonthChange(dayjs(e.target.value))
          }
        />
      </Box>
    </Box>
  );
  //Grid yediremedim aşagıdaki hata veriyor version fark Grid Grid2 uyuşmazlıgı
    /*
    return (
        <Grid container spacing={2} mb={2}>
            <Grid item xs={12} md={3}>
                <TextField
                type="month"
                fullWidth
                label="Ay"
                value={month.format("YYYY-MM")}
                onChange={(e) =>
                    onMonthChange(dayjs(e.target.value))
                }
                />
            </Grid>
        </Grid>
    );
    */
};