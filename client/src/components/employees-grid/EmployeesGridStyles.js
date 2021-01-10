import { makeStyles } from "@material-ui/core/styles";

export const useEmployeesGridStyles = makeStyles({
  container: {
    minWidth: 650,
  },
  tableRow: {
    "& > th": {
      fontWeight: 800,
      fontSize: "15px",
    },
  },
});
