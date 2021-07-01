import { Button, Divider, makeStyles, Paper, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Fragment, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { RowMouseEventHandlerParams } from "react-virtualized";
import { useAuth } from "../core/contexts/AuthContext";
import { BondSummary } from "../core/models/dtos/bondSummary";
import { Role } from "../core/models/enums/role";
import { ColumnData } from "../core/models/virtualizeTableModel";
import { buyData } from "../core/utils/testData";
import { Spinner } from "./Spinner";
import VirtualizedTable from "./VirtualizeTable";

const useStyles = makeStyles((theme) => ({
    title: {
        margin: "1rem 0rem",
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
        height: "50vh",
    }
}));

const columnNames: ColumnData[] = [
    {
        width: 300,
        label: "Nombre",
        dataKey: "name"
    },
    {
        width: 300,
        label: "Emisor",
        dataKey: "issuer",
    },
    {
        width: 300,
        label: "Valor nominal",
        dataKey: "nominalValue",
    },
    {
        width: 200,
        label: "TIR",
        dataKey: "tir",
    },
    {
        width: 200,
        label: "Duracion modificada",
        dataKey: "modifiedDuration",
    },
    {
        width: 200,
        label: "Fecha de emision",
        dataKey: "emmitionDate",
    },
];



function BuySell() {

    const history = useHistory();

    const toBondPublication = (info: RowMouseEventHandlerParams) => {
        history.push(`/bondPublication/${info.rowData.id}`);
    };

    const toBondEmmision = (event: any) => {
        history.push(`/bondEmission`);
    };

    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    const { authState } = useAuth();
    const [data, setData] = useState<Array<BondSummary>>([]);

    useEffect(() => {
        setData(buyData);
    }, [])


    return (
        <Fragment>
            <Typography className={classes.title} variant={matches ? "h5" : "h3"}>Bonos publicados</Typography>
            <Paper className={classes.paper}>


                <div className={classes.subContent}>
                    <div className={classes.tableFill}>
                        <VirtualizedTable
                            rowCount={data.length}
                            rowGetter={({ index }) => data[index]}
                            columns={columnNames}
                            onRowClick={toBondPublication}
                        />
                    </div>
                </div>
                <Divider style={{ width: "100%" }} />

                {authState.role === Role.Bussinness || authState.role === Role.Institution ?
                    <div className={classes.subContent}>
                        <Button onClick={toBondEmmision} variant="contained" color="primary">
                            Emitir un bono
                        </Button>
                    </div>
                    : null
                }
            </Paper>



        </Fragment >
    );
}

export default BuySell;