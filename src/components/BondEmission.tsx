import { Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextareaAutosize, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import useForm from "../core/hooks/useForms";
import { Frequency } from "../core/models/enums/frequency";
import { GracePeriod } from "../core/models/enums/gracePeriod";
import { PaymentMethod } from "../core/models/enums/paymentMethod";
import { Rate } from "../core/models/enums/rate";
import { EnumData, getEnumData } from "../core/utils/enumUtils";
import { Fragment } from "react";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: "1rem",
        [theme.breakpoints.down('xs')]: {
            textAlign: "center"
        }
    },
    paper: {
        padding: "1px 2rem",
    },
    subContent: {
        margin: "2rem 0rem"
    },
    center: {
        display: "grid",
        placeItems: "center"
    },
    table: {
        width: "100%",
        margin: "1rem 0rem"
    },
    tableFill: {
        height: "20rem",
    },

    formControl: {
        minWidth: "100%",
    },
}));




const paymentMethods: EnumData[] = getEnumData(PaymentMethod);
const insterestRateTypes: EnumData[] = getEnumData(Rate);
const capitalizations: EnumData[] = getEnumData(Frequency);
const couponFrequencies: EnumData[] = getEnumData(Frequency);
const gracePeriods: EnumData[] = getEnumData(GracePeriod);
const daysPerYear: EnumData[] = [
    {
        label: "360",
        value: 360
    },
    {
        label: "365",
        value: 365
    }
];

function valueInputValidation(name: any, value: any, currentValues: any): any {
    let temp = {} as any;
    const nanRegex: RegExp = /[^0-9.]/gm;
    switch (name) {
        case "nominalValue":
            console.log(value);
            if (nanRegex.test(value)) {
                temp.number = "Debe de ingresar un numero";
            }
            break;
        case "commercialValue":
            if (nanRegex.test(value)) {
                temp.number = "Debe de ingresar un numero";
            }
            break;
        case "daysPerYear":
            if (nanRegex.test(value)) {
                temp.number = "Debe de ingresar un numero";
            }
            break;
        case "interestRate":
            if (nanRegex.test(value)) {
                temp.number = "Debe de ingresar un numero";
            }
            break;
        case "annualDiscountRate":
            if (nanRegex.test(value)) {
                temp.number = "Debe de ingresar un numero";
            }
            break;
        case "incomeTax":
            if (nanRegex.test(value)) {
                temp.number = "Debe de ingresar un numero";
            }
            break;
        case "prima":
            if (nanRegex.test(value)) {
                temp.number = "Debe de ingresar un numero";
            }
            break;
        case "flotacion":
            if (nanRegex.test(value)) {
                temp.number = "Debe de ingresar un numero";
            }
            break;
        case "cavali":
            if (nanRegex.test(value)) {
                temp.number = "Debe de ingresar un numero";
            }
            break;
        case "years":
            if (nanRegex.test(value)) {
                temp.number = "Debe de ingresar un numero";
            }
            break;
        case "colocacion":
            if (nanRegex.test(value)) {
                temp.number = "Debe de ingresar un numero";
            }
            break;
        case "estructuracion":
            if (nanRegex.test(value)) {
                temp.number = "Debe de ingresar un numero";
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

function infoInputValidation(name: any, value: any, currentValues: any): any {
    let temp = {} as any;
    const nanRegex: RegExp = /[^0-9.]/gm;
    switch (name) {
        case "expectedRate":
            if (nanRegex.test(value)) {
                temp.number = "Debe de ingresar un numero";
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





function BondEmmision(props: any) {

    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const valueForm = useForm<any>({
        initialValues: {
            emmitionDate: new Date(),
            paymentMethod: PaymentMethod.Aleman,
            capitalization: Frequency.Diaria,
            couponFrequency: Frequency.Anual,
            gracePeriod: GracePeriod.Sin,
            daysPerYear: '',
            nominalValue: '',
            commercialValue: '',
            years: '',
            interestRate: '',
            annualDiscountRate: '',
            incomeTax: '',
            prima: '',
            flotacion: '',
            cavali: '',
            colocacion: '',
            estructuracion: '',
            interestRateType: Rate.Efectiva
        },
        validationFunction: valueInputValidation
    });

    const infoForm = useForm<any>({
        initialValues: {
            description: '',
            name: '',
            expectedRate: '',
        },
        validationFunction: infoInputValidation
    });


    const handleEmmitionDate = (newDate: any) => {
        const event = {
            target: {
                name: "emmitionDate",
                value: newDate
            }
        };
        valueForm.handleChange(event);
    };

    return (
        <Fragment>
            <Typography className={classes.title} variant={matches ? "h5" : "h3"} >Emision de un bono</Typography>
            <Paper className={classes.paper}>
                <div className={classes.subContent}>
                    <Typography className={classes.title} variant="h5">Valores del bono</Typography>

                    <Grid container justify="flex-start" spacing={3}>
                        <Grid item xs={12} md={4}>
                            <FormControl
                                className={classes.formControl}
                            >
                                <InputLabel id="paymentMethodLabel">Metodo de pago</InputLabel>
                                <Select
                                    labelId="paymentMethodLabel"
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    value={valueForm.values.paymentMethod}
                                    onChange={valueForm.handleChange}
                                >
                                    {paymentMethods.map(e => {
                                        return (
                                            <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="nominalValue"
                                name="nominalValue"
                                label="Valor nominal"
                                onChange={valueForm.handleChange}
                                onBlur={valueForm.onBlurValidation}
                                value={valueForm.values.nominalValue}
                                error={!!valueForm.errors.nominalValue}
                                helperText={valueForm.showErrors("nominalValue")}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="commercialValue"
                                name="commercialValue"
                                label="Valor comercial"
                                onChange={valueForm.handleChange}
                                onBlur={valueForm.onBlurValidation}
                                value={valueForm.values.commercialValue}
                                error={!!valueForm.errors.commercialValue}
                                helperText={valueForm.showErrors("commercialValue")}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormControl
                                className={classes.formControl}
                            >
                                <InputLabel id="couponFrequencyLabel">Frequencia del cupon</InputLabel>
                                <Select
                                    labelId="couponFrequencyLabel"
                                    id="couponFrequency"
                                    name="couponFrequency"
                                    onChange={valueForm.handleChange}
                                    value={valueForm.values.couponFrequency}
                                >
                                    {couponFrequencies.map(e => {
                                        return (
                                            <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormControl
                                className={classes.formControl}
                            >
                                <InputLabel id="daysPerYearLabel">Dias por año</InputLabel>
                                <Select
                                    id="daysPerYear"
                                    name="daysPerYear"
                                    onChange={valueForm.handleChange}
                                    value={valueForm.values.daysPerYear}
                                >
                                    {daysPerYear.map(e => {
                                        return (
                                            <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormControl
                                className={classes.formControl}
                            >
                                <InputLabel id="interestRateTypeLabel">Tipo de tasa de interes</InputLabel>
                                <Select
                                    labelId="interestRateTypeLabel"
                                    id="insterestRateType"
                                    name="insterestRateType"
                                    onChange={valueForm.handleChange}
                                    value={valueForm.values.interestRateType}
                                >
                                    {insterestRateTypes.map(e => {
                                        return (
                                            <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormControl
                                className={classes.formControl}
                            >
                                <InputLabel id="capitalizationLabel">Capitalizacion</InputLabel>
                                <Select
                                    labelId="capitalizationLabel"
                                    id="capitalization"
                                    name="capitalization"
                                    onChange={valueForm.handleChange}
                                    value={valueForm.values.capitalization}
                                >
                                    {capitalizations.map(e => {
                                        return (
                                            <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="interestRate"
                                name="interestRate"
                                label="Tasa de interes %"
                                onChange={valueForm.handleChange}
                                onBlur={valueForm.onBlurValidation}
                                value={valueForm.values.interestRate}
                                error={!!valueForm.errors.interestRate}
                                helperText={valueForm.showErrors("interestRate")}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="annualDiscountRate"
                                name="annualDiscountRate"
                                label="Tasa anual de descuento %"
                                onChange={valueForm.handleChange}
                                onBlur={valueForm.onBlurValidation}
                                value={valueForm.values.annualDiscountRate}
                                error={!!valueForm.errors.annualDiscountRate}
                                helperText={valueForm.showErrors("annualDiscountRate")}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="incomeTax"
                                name="incomeTax"
                                label="Impuesto a la renta %"
                                onChange={valueForm.handleChange}
                                onBlur={valueForm.onBlurValidation}
                                value={valueForm.values.incomeTax}
                                error={!!valueForm.errors.incomeTax}
                                helperText={valueForm.showErrors("incomeTax")}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    fullWidth
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="emmitionDate"
                                    name="emmitionDate"
                                    label="Fecha de emision"
                                    value={valueForm.values.emmitionDate}
                                    onChange={handleEmmitionDate}
                                    maxDate={new Date()}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="prima"
                                name="prima"
                                label="Prima %"
                                onChange={valueForm.handleChange}
                                onBlur={valueForm.onBlurValidation}
                                value={valueForm.values.prima}
                                error={!!valueForm.errors.prima}
                                helperText={valueForm.showErrors("prima")}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="flotacion"
                                name="flotacion"
                                label="Flotacion %"
                                onChange={valueForm.handleChange}
                                onBlur={valueForm.onBlurValidation}
                                value={valueForm.values.flotacion}
                                error={!!valueForm.errors.flotacion}
                                helperText={valueForm.showErrors("flotacion")}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="cavali"
                                name="cavali"
                                label="Cavali %"
                                onChange={valueForm.handleChange}
                                onBlur={valueForm.onBlurValidation}
                                value={valueForm.values.cavali}
                                error={!!valueForm.errors.cavali}
                                helperText={valueForm.showErrors("cavali")}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="years"
                                name="years"
                                label="Numero de años"
                                onChange={valueForm.handleChange}
                                onBlur={valueForm.onBlurValidation}
                                value={valueForm.values.years}
                                error={!!valueForm.errors.years}
                                helperText={valueForm.showErrors("years")}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="colocacion"
                                name="colocacion"
                                label="Colocacion %"
                                onChange={valueForm.handleChange}
                                onBlur={valueForm.onBlurValidation}
                                value={valueForm.values.colocacion}
                                error={!!valueForm.errors.colocacion}
                                helperText={valueForm.showErrors("colocacion")}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="estructuracion"
                                name="estructuracion"
                                label="Estructuracion %"
                                onChange={valueForm.handleChange}
                                onBlur={valueForm.onBlurValidation}
                                value={valueForm.values.estructuracion}
                                error={!!valueForm.errors.estructuracion}
                                helperText={valueForm.showErrors("estructuracion")}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormControl
                                className={classes.formControl}
                            >
                                <InputLabel id="gracePeriodLabel">Plazo de Gracia</InputLabel>
                                <Select
                                    labelId="gracePeriodLabel"
                                    id="gracePeriod"
                                    name="gracePeriod"
                                    value={valueForm.values.gracePeriod}
                                    onChange={valueForm.handleChange}
                                >
                                    {gracePeriods.map(e => {
                                        return (
                                            <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>

                <Divider />

                <div className={classes.subContent}>
                    <Typography className={classes.title} variant="h5">Informacion del bono</Typography>


                    <Grid container justify="flex-start" spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Nombre"
                                onChange={infoForm.handleChange}
                                value={infoForm.values.name}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                rowsMax={4}
                                variant="outlined"
                                id="description"
                                name="description"
                                label="Descripcion"
                                onChange={infoForm.handleChange}
                                value={infoForm.values.description}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="expectedRate"
                                name="expectedRate"
                                label="Interes esperado %"
                                onChange={infoForm.handleChange}
                                onBlur={infoForm.onBlurValidation}
                                value={infoForm.values.expectedRate}
                                error={!!infoForm.errors.expectedRate}
                                helperText={infoForm.showErrors("expectedRate")}
                                autoComplete="off"
                            />
                        </Grid>
                    </Grid>
                </div>


            </Paper>
        </Fragment>


    );



}

export default BondEmmision;
