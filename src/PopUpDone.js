import React, {Fragment, useEffect, useRef, useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { TextField} from "@material-ui/core";
import Select from "react-select";
import useStyles from "./Styles";
import CanvasDraw from "react-canvas-draw";

export default function PopUpDone({data}){
    const classes = useStyles();

    const [input, setInput] = useState("");
    const [selectedReward, setSelectedReward] = useState('')
    const [arrayReward, setArrayReward] = useState('')
    const [imageURL, setImageURl] = useState(null);

    const sigCanvas = useRef({});
    const clear = () => sigCanvas.current.clear();
    try{
        if (sigCanvas.current) {
            // this will get the canvas HTML element where everyhting that's painted is drawn
            // and call the toDataURL() function on it

            //.canvasContainer.children[1].toDataURL()
            console.log(sigCanvas.current.canvasContainer.children.item(1).toDataURL());
        }
    }
    catch{
    }



    useEffect(() => {
        fetch('/api/reward_list', {
            method: 'get',
        }).then(r => r.json()).then(value => setArrayReward(value.message))
    }, [])


    return (
        <Container
            maxWidth="lg"
            className={classes.container_PopUpDone}>
            <Grid container spacing={2}>
                <Grid item xs={12} md>
                    <p className={classes.p_PopUpDone}>Активность</p>
                    <p>{data[0].data.activity_name}</p>
                </Grid>
                <Grid item xs={12} md>
                    <p className={classes.p_PopUpDone}>Точка</p>
                    <p>{data[0].data.store_name}</p>
                </Grid>
                <Grid item xs={12} md>
                    <p className={classes.p_PopUpDone}>Продавец</p>
                    <p>{data[0].data.full_name}</p>
                    <p>{data[0].data.phone}</p>
                </Grid>
                <Grid item xs={12} md>
                    <p className={classes.p_PopUpDone}>Сумма</p>
                    <TextField value={input} variant="outlined" onChange={value => {setInput(value.target.value)}} />
                </Grid>
                <Grid item xs={12} md>
                    <p className={classes.p_PopUpDone}>Вознаграждение</p>
                    <Fragment>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={"Activity"}
                            onChange={(value) =>  setSelectedReward(value)}
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={true}
                            name="color"
                            options={arrayReward}
                        />
                    </Fragment>
                </Grid>
                <Grid xs={12} item className={classes.gridItem_PopUpDone}>
                    <div className={classes.signPadDiv_PopUpDone}>
                        <CanvasDraw
                            ref={ sigCanvas }
                            canvasWidth={"600px"} canvasHeight={"300px"} hideGrid brushRadius={3} brushColor={"black"}/>
                    </div>

                </Grid>
                <Grid item xs={12} className={classes.gridItem_PopUpDone}>
                    <Button onClick={clear} className={classes.button_PopUpDone}>Очистить</Button>
                    <Button
                        onClick={
                                    () =>
                                    {setImageURl(sigCanvas.current.canvasContainer.children.item(1).toDataURL())}
                                }
                        className={classes.button_PopUpDone}>Сохранить</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={() => {{data[1](<div></div>)}}} className={classes.button_PopUpDone}>Выйти</Button>
                    {input && imageURL && selectedReward
                        ? <Button className={classes.button_PopUpDone} style={{float:"right"}}
                                  onClick={() => {
                                      fetch('/api/done', {
                                          method: 'POST',
                                          body: JSON.stringify({"connection_id":data[0].data.connection_id,
                                                                      "reward":selectedReward.value,
                                                                      "total": input,
                                                                      "signature": imageURL
                                          })
                                      }).then(r => {});
                                      window.setTimeout(data[1](<div></div>), 700);
                                      fetch('/api/get_activated', {
                                          method: 'POST',
                                          body: JSON.stringify({"id": data[0].data.activity_id})
                                      }).then(r => r.json()).then(value => data[2](value.message))
                                  }}>
                            Подтвердить
                        </Button>
                        : <Button style={{float:"right"}} disabled className={classes.button_PopUpDone}>Подтвердить</Button>
                    }
                </Grid>
            </Grid>
        </Container>);
}