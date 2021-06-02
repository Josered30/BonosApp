import { CircularProgress, makeStyles } from "@material-ui/core";
import { useSpinner } from "../contexts/SpinnerContext";



const useStyles = makeStyles((theme) => ({
    spinner: {
        position: "fixed",
        zIndex: 9999,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0000004f"
    },
}));


function Spinner() {
    const classes = useStyles();
    return (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )
}


function SpinnerDisplay() {
    const { spinnerState } = useSpinner();
    if (spinnerState.state) {
        return (<Spinner></Spinner>);
    }
    return null;
}

export { SpinnerDisplay, Spinner };