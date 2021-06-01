import { AppBar, Link as StyledLink, makeStyles, Toolbar, Typography, Button, MenuItem, IconButton, Drawer } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';



const headersData = [
    {
        label: "Inicio",
        href: "/",
    },
    {
        label: "Calculadora",
        href: "/calculator",
    },
    {
        label: "Compra/Venta",
        href: "/buysell",
    },
    {
        label: "Configuracion",
        href: "/configuracion",
    },
    {
        label: "Salir",
        href: "/logout"
    }
];

const useStyles = makeStyles(() => ({
    header: {
        paddingRight: "79px",
        paddingLeft: "118px",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    drawerContainer: {
        padding: "20px 30px",
    },
    drawerLink: {
        color: "white",
        textDecoration: "none"
    }
}));




function AppNavBar(props: any) {

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
      });
    
    const { mobileView, drawerOpen } = state;


    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
        };

        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        }
    }, []);

    const classes = useStyles();

    const logo = (
        <Typography variant="h6" component="h1" className={classes.logo}>
            Bonos App
        </Typography>
    );

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Button
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: Link,
                        className: classes.menuButton,
                    }}
                >
                    {label}
                </Button>
            );
        });
    };

    const displayDesktop = () => {
        return (
            <Toolbar className={classes.toolbar}>
                {logo}
                <div>{getMenuButtons()}</div>
            </Toolbar>
        );
    };

    const getDrawerChoices = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Link
                    {...{
                        component: Link,
                        to: href,
                        color: "inherit",
                        className: classes.drawerLink,
                        key: label,
                    }}
                >
                    <MenuItem>{label}</MenuItem>
                </Link>
            );
        });
    };


    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar>
                <IconButton
                    {...{
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: handleDrawerOpen,
                    }}
                >
                    <MenuIcon/>
                </IconButton>

                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>

                <div>{logo}</div>
            </Toolbar>
        );
    };



    return (
        <AppBar className={classes.header} position="sticky">
            {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
    )

}

export default AppNavBar;