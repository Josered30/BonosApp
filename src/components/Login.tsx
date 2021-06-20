import { Button, Card, CardContent, Divider, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import id from "date-fns/esm/locale/id/index.js";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../core/contexts/AuthContext";
import useForm from "../core/hooks/useForms";
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

function loginValidation(name: string, value: any, currentValues: any): any {
    const emailRegex: RegExp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    let temp = {} as any;

    switch (name) {
        case "email":
            if (!value) {
                temp.required = "Este campo es requerido";
            } else {
                if (!emailRegex.test(value)) {
                    temp.format = "Correo no valido";
                }
            }
            break;
        case "password":
            if (!value) {
                temp.required = "Este campo es requerido";
            }
            break;
        default:
            break;
    }
    if (Object.keys(temp).length > 0) {
        return temp;
    }
    return null;
}


function Login(props: any) {

    const classes = useStyles();
    const history = useHistory();
    const { authDispatch } = useAuth();

    const { errors, handleChange, showErrors } = useForm({
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
                                error={!!errors.email}
                                helperText={showErrors("email")}
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
                                error={!!errors.password}
                                helperText={showErrors("password")}
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
