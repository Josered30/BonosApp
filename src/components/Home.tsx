import { makeStyles, Paper, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { useAuth } from "../core/contexts/AuthContext";
import { BondSummary } from "../core/models/bondSummary";
import { Role } from "../core/models/enums/role";
import { ColumnData } from "../core/models/virtualizeTableModel";
import testData from "../core/utils/testData";
import VirtualizedTable from "./VirtualizeTable";

const useStyles = makeStyles((theme) => ({

    title: {
        margin: "2rem 0rem"
    },
    table: {
        height: "20rem",
        width: "100%",
    },

    tableWrapper: {
        margin: "2rem 0rem"
    },

    tableLabel: {
        display: "inline-block",
        backgroundColor: theme.palette.primary.main,
        padding: "0.5rem 0.8rem",
        borderRadius: "10px 10px 0px 0px"
    }
}));


const boughtBondsHeader: ColumnData[] = [
    {
        width: 400,
        dataKey: "title",
        label: "Titulo"
    },
    {
        width: 400,
        dataKey: "emmiterName",
        label: "Emisor"
    },
    {
        width: 500,
        dataKey: "nextPaymentDate",
        label: "Proximo pago"
    },
    {
        width: 500,
        dataKey: "lastPaymentDate",
        label: "Ultimo pago"
    },
    {
        width: 500,
        dataKey: "buySellDate",
        label: "Fecha de adquisicion"
    },
];


interface TablesData {
    buyTableData: BondSummary[],
    sellTableData: BondSummary[]
}


async function getBuyTableData(setTablesData: any): Promise<void> {
    setTablesData((state: TablesData) => ({
        ...state,
        buyTableData: testData
    }));
}


function DataTable({ title, data, headers, ...rest }: any) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xs"));
    const classes = useStyles();


    if (!matches) {
        return (
            <div className={classes.tableWrapper}>

                <Typography className={classes.tableLabel} variant="h6">
                    {title}
                </Typography>

                <Paper className={classes.table}>
                    <VirtualizedTable
                        rowCount={data.length}
                        rowGetter={({ index }) => data[index]}
                        columns={headers}
                        headerHeight={40}
                    />
                </Paper>
            </div>
        );
    }

    return null;
}


function Home() {
    const classes = useStyles();

    const [tablesData, setTablesData] = useState({
        buyTableData: [],
        sellTableData: [],
    } as TablesData);

    useEffect(() => {
        getBuyTableData(setTablesData);
    }, []);

    const { authState } = useAuth();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xs"));

    //const { spinnerDispatcher } = useSpinner();

    return (
        <Fragment>
            <div className={classes.title}>
                <Typography variant={matches ? "h5" : "h3"}>
                    Bienvenido a Bono App
                </Typography>
            </div>

            <DataTable title="Bonos Adquiridos" data={tablesData.buyTableData} headers={boughtBondsHeader} />

            {(authState.role === Role.Bussinness || authState.role === Role.Institution) ?
                <DataTable title="Bonos Vendidos" data={tablesData.buyTableData} headers={boughtBondsHeader} /> : null
            }
        </Fragment>
    );
}

export default Home;