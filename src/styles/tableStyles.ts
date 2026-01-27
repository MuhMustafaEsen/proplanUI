import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";


export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
/*
export const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ theme, selected }) => ({
  // Zebra striping deseni
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  // Hover efekti
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    cursor: "pointer",
  },

  // Click ile seçili satır
  ...(selected && {
    backgroundColor: theme.palette.primary.light,
    "& td": {
      color: theme.palette.primary.contrastText,
    },
  }),
}));
*/
