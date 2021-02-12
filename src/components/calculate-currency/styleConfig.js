import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 90,
      width: 50,
      color: "#fff",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      color: "#fff",
    },
    select: {
      minWidth: 70,
    },
  }))
  export default useStyles