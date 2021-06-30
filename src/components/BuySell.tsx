import { Button } from "@material-ui/core";
import { Fragment, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { Spinner } from "./Spinner";




function BuySell() {

    const history = useHistory();
    const toBondPublication = (event: any) => {
        history.push('/bondPublication/10');
    };

    return (
        <Fragment>
            <Button onClick={toBondPublication}>dsad</Button>
      
        </Fragment>
    );
}

export default BuySell;