
import { Button, Card, CardContent, Grid, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { useState } from "react";
import Login from "./Login";
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
        margin: "1rem"
    },

    buttons: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        flex: 4,
        flexDirection: "column",
        [theme.breakpoints.down('xs')]: {
            flexDirection: "row"
        }
    },

    title: {
        textAlign: "center",
        flex: 2,
        padding: "2rem 0px",
    }
}));

function InitialForm({ setLogin }: any) {

    const [option, setOption] = useState(0);
    const classes = useStyles();

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
                                <Typography variant="h5" className={classes.title}>
                                    Bonos App
                                </Typography>

                                <div className={classes.buttons}>
                                    <Button className={classes.button} variant="outlined" onClick={() => setOption(0)}>
                                        Ingresar
                                    </Button>
                                    <Button className={classes.button} variant="outlined" onClick={() => setOption(1)}>
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