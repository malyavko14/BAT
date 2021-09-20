import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { TextField} from "@material-ui/core";
import useStyles from "./Styles";

export default function PopUp({data}){
    const classes = useStyles();

    const [input, setInput] = useState("");

    return (
        <Container
            maxWidth="sm"
            className={classes.container_PopUp}>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                    <p className={classes.p_PopUp}>Активность</p>
                    <p>{data[0].data.activity_name}</p>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <p className={classes.p_PopUp}>Точка</p>
                    <p>{data[0].data.store_name}</p>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <p className={classes.p_PopUp}>Продавец</p>
                    <p>{data[0].data.full_name}</p>
                    <p>{data[0].data.phone}</p>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <p className={classes.p_PopUp}>Результат</p>
                    <TextField value={input} variant="outlined" onChange={value => {setInput(value.target.value)}} />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={() => {{data[1](<div></div>)}}} className={classes.button_PopUp}>Выйти</Button>
                    {input
                        ? <Button style={{float:"right"}}
                                  onClick={() => {
                                      fetch('/api/reward', {
                                          method: 'POST',
                                          body: JSON.stringify({"connection_id":data[0].data.connection_id, "result": input })
                                      }).then(r => {});
                                      data[1](<div></div>);
                                      fetch('/api/get_activated', {
                                          method: 'POST',
                                          body: JSON.stringify({"id": data[0].data.activity_id})
                                      }).then(r => r.json()).then(value => data[2](value.message))
                                      }
                                  }
                                  className={classes.button_PopUp}>
                            Подтвердить
                         </Button>
                        : <Button style={{float:"right"}} disabled className={classes.button_PopUp}>Подтвердить</Button>
                    }
                </Grid>

            </Grid>


        </Container>);
}