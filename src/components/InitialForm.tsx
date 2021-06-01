
import { Button, Card, CardContent, Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";



const useStyles = makeStyles({
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
        display: "flex",
        flexDirection: "column",
    },
    buttom: {
        margin: "1rem 0px"
    },
});

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
                    <Grid container alignItems="center" justify="center" spacing={3}>
                        <Grid item sm={12} md={3}>
                            <div className={classes.column}>
                                <Button className={classes.buttom} variant="outlined" onClick={() => setOption(0)}>
                                    Ingresar
                                    </Button>
                                <Button className={classes.buttom} variant="outlined" onClick={() => setOption(1)}>
                                    Registrarse
                                    </Button>
                            </div>
                        </Grid>
                        <Grid item sm={12} md={9}>
                            {content}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </div>);
}

export default InitialForm;