import { Button, Card, CardContent, Container, Divider, FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useForm from "../hooks/useForms";
import { EntityType } from "../models/enums/entityType";
import { LegalPersonRegister } from "../models/legalPersonRegister";
import { NaturalPersonRegister } from "../models/naturalPersonRegister";
import { EnumData, getEnumData } from "../utils/enumUtils";


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


function registerNaturalPersonValidation(newValues: any, currentValues: any, errors: any, setErrors: (error: any) => void): void {
    let temp: any = { ...errors };
    const numberRegex: RegExp = /\D+/gm;

    if ("name" in newValues) {
        temp.name = newValues.name ? "" : "Este campo es requerido";
    }

    if ("lastName" in newValues) {
        temp.lastName = newValues.lastName ? "" : "Este campo es requerido";
    }

    if ("dni" in newValues) {
        temp.dni = newValues.dni ? "" : "Este campo es requerido";
        if (newValues.dni) {
            temp.dni = numberRegex.test(newValues.dni) ? "DNI invalido" : "";
        }
    }

    if ("email" in newValues) {
        temp.email = newValues.email ? "" : "Este campo es requerido";
        if (newValues.email) {
            temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(newValues.email)
                ? ""
                : "Correo no valido"
        }
    }
    if ("password" in newValues) {
        temp.password = newValues.password ? "" : "Este campo es requerido";
        if (newValues.password) {
            temp.password = newValues.password.length >= 6 ? "" : "Minimo 6 caracteres";
        }
    }
    setErrors({
        ...temp
    });
}


function registerLegalPersonValidation(newValues: any, currentValues: any, errors: any, setErrors: (error: any) => void): void {
    let temp: any = { ...errors };
    const emailRegex: RegExp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const numberRegex: RegExp = /\D+/gm;

    if ("bussinessName" in newValues) {
        temp.bussinessName = newValues.bussinessName ? "" : "Este campo es requerido";
    }

    if ("registerYear" in newValues) {
        temp.registerYear = newValues.registerYear ? "" : "Este campo es requerido";
        if (newValues.registerYear) {
            temp.registerYear = (numberRegex.test(newValues.registerYear) || (newValues.registerYear < 1800 || newValues.registerYear >= 9999)) ? "Fecha invalida" : "";
        }
    }

    if ("email" in newValues) {
        temp.email = newValues.email ? "" : "Este campo es requerido";
        if (newValues.email) {
            temp.email = emailRegex.test(newValues.email) ? "" : "Correo no valido"
        }
    }

    if ("entityType" in newValues) {
        temp.entityType = newValues.entityType !== EntityType.Vacio ? "" : "Entidad no valida"
    }

    if ("password" in newValues) {
        temp.password = newValues.password ? "" : "Este campo es requerido";
        if (newValues.password) {
            temp.password = newValues.password.length >= 6 ? "" : "Minimo 6 caracteres";
        }
    }

    if ("ruc" in newValues && currentValues.entityType === EntityType.Empresa) {
        temp.ruc = newValues.ruc ? "" : "Este campo es requerido";
        if (newValues.ruc) {
            temp.ruc = numberRegex.test(newValues.ruc) ? "RUC invalida" : "";
        }
    }

    setErrors({
        ...temp
    });
}



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


    const { errors, handleChange } = useForm({
        initialValues: {
            name: "",
            lastName: "",
            dni: "",
            email: "",
            password: "",
        },
        validationFunction: registerLegalPersonValidation
    });

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
                        label="Nombre"
                        onChange={handleChange}
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
                        label="Apellidos"
                        onChange={handleChange}
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
                        label="DNI"
                        onChange={handleChange}
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
                    <Button fullWidth variant="contained" color="primary">
                        Registrarse
                    </Button>
                </Grid>

            </Grid>

        </div>
    );
}



const entityTypes: EnumData[] = getEnumData(EntityType);

function RegisterLegalPerson() {

    const { values, errors, handleChange } = useForm({
        initialValues: {
            bussinessName: "",
            registerYear: 0,
            entityType: 0,
            email: "",
            password: "",
            ruc: "",
        },
        validationFunction: registerLegalPersonValidation
    });
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
                        label="Razon social"
                        onChange={handleChange}
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
                        label="Año de registro"
                        onChange={handleChange}
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
                            onChange={handleChange}
                        >
                            {entityTypes.map(e => {
                                return (
                                    <MenuItem value={e.value}>{e.label}</MenuItem>
                                );
                            })}
                        </Select>
                        <FormHelperText>{errors.entityType}</FormHelperText>
                    </FormControl>


                </Grid>


                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="ruc"
                        name="ruc"
                        label="RUC"
                        onChange={handleChange}
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
