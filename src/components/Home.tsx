import { makeStyles, Paper, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Fragment, useState } from "react";
import { ColumnData } from "../models/virtualizeTableModel";
import VirtualizedTable from "./VirtualizeTable";

const useStyles = makeStyles((theme) => ({

    title: {
        margin: "2rem 0rem"
    },
    table: {
        height: "10rem",
        width: "100%",
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
        width: 1,
        dataKey: "title",
        label: "Titulo"
    },
    {
        width: 1,
        dataKey: "emmiterName",
        label: "Emisor"
    },
    {
        width: 1,
        dataKey: "nextPaymentDate",
        label: "Proximo pago"
    },
    {
        width: 1,
        dataKey: "adquisitionDate",
        label: "Fecha de adquisicion"
    },

];



function Home() {
    const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xs"));

    const [tablesData, setTablesData] = useState({
        buyTableData: [],
        sellTableData: []
    });

    return (
        <Fragment>
            <div className={classes.title}>
                <Typography variant={matches ? "h5" : "h3"}>
                    Bienvenido a Bono App
                 </Typography>
            </div>

            {!matches ? <div>
                <div className={classes.tableLabel}>
                    <Typography variant="h6">
                        Bonos adquiridos
                    </Typography>
                </div>
                <Paper className={classes.table}>
                    <VirtualizedTable
                        rowCount={tablesData.buyTableData.length}
                        rowGetter={({ index }) => tablesData.buyTableData[index]}
                        columns={boughtBondsHeader}
                        headerHeight={40}
                    />
                </Paper>
            </div> : null}
        </Fragment>
    );
}

export default Home;