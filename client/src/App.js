import React from "react";
import {Route, Switch} from "react-router-dom";
import Terminals from "./app/layouts/terminals";
import CreateTerminal from "./app/components/page/createTerminal";
import CreateBody from "./app/components/page/createBody";
import CreateWorks from "./app/components/page/createWorks";
import './App.css';
import AppLoader from "./app/components/ui/hoc/appLoader";
import EditTerminalPage from "./app/components/page/editTerminalPage";
import EditWorkPage from "./app/components/page/editWorkPage";
import CreateExtraWorks from "./app/components/page/createExtraWorks";
import EditExtraWorksPage from "./app/components/page/editExtraWorksPage";
import TerminalInfo from "./app/components/page/terminalInfo";
import InfoPage from "./app/components/page/infoPage";
import EditInfo from "./app/components/page/editInfo";
import CreateInfo from "./app/components/page/createInfo";
import NavBar from "./app/components/ui/navBar";
import Login from "./app/layouts/login";
import UserLoader from "./app/components/ui/hoc/userLoader";
import Users from "./app/layouts/terminals";
import CreateSetting from "./app/components/page/createSettings";

function App() {

    return (
        <>
            <AppLoader>
                {/*<UserLoader>*/}
                    <NavBar/>
                    <div>
                        <Switch>
                            <Route path='/:id?/editExtraWorks' component={EditExtraWorksPage}/>
                            <Route path='/:id?/editWork' component={EditWorkPage}/>
                            <Route path='/:id?/editTerminal' component={EditTerminalPage}/>
                            <Route path='/:id?/terminalInfo' component={TerminalInfo}/>
                            <Route path='/:id?/editInfo' component={EditInfo}/>
                            <Route path='/createInfo' component={CreateInfo}/>
                            <Route path='/infoPage' component={InfoPage}/>
                            <Route path='/createExtraWorks' component={CreateExtraWorks}/>
                            <Route path='/createWorks' component={CreateWorks}/>
                            <Route path='/createBody' component={CreateBody}/>
                            <Route path='/createSetting' component={CreateSetting}/>
                            <Route path='/createTerminal' component={CreateTerminal}/>
                            <Route path='/login/:type?' component={Login}/>
                            <Route path='/' exact component={Terminals}/>
                        </Switch>
                    </div>
                {/*</UserLoader>*/}
            </AppLoader>
        </>
    );
}

export default App;
