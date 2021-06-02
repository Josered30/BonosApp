import classes from "*.module.css";
import { Button, Card, CardContent, Container, Divider, FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { timeStamp } from "console";
import React, { useState } from "react";
import { EntityType } from "../models/enums/entityType";
import { LegalPersonRegister } from "../models/legalPersonRegister";
import { NaturalPersonRegister } from "../models/naturalPersonRegister";


const useStyles = makeStyles({
    content: {
        padding: "3rem",
    },

    buttom: {
        alignItems: "center",
        margin: "2rem 0rem",
    },

    registerContent: {
        alignItems: "center",
        justifyContent: "center",
    },

    registerForm: {
        margin: "1rem 0rem"
    },
    formControl: {
        minWidth: "100%",
    },

});


function RegisterOptions({ setOption }: any) {
    const classes = useStyles();


    return (
        <div className={classes.content}>

            <div style={{ textAlign: "center" }}>

                <Typography variant="h4">
                    Registrarse
                    </Typography>

            </div>

            <div className={classes.registerForm}>
                <Button className={classes.buttom} fullWidth variant="contained" color="primary" onClick={() => setOption(1)}>
                    Persona juridica
                </Button>
                <Divider />
                
                <Button className={classes.buttom} fullWidth variant="contained" color="primary" onClick={() => setOption(2)}>
                    Persona natural
                </Button>
            </div>

        </div>
    );
}


function RegisterNaturalPerson() {

    const [values, setValues] = useState({
        name: "",
        lastName: "",
        dni: "",
        email: "",
        password: "",
    } as NaturalPersonRegister);

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

        if ("name" in value) {
            temp.name = value.name ? "" : "Este campo es requerido";
        }

        if ("lastName" in value) {
            temp.lastName = value.lastName ? "" : "Este campo es requerido";
        }

        if ("dni" in value) {
            temp.dni = value.dni ? "" : "Este campo es requerido";
        }

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
            if (value.password) {
                temp.password = value.password.length >= 6 ? "" : "Minimo 6 caracteres";
            }
        }

        setErrors({
            ...temp
        });
    };


    const classes = useStyles();

    return (
        <div className={classes.content}>


            <Grid container className={classes.registerContent} spacing={2}>

                <Grid item>
                    <Typography variant="h5">
                        Registrarse como persona natural
                    </Typography>
                </Grid>


                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="nombre"
                        onChange={changeValue}
                        error={(errors.name?.length > 0)}
                        helperText={errors.name}
                        autoComplete="off"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="apellidos"
                        onChange={changeValue}
                        error={(errors.lastName?.length > 0)}
                        helperText={errors.lastName}
                        autoComplete="off"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="dni"
                        name="dni"
                        label="dni"
                        onChange={changeValue}
                        error={(errors.dni?.length > 0)}
                        helperText={errors.dni}
                        autoComplete="off"
                    />
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
                    <Button fullWidth variant="contained" color="primary">
                        Registrarse
                    </Button>
                </Grid>

            </Grid>

        </div>
    );
}

function RegisterLegalPerson() {

    const [values, setValues] = useState({
        bussinessName: "",
        registerYear: 0,
        entityType: 0,
        email: "",
        password: "",
        ruc: "",
    } as LegalPersonRegister);

    const [errors, setErrors] = useState({} as any);

    const changeValue = (event: any) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
        validate({ [name]: value });
    };

    const validate = (value: any) => {

        let temp: any = { ...errors };
        const emailRegex: RegExp = /^[^@\s]+@[^@\s]+\.[^@\s]+$'/;
        const numberRegex: RegExp = /\D+/gm;

        if ("bussinessName" in value) {
            temp.bussinessName = value.bussinessName ? "" : "Este campo es requerido";
        }

        if ("registerYear" in value) {
            temp.registerYear = value.registerYear ? "" : "Este campo es requerido";
            if (value.registerYear) {
                temp.registerYear = (numberRegex.test(value.registerYear) || (value.registerYear < 1800 || value.registerYear >= 9999)) ? "Fecha invalida" : "";
            }
        }

        if ("email" in value) {
            temp.email = value.email ? "" : "Este campo es requerido";
            if (value.email) {
                temp.email = emailRegex.test(value.email) ? "" : "Correo no valido"
            }
        }

        if ("entityType" in value) {
            temp.entityType = value.entityType !== EntityType.NONE ? "" : "Entidad no valida"
        }

        if ("password" in value) {
            temp.password = value.password ? "" : "Este campo es requerido";
            if (value.password) {
                temp.password = value.password.length >= 6 ? "" : "Minimo 6 caracteres";
            }
        }

        if ("ruc" in value && values.entityType === EntityType.BUSSINESS) {
            temp.ruc = value.ruc ? "" : "Este campo es requerido";
            if (value.ruc) {
                temp.ruc = numberRegex.test(value.ruc) ? "Ruc invalida" : "";
            }
        }

        setErrors({
            ...temp
        });
    };


    const classes = useStyles();

    return (
        <div className={classes.content}>


            <Grid container className={classes.registerContent} spacing={2}>

                <Grid item>
                    <Typography variant="h5">
                        Registrarse como persona juridica
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="bussinessName"
                        name="bussinessName"
                        label="razon social"
                        onChange={changeValue}
                        error={(errors.bussinessName?.length > 0)}
                        helperText={errors.bussinessName}
                        autoComplete="off"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        className={classes.formControl}
                        id="registerYear"
                        name="registerYear"
                        label="año de registro"
                        onChange={changeValue}
                        error={(errors.registerYear?.length > 0)}
                        helperText={errors.registerYear}
                        autoComplete="off"
                    />
                </Grid>

                <Grid item xs={12} md={6} >
                    <FormControl 
                    className={classes.formControl}
                    error={(errors.entityType?.length > 0)}
                     >
                        <InputLabel id="entityTypeLabel">Tipo de entidad</InputLabel>
                        <Select
                            labelId="entityTypeLabel"
                            id="entityType"
                            name="entityType"
                            value={values.entityType}
                            onChange={changeValue}
                        >
                            <MenuItem value={EntityType.NONE}>Ninguno</MenuItem>
                            <MenuItem value={EntityType.BUSSINESS}>Empresa</MenuItem>
                            <MenuItem value={EntityType.INSTITUTION}>Intitucion</MenuItem>
                        </Select>
                        <FormHelperText>{errors.entityType}</FormHelperText>
                    </FormControl>


                </Grid>


                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="ruc"
                        name="ruc"
                        label="ruc"
                        onChange={changeValue}
                        error={(errors.ruc?.length > 0)}
                        helperText={errors.ruc}
                        autoComplete="off"
                    />
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
                    <Button fullWidth variant="contained" color="primary">
                        Registrarse
                    </Button>
                </Grid>



            </Grid>

        </div>
    );
}







function Register() {

    const [option, setOption] = useState(0);

    let content = null;
    if (option === 0) {
        content = <RegisterOptions setOption={setOption} style={{ width: "100%" }}></RegisterOptions>;
    } else if (option === 1) {
        content = <RegisterLegalPerson></RegisterLegalPerson>;
    } else if (option === 2) {
        content = <RegisterNaturalPerson></RegisterNaturalPerson>;
    }


    return (
        <Card>
            <CardContent>
                {content}
            </CardContent>
        </Card>
    );
}

export default Register;
