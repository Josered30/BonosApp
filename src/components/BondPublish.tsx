import { Paper, Typography, makeStyles, useTheme, useMediaQuery, Divider } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSpinner } from "../core/contexts/SpinnerContext";
import { BondPublication } from "../core/models/dtos/bondPublication";
import { LegalPerson } from "../core/models/dtos/legalPerson";
import { NaturalPerson } from "../core/models/dtos/naturalPerson";

const useStyles = makeStyles((theme) => ({
    title: {
        margin: "1rem 0rem",
        [theme.breakpoints.down('xs')]: {
            textAlign: "center"
        }
    },
    paper: {
        padding: "2rem"
    },

    subContent: {
        padding: "1rem 0rem"
    }
}));


type Data = {
    bondPublication?: BondPublication;
    issuer?: LegalPerson;
    holder?: NaturalPerson;
}

function BondPublish(props: any) {
    const [data, setData] = useState({} as Data);
    const { spinnerDispatcher } = useSpinner();
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));


    const { bondPublicationId }: any = useParams();

    useEffect(() => {
    }, []);


    return (
        <Fragment>
            <Paper className={classes.paper}>
                <Typography className={classes.title} variant={!matches ? "h4" : "h5"}> Bono: {data.bondPublication?.name}</Typography>
                
                <Divider />
                <div className={classes.subContent}>
                    <Typography className={classes.title} variant="h5">Datos del Emisor</Typography>


                </div>



            </Paper>


        </Fragment>
    );

}

export default BondPublish;