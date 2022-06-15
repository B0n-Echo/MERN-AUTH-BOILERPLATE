import { BrowserRouter, Switch ,Route } from "react-router-dom";
import App from "./App";

const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/signin"  component={App} />
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;