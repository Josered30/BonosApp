import { Button, Card, CardContent, Divider, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogIn } from "../models/logIn";


const useStyles = makeStyles({
    content: {
        height: "30rem",
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },

    loginContent: {
        alignItems: "center",
        justifyContent: "center",
    },
});


function Login(props: any) {

    const classes = useStyles();
    const [values, setValues] = useState({
        email: "",
        password: "",
    } as LogIn);

    const history = useHistory();
    const {authDispatch} = useAuth();

    const [errors, setErrors] = useState({} as any);

    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
        validate({ [name]: value });
    };

    const validate = (value: any) => {
        let temp: any = { ...errors };
        if ("email" in value) {
            temp.email = value.email ? "" : "Este campo es requerido";
            if (value.email) {
                temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.email)
                    ? ""
                    : "Correo no valido"
            }
        }
        if ("password" in value) {
            temp.password = value.password ? "" : "Este campo es requerido";
        }
        setErrors({
            ...temp
        });
    };


    const login = () => {
        //if (values.email && values.password &&
    //        Object.values(errors).every((x) => x === "")) {
           
            authDispatch({ type: 'login'})
            history.push("/");
            
     //   }
    };

    return (
        <Card>
            <CardContent>
                <div className={classes.content}>

                    <Grid container className={classes.loginContent} spacing={2}>

                        <Grid item >
                            <Typography variant="h4">
                                Login
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="correo"
                                onChange={changeValue}
                                error={(errors.email?.length > 0)}
                                helperText={errors.email}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="contraseña"
                                type="password"
                                onChange={changeValue}
                                error={(errors.password?.length > 0)}
                                helperText={errors.password}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" color="primary" onClick={login}>
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Button fullWidth color="default">
                                Recuperar credenciales
                            </Button>
                        </Grid>
                    </Grid>

                </div>

            </CardContent>
        </Card>
    );
}

export default Login;
