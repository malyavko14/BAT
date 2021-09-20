import React, {useState} from "react";
import {login, useAuth, logout} from "./auth/index";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {FilledInput, FormControl, IconButton, InputAdornment, InputLabel} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import clsx from "clsx";
import useStyles from "./Styles";

export default function Login() {
    const classes = useStyles();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [values, setValues] = useState({
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const [logged] = useAuth();

    const onSubmitClick = (e)=>{
        e.preventDefault()
        let opts = {
            'user_name': username,
            'password': password
        }
        fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(opts)
        }).then(r => r.json())
            .then(token => {
                if (token.access_token){
                    login(token)
                }
                else {
                }
            })
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
            <div className={classes.root_Login}>
                <AppBar position="static">
                    <Toolbar>
                    </Toolbar>
                </AppBar>
                    {!logged?
                        <Grid container>
                            <Grid item xs={12} md
                                  style={{
                                      marginTop: "5%",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems:"flex-start",}}>

                                <FormControl className={clsx(classes.margin_Login, classes.textField_Login)} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Логин</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-weight"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        aria-describedby="filled-weight-helper-text"
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                    />
                                </FormControl>

                            </Grid>
                            <Grid item xs={12}
                                  style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems:"flex-start",}}>

                                <FormControl className={clsx(classes.margin_Login, classes.textField_Login)} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Пароль</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                            </Grid>
                        <Grid item xs={12}
                              style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems:"flex-start",}}>

                            <Button className={classes.button_Login}  onClick={onSubmitClick} type="submit">
                                Войти
                            </Button>

                        </Grid>
                    </Grid>
                    : <button onClick={() => logout()}>Выйти</button>}
            </div>
    )
}