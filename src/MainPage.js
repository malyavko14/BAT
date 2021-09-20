import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import RoleChecker from "./RoleChecker.js";
import {logout} from "./auth/index";
import React, {useEffect, useState} from "react";
import ActivityBase from "./ActivityBase.js";
import Activating from "./Activating";
import UserBase from "./header/UserBase";
import CashierBase from "./header/CashierBase";
import StoreBase from  "./header/StoreBase";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend'
import useStyles from "./Styles";


export default function MainPage({condition}) {
    const classes = useStyles();
    return (
        <div>
            <Router>
                <div className={classes.root_MainPage}>
                    <AppBar position="static">
                        <Toolbar className={classes.buttonsLeft_MainPage}>
                            <Link className={classes.button_Header} style={{textDecoration: 'none'} } to="/"><Button>База активностей</Button></Link>
                            <Link className={classes.button_Header} style={{textDecoration: 'none'}} to="/spotbase"><Button>База точек</Button></Link>
                            <Link className={classes.button_Header} style={{textDecoration: 'none'}} to="/cashierbase"><Button>База кассиров</Button></Link>
                            <Link className={classes.button_Header} style={{textDecoration: 'none'}} to="/usersbase"><Button>База пользователей</Button></Link>
                            <Button className={classes.buttonLogout_MainPage} color="inherit" onClick={() => logout()}>Выйти</Button>
                        </Toolbar>
                    </AppBar>
                </div>

                <Switch>
                    <Route path='/activity'>
                    </Route>
                    <Route exact path="/">
                            <DndProvider backend={condition ? HTML5Backend : TouchBackend}>
                                <ActivityBase />
                                <AppBar position="static">
                                    <Toolbar className={classes.buttonsLeft_MainPage} />
                                </AppBar>
                            </DndProvider>
                    </Route>
                    <Route path="/spotbase">
                         <StoreBase />
                    </Route>
                    <Route path="/cashierbase">
                        <CashierBase />
                    </Route>
                    <Route path="/usersbase">
                        <UserBase />
                    </Route>
                    <Route path="/connect_act">
                        <Activating />
                        <AppBar position="static">
                            <Toolbar className={classes.buttonsLeft_MainPage} />
                        </AppBar>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

function Home() {
    useEffect(() => {
        fetch("/api").then(resp => resp.json()).then(resp => console.log(resp))
    }, [])
    return <h2>Home</h2>;
}


function Secret() {
    let state = RoleChecker();
    const [imageUrl, setImageUrl] = useState('');
    if(state === "administrator"){
        fetch('/api/dataurl', {
            method: 'get',
        }).then(r => r.json()).then(value => setImageUrl(value.message));
        console.log(imageUrl)
        return (<div>
            <img
                src={imageUrl}
                alt="Sign"
                style={{
                    display: "block",
                    width: "150px",
                    minHeight: "50px",
                    border: "1px solid #000"
                }}
            />
        </div>);
    }
    else if(state === "user"){
        fetch('/api/dataurl', {
            method: 'get',
        }).then(r => r.json()).then(value => setImageUrl(value.message));
        console.log(imageUrl)
        return (<div>
            <img
                src={imageUrl}
                alt="Sign"
                style={{
                    display: "block",
                    width: "150px",
                    minHeight: "50px",
                    border: "1px solid #000"
                }}
            />
        </div>);
    }
    else if (state === "logging") {
        return (<h2></h2>);
    }
    else{
        return (<div></div>);
    }
}
