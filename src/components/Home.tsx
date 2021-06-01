import { Button } from "@material-ui/core";
import { useSpinner } from "../contexts/SpinnerContext";

function Home() {
    const { dispatch } = useSpinner();

    return (<div>
        <Button onClick={() => dispatch({ type: 'loading' })} >dfdsfks</Button>
    </div>);
}

export default Home;