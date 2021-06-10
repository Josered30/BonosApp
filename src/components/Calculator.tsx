import DateFnsUtils from "@date-io/date-fns";
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { ExpandMoreRounded } from "@material-ui/icons";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Fragment, useEffect, useState } from "react";
import { BondCalculatorInput } from "../models/bondCalculatorInput";
import { BondCalculatorOutput } from "../models/bondCalculatorOutput";
import { EnumType } from "../models/enumType";
import { ColumnData } from "../models/virtualizeTableModel";
import { getInterestRateTypes, getPaymentMethods } from "../services/calculatorService";
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
        height: "10rem",
        width: "100%"
    }
}));


const columnNames: ColumnData[] = [
    {
        width: 1,
        label: "Indice",
        dataKey: "index"
    },
    {
        width: 1,
        label: "Fecha",
        dataKey: "date"
    },
    {
        width: 1,
        label: "Periodo de gracia",
        dataKey: "gracePeriod"
    },
    {
        width: 1,
        label: "Bono",
        dataKey: "bond"
    },
    {
        width: 1,
        label: "Cupon",
        dataKey: "coupon"
    },
    {
        width: 1,
        label: "Couta",
        dataKey: "fee"
    },
    {
        width: 1,
        label: "Amortizacion",
        dataKey: "amortization"
    },
    {
        width: 1,
        label: "Prima",
        dataKey: "prima"
    },
    {
        width: 1,
        label: "Escudo",
        dataKey: "shield"
    },
    {
        width: 1,
        label: "Flujo emisor",
        dataKey: "emmiteFlow"
    },
    {
        width: 1,
        label: "Flujo emisor con escudo",
        dataKey: "emmiterShieldFlow"
    },
    {
        width: 1,
        label: "Flujo bonista",
        dataKey: "holderFlow"
    }
];


function Calculator() {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const [inputData, setInputData] = useState({
        emmitionDate: new Date()
    } as BondCalculatorInput);

    const handleEmmitionDate = (newDate: any) => setInputData({
        ...inputData,
        emmitionDate: newDate
    });

    const [errors, setErrors] = useState({} as any);

    const [inputExpanded, setInputExpanded] = useState(true);
    const [outputExpanded, setOutputExpanded] = useState(false);

    const [outputData, setOutputData] = useState({
        data: []
    } as BondCalculatorOutput);

    const changeValue = (event: any) => {
        const { name, value } = event.target;
        setInputData({
            ...inputData,
            [name]: value
        });
        //validate({ [name]: value });
    };

    const handleInputAccordion = () => setInputExpanded(!inputExpanded);
    const handleOuputAccordion = () => setOutputExpanded(!outputExpanded);

    const calculate = () => {
        setInputExpanded(!inputExpanded);
        setOutputExpanded(true);
    }

    const [selectionData, setSelectionData] = useState({
        paymentMethods: [] as EnumType[],
        insterestRateTypes: [] as EnumType[],
        capitalizations: [] as EnumType[]
    });


    useEffect(() => {
        async function getPaymentMethodsAux() {
            const data = await getPaymentMethods();
            setSelectionData({
                ...selectionData,
                paymentMethods: data
            });
        }

        async function getInterestRateTypesAux() {
            const data = await getInterestRateTypes();
            setSelectionData({
                ...selectionData,
                insterestRateTypes: data
            });
        }
    }, [selectionData])


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
                                    onChange={changeValue}
                                >
                                    {selectionData.paymentMethods.map(e => {
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
                                onChange={changeValue}
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
                                onChange={changeValue}
                                error={(errors.commercial?.length > 0)}
                                helperText={errors.commercial}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="couponFrequency"
                                name="couponFrequency"
                                label="Frenquencia del cupon"
                                onChange={changeValue}
                                error={(errors.couponFrequency?.length > 0)}
                                helperText={errors.couponFrequency}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="daysPerYear"
                                name="daysPerYear"
                                label="Dias por año"
                                onChange={changeValue}
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
                                    onChange={changeValue}
                                >
                                    {selectionData.insterestRateTypes.map(e => {
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
                                    onChange={changeValue}
                                >
                                    {selectionData.capitalizations.map(e => {
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
                                onChange={changeValue}
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
                                onChange={changeValue}
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
                                onChange={changeValue}
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
                                    value={inputData.emmitionDate}
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
                                onChange={changeValue}
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
                                onChange={changeValue}
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
                                onChange={changeValue}
                                error={(errors.cavali?.length > 0)}
                                helperText={errors.cavali}
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

            <Paper className={classes.table}>
                <VirtualizedTable
                    rowCount={outputData.data.length}
                    rowGetter={({ index }) => outputData.data[index]}
                    columns={columnNames}
                    headerHeight={100}
                />
            </Paper>



        </Fragment>
    );
}


export default Calculator;