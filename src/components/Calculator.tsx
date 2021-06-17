import DateFnsUtils from "@date-io/date-fns";
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { ExpandMoreRounded } from "@material-ui/icons";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import clsx from "clsx";
import { Fragment, useState} from "react";
import useForm from "../hooks/useForms";
import { BondCalculatorOutput } from "../models/bondCalculatorOutput";
import { Frequency } from "../models/enums/frequency";
import { PaymentMethod } from "../models/enums/paymentMethod";
import { Rate } from "../models/enums/rate";
import { ColumnData } from "../models/virtualizeTableModel";
import { EnumData, getEnumData } from "../utils/enumUtils";
import VirtualizedTable from "./VirtualizeTable";


const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "2rem 0rem",
        flexWrap: "wrap",
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column",
            justifyContent: "center",
        }
    },

    headerText: {
        textAlign: "center",
        [theme.breakpoints.down('xs')]: {
            margin: "1rem 0rem",
        }
    },
    formControl: {
        minWidth: "100%",
    },

    centerTitle: {
        lineHeight: "3rem",
    },

    table: {
        width: "100%",
        margin: "1rem 0rem"
    },
    tableFill: {
        height: "20rem",
    }
}));


const columnNames: ColumnData[] = [
    {
        width: 200,
        label: "Indice",
        dataKey: "index"
    },
    {
        width: 200,
        label: "Fecha",
        dataKey: "date"
    },
    {
        width: 200,
        label: "Periodo de gracia",
        dataKey: "gracePeriod"
    },
    {
        width: 200,
        label: "Bono",
        dataKey: "bond"
    },
    {
        width: 200,
        label: "Cupon",
        dataKey: "coupon"
    },
    {
        width: 200,
        label: "Couta",
        dataKey: "fee"
    },
    {
        width: 200,
        label: "Amortizacion",
        dataKey: "amortization"
    },
    {
        width: 200,
        label: "Prima",
        dataKey: "prima"
    },
    {
        width: 200,
        label: "Escudo",
        dataKey: "shield"
    },
    {
        width: 200,
        label: "Flujo emisor",
        dataKey: "emmiteFlow"
    },
    {
        width: 200,
        label: "Flujo emisor con escudo",
        dataKey: "emmiterShieldFlow"
    },
    {
        width: 200,
        label: "Flujo bonista",
        dataKey: "holderFlow"
    }
];


function calculatorInputValidation(
    newValues: any,
    currentValues: any,
    errors: any,
    setErrors: (error: any) => void): void {

}

const paymentMethods: EnumData[] = getEnumData(PaymentMethod);
const insterestRateTypes: EnumData[] = getEnumData(Rate);
const capitalizations: EnumData[] = getEnumData(Frequency);
const couponFrequency: EnumData[] = getEnumData(Frequency);


function Calculator() {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const { values, errors, handleChange } = useForm({
        initialValues: {
            emmitionDate: new Date()
        },
    });

    const handleEmmitionDate = (newDate: any) => {
        const event = {
            target: {
                name: "emmitionDate",
                value: newDate
            }
        };
        handleChange(event);
    };

    const [inputExpanded, setInputExpanded] = useState(true);
    const [outputExpanded, setOutputExpanded] = useState(false);

    const [outputData, setOutputData] = useState({
        calculatorInfo: []
    } as BondCalculatorOutput);


    const handleInputAccordion = () => setInputExpanded(!inputExpanded);
    const handleOuputAccordion = () => setOutputExpanded(!outputExpanded);

    const calculate = () => {
        setInputExpanded(!inputExpanded);
        setOutputExpanded(true);
    }


    const tableClass = clsx(classes.table, outputExpanded && classes.tableFill);

    return (
        <Fragment>
            <div className={classes.header}>
                <Typography variant={matches ? "h5" : "h3"} className={classes.headerText}>
                    Calculo de un bono (VAC)
                </Typography>
                <Button variant="contained" color="primary" onClick={calculate}>
                    Calcular
                </Button>
            </div>

            <Accordion expanded={inputExpanded} onChange={handleInputAccordion}>
                <AccordionSummary expandIcon={<ExpandMoreRounded />}
                    aria-controls="input-content"
                    id="input-panel">
                    <Typography variant="h5" className={classes.centerTitle}>
                        Datos iniciales
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Grid container justify="flex-start" spacing={3}>
                        <Grid item xs={12} md={4}>
                            <FormControl
                                className={classes.formControl}
                                error={(errors.bondType?.length > 0)}
                            >
                                <InputLabel id="paymentMethodLabel">Metodo de pago</InputLabel>
                                <Select
                                    labelId="paymentMethodLabel"
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    onChange={handleChange}
                                >
                                    {paymentMethods.map(e => {
                                        return (
                                            <MenuItem value={e.value}>{e.label}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{errors.bondType}</FormHelperText>
                            </FormControl>

                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="nominalValue"
                                name="nominalValue"
                                label="Valor nominal"
                                onChange={handleChange}
                                error={(errors.nominalValue?.length > 0)}
                                helperText={errors.nominalValue}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="commercialValue"
                                name="commercialValue"
                                label="Valor comercial"
                                onChange={handleChange}
                                error={(errors.commercial?.length > 0)}
                                helperText={errors.commercial}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormControl
                                className={classes.formControl}
                                error={(errors.insterestRateType?.length > 0)}
                            >
                                <InputLabel id="couponFrequencyLabel">Frequencia del cupon</InputLabel>
                                <Select
                                    labelId="couponFrequencyLabel"
                                    id="couponFrequency"
                                    name="couponFrequency"
                                    onChange={handleChange}
                                >
                                    {couponFrequency.map(e => {
                                        return (
                                            <MenuItem value={e.value}>{e.label}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{errors.insterestRateType}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="daysPerYear"
                                name="daysPerYear"
                                label="Dias por año"
                                onChange={handleChange}
                                error={(errors.daysPerYear?.length > 0)}
                                helperText={errors.daysPerYear}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormControl
                                className={classes.formControl}
                                error={(errors.insterestRateType?.length > 0)}
                            >
                                <InputLabel id="interestRateTypeLabel">Tipo de tasa de interes</InputLabel>
                                <Select
                                    labelId="interestRateTypeLabel"
                                    id="insterestRateType"
                                    name="insterestRateType"
                                    onChange={handleChange}
                                >
                                    {insterestRateTypes.map(e => {
                                        return (
                                            <MenuItem value={e.value}>{e.label}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{errors.insterestRateType}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormControl
                                className={classes.formControl}
                                error={(errors.capitalization?.length > 0)}
                            >
                                <InputLabel id="capitalizationLabel">Capitalizacion</InputLabel>
                                <Select
                                    labelId="capitalizationLabel"
                                    id="capitalization"
                                    name="capitalization"
                                    onChange={handleChange}
                                >
                                    {capitalizations.map(e => {
                                        return (
                                            <MenuItem value={e.value}>{e.label}</MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>{errors.capitalization}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="interestRate"
                                name="interestRate"
                                label="Tasa de interes"
                                onChange={handleChange}
                                error={(errors.interestRate?.length > 0)}
                                helperText={errors.interestRate}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="annualDiscountRate"
                                name="annualDiscountRate"
                                label="Tasa anual de descuento"
                                onChange={handleChange}
                                error={(errors.annualDiscountRate?.length > 0)}
                                helperText={errors.annualDiscountRate}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="incomeTax"
                                name="incomeTax"
                                label="Impuesto a la renta"
                                onChange={handleChange}
                                error={(errors.incomeTax?.length > 0)}
                                helperText={errors.incomeTax}
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
                                    value={values.emmitionDate}
                                    onChange={handleEmmitionDate}
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
                                label="Prima"
                                onChange={handleChange}
                                error={(errors.prima?.length > 0)}
                                helperText={errors.prima}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="flotacion"
                                name="flotacion"
                                label="Flotacion"
                                onChange={handleChange}
                                error={(errors.flotacion?.length > 0)}
                                helperText={errors.flotacion}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="cavali"
                                name="cavali"
                                label="Cavali"
                                onChange={handleChange}
                                error={(errors.cavali?.length > 0)}
                                helperText={errors.cavali}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="years"
                                name="years"
                                label="Numero de años"
                                onChange={handleChange}
                                error={(errors.years?.length > 0)}
                                helperText={errors.years}
                                autoComplete="off"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={outputExpanded} onChange={handleOuputAccordion}>
                <AccordionSummary expandIcon={<ExpandMoreRounded />}
                    aria-controls="output-content"
                    id="output-panel">
                    <Typography variant="h5" className={classes.centerTitle}>
                        Datos de salida
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container justify="flex-start" spacing={3}>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                disabled
                                id="couponFrequencyOutput"
                                name="couponFrequencyOuput"
                                label="Frecuencia del cupon"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                disabled
                                id="capitalizationDaysOuput"
                                name="capitalizationDaysOuput"
                                label="Dias capitulacion"
                            />
                        </Grid>


                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                disabled
                                id="periodsPerYearOutput"
                                name="periodsPerYearOuput"
                                label="Periodos por año"
                            />
                        </Grid>


                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                disabled
                                id="annualEffectiveRateOutput"
                                name="annualEffectiveRateOuput"
                                label="Tasa efectiva anual"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                disabled
                                id="cokOutput"
                                name="cokOuput"
                                label="COK"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                disabled
                                id="initialEmmiterCostsOutput"
                                name="initialEmmiterCostsOuput"
                                label="Costos iniciales del emisor"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                disabled
                                id="initialHolderCostsOutput"
                                name="initialHolderCostsOuput"
                                label="Costos iniciales del boniste"
                            />
                        </Grid>


                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                disabled
                                id="currentPriceOutput"
                                name="currentPriceOuput"
                                label="Precio actual"
                            />
                        </Grid>

                    </Grid>
                </AccordionDetails>
            </Accordion>


            <Paper className={tableClass}>
                <VirtualizedTable
                    rowCount={outputData.calculatorInfo.length}
                    rowGetter={({ index }) => outputData.calculatorInfo[index]}
                    columns={columnNames}
                    headerHeight={100}
                />
            </Paper>


        </Fragment>
    );
}


export default Calculator;