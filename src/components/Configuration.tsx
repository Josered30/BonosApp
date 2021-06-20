import { Button, Drawer, Grid, makeStyles, Paper, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Fragment, useRef } from "react";
import ImageUploader from "./ImageUploader";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.primary.main,
        border: 0
    },
    content: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gridTemplateRows: "repeat(4,1fr)",
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: "1fr",
        }
    },
    title: {
        margin: "1rem 0rem",
        [theme.breakpoints.down('xs')]: {
            textAlign: "center"
        }
    },
    imageContent: {
        gridRow: "span 4 / auto"
    },
    paper: {
        padding: "2rem"
    },
    buttoms: {
        alignSelf: "flex-end",
    },
    items: {
        margin: "1rem 1rem",
    },
    configContent: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        [theme.breakpoints.down('xs')]: {
            margin: "0rem",
            padding: "0rem",
        }
    }

}));


function NaturalPersonConfig(props: any) {
    const classes = useStyles();
    return (
        <div className={classes.configContent}>
            <div className={classes.content}>
                <ImageUploader className={classes.imageContent} radious="50%" defaultImage="/images/profile.svg" />
                <TextField
                    id="name"
                    name="name"
                    label="Nombres"
                    autoComplete="off"
                />
                <TextField
                    id="lastName"
                    name="lastName"
                    label="Apellidos"
                    autoComplete="off"
                />
                <TextField
                    id="dni"
                    name="dni"
                    label="DNI"
                    autoComplete="off"
                />
                <TextField
                    id="email"
                    name="email"
                    label="Correo"
                    autoComplete="off"
                />
            </div>

            <div className={classes.buttoms}>
                <Button className={classes.items} variant="contained" color="primary">Guardar</Button>
                <Button className={classes.items} variant="contained" color="primary">Editar</Button>
            </div>

        </div>
    );
}


function LegalPersonConfig(props: any) {
    const classes = useStyles();
    return (
        <div className={classes.configContent}>
            <div className={classes.content}>
                <ImageUploader className={classes.imageContent} radious="50%" defaultImage="/images/profile.svg" />
                <TextField
                    id="bussinessName"
                    name="bussinessName"
                    label="Razon social"
                    autoComplete="off"
                />
                <TextField
                    id="email"
                    name="email"
                    label="Correo"
                    autoComplete="off"
                />
            </div>

        </div>
    );
}



function Configuration(props: any) {

    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Fragment>
            <Paper className={classes.paper}>
                <Typography className={classes.title} variant={!matches ? "h4" : "h5"}>
                    Configuracion del Perfil
                </Typography>
                <NaturalPersonConfig />
            </Paper>
        </Fragment>
    );
}

export default Configuration;