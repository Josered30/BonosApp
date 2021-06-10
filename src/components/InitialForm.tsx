
import { Button, Card, CardContent, Grid, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { useState } from "react";
import Login from "./Login";
import LogoIcon from "./LogoIcon";
import Register from "./Register";




const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'url(/images/background.jpg)',
        backgroundSize: "cover",
        overflow: "hidden"
    },
    card: {
        minWidth: "50%",
        maxWidth: "50rem",
        backgroundColor: "#303030",
    },
    column: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        margin: "1rem",
        width: "8rem",
        [theme.breakpoints.down('xs')]: {
            margin: "0rem 1rem",
        }
    },
    buttons: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        flex: 3,
        flexDirection: "column",
        [theme.breakpoints.down('xs')]: {
            flexDirection: "row",
            flex: 2
        }
    },
    title: {
        flex: 2,
        margin: "2rem",
        height: "10rem",
        width: "10rem",
        [theme.breakpoints.down('xs')]: {
            margin: "0.2rem 1rem 0.2rem 1rem",
        }
    },
    iconTitle: {
        textAlign: "center",
        fontSize: "1.5rem",
        margin: 0,
        color: theme.palette.secondary.main
    }
}));

function InitialForm({ setLogin }: any) {

    const [option, setOption] = useState(0);
    const classes = useStyles();
    const theme = useTheme();

    let content = null;

    if (option === 0) {
        content = <Login setLogin={setLogin}></Login>;
    } else {
        content = <Register></Register>
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container justify="center" spacing={3} alignItems="stretch">
                        <Grid item xs={12} md={3}>
                            <div className={classes.column}>

                                <LogoIcon className="init" fill={theme.palette.secondary.main}>
                                    
                                </LogoIcon>

                                <div className={classes.buttons}>
                                    <Button className={classes.button} variant="outlined" color="secondary" onClick={() => setOption(0)}>
                                        Ingresar
                                    </Button>
                                    <Button className={classes.button} variant="outlined" color="secondary" onClick={() => setOption(1)}>
                                        Registrarse
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            {content}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </div>);
}

export default InitialForm;