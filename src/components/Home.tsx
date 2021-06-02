import { Button } from "@material-ui/core";
import { useSpinner } from "../contexts/SpinnerContext";

function Home() {
    const { spinnerDispatcher } = useSpinner();

    return (<div>
        <Button onClick={() => spinnerDispatcher({ type: 'loading' })} >dfdsfks</Button>
    </div>);
}

export default Home;