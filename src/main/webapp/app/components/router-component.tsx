import * as React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {hot} from 'react-hot-loader';
import {WebsocketGrid} from "app/components/websocket-grid";

interface IState {
    isSmallScreen: boolean;
}


class RouterComponent extends React.Component<Record<string, unknown>, IState> {


    constructor(props) {
        super(props);
        this.state = {isSmallScreen: false};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    private updateDimensions = (e: any) => {
        this.setState({isSmallScreen: window.innerWidth < 500});
    };

    public render() {
        return (
            <BrowserRouter>
                <div style={{width: '100%', height: '100%'}}>

                    <Switch>
                        <Route exact path={ '/'}
                               component={WebsocketGrid}/>
                        <Redirect to={'/'}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

declare let module: Record<string, unknown>;

export default hot(module)(RouterComponent);
