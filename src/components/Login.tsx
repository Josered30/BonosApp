import { Button, Card, CardContent, Divider, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useForm from "../hooks/useForms";
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

function loginValidation(newValues: any, currentValues: any, errors: any, setErrors: (error: any) => void): void {
    let temp: any = { ...errors };
    const emailRegex: RegExp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if ("email" in newValues) {
        temp.email = newValues.email ? "" : "Este campo es requerido";
        if (newValues.email) {
            temp.email = emailRegex.test(newValues.email)
                ? ""
                : "Correo no valido"
        }
    }
    if ("password" in newValues) {
        temp.password = newValues.password ? "" : "Este campo es requerido";
    }
    setErrors({
        ...temp
    });
}


function Login(props: any) {

    const classes = useStyles();
    const history = useHistory();
    const { authDispatch } = useAuth();

    const { errors, handleChange } = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validationFunction: loginValidation
    });


    const login = () => {
        //if (values.email && values.password &&
        //        Object.values(errors).every((x) => x === "")) {

        authDispatch({ type: 'login' })
        history.push("/home");

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
                                label="Correo"
                                onChange={handleChange}
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
                                label="Contraseña"
                                type="password"
                                onChange={handleChange}
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
