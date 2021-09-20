import React, {Fragment, useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Select from "react-select";
import OwnPaper from "./OwnPaper";
import {useDrop} from 'react-dnd';
import PopUp from "./PopUp";
import PopUpDone from "./PopUpDone";
import useStyles from "./Styles";

export default function ActivityBase(){
    const classes = useStyles();

    const [activatedArray, setActivatedArray] = useState([[],[],[],[],[]]);
    const [selectedActivity, setSelectedActivity] = useState('');
    const [valueArray, setValueArray] = useState('');
    const [drop2Count, setDrop2Count] = useState(0);
    const[pop, setPop]= useState(<div></div>);
    const[pop2, setPop2]= useState(<div></div>);

    useEffect(() => {
        fetch('/api/activities_list', {
            method: 'get',
        }).then(r => r.json()).then(value => setValueArray(value.message));
    }, [])


    const [{ canDrop1, isOver1 }, drop1] = useDrop(
        () => ({
            accept: "activated",
            drop: (object) => {
                fetch('/api/verify', {
                    method: 'POST',
                    body: JSON.stringify(object)
                }).then(r => {});
                fetch('/api/get_activated', {
                    method: 'POST',
                    body: JSON.stringify({"id": object.data.activity_id})
                }).then(r => r.json()).then(data => setActivatedArray(data.message));
            },
            collect: (monitor) => ({
                isOver1: monitor.isOver(),
                canDrop1: monitor.canDrop()
            })
        }),
    )

    const [{ canDrop2, isOver2 }, drop2] = useDrop(
        () => ({
            accept: "verified",
            drop: (object, monitor) => {
                setPop(<PopUp data={[object, setPop, setActivatedArray]} />);
            },
            collect: (monitor) => ({
                isOver2: monitor.isOver(),
                canDrop2: monitor.canDrop()
            })
        }),
    )
    const [{ canDrop3, isOver3 }, drop3] = useDrop(
        () => ({
            accept: "reward",
            drop: (object) => {
                setPop(<PopUpDone data={[object, setPop, setActivatedArray]} />);
            },
            collect: (monitor) => ({
                isOver3: monitor.isOver(),
                canDrop3: monitor.canDrop()
            })
        }),
    )


    const [{ canDrop4, isOver4 }, drop4] = useDrop(
        () => ({
            accept: "done",
            drop: (object) => {
                setPop(<PopUpDone data={[object, setPop, setActivatedArray]} />);
            },
            collect: (monitor) => ({
                isOver3: monitor.isOver(),
                canDrop3: monitor.canDrop()
            })
        }),
    )

    const isActive1 = canDrop1 && isOver1;
    let backg1 = '#3F51B5';
    if (isActive1) {
        backg1 = '#667292';
    }
    else if (canDrop1) {
        backg1 = '#FCCA00';
    }

    const isActive2 = canDrop2 && isOver2;
    let backg2 = '#3F51B5';
    if (isActive2) {
        backg2 = '#667292';
    }
    else if (canDrop2) {
        backg2 = '#FCCA00';
    }

    const isActive3 = canDrop3 && isOver3;
    let backg3 = '#3F51B5';
    if (isActive3) {
        backg3 = '#667292';
    }
    else if (canDrop3) {
        backg3 = '#FCCA00';
    }


    const isActive4 = canDrop4 && isOver4;
    let backg4 = '#3F51B5';
    if (isActive3) {
        backg4 = '#667292';
    }
    else if (canDrop4) {
        backg4 = '#FCCA00';
    }


    if(drop2Count < activatedArray[1].length){
        setDrop2Count(activatedArray[1].length);
        fetch('/api/get_activated', {
            method: 'POST',
            body: JSON.stringify({"id": selectedActivity.value})
        }).then(r => r.json()).then(data => setActivatedArray(data.message));
    }

    return (
        <div>
        <Container className={classes.container_ActivityBase} maxWidth="xl">
            {pop}
            <Grid container spacing={2}>
                <Grid className={classes.search_ActivityBase} item xs={12}>
                    <Grid item xs={6} sm={2}>
                        <Fragment>
                            <Select 
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={"Activity"}
                                onChange={(value) =>  setSelectedActivity(value)}
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={true}
                                name="color"
                                options={valueArray}
                            />
                        </Fragment>
                        <Button  onClick={() => {
                            fetch('/api/get_activated', {
                                method: 'POST',
                                body: JSON.stringify({"id": selectedActivity.value})
                            }).then(r => r.json()).then(data => setActivatedArray(data.message));
                            setDrop2Count(activatedArray[1].length);
                        }}>saasdasd </Button>
                    </Grid>
                </Grid>
                <Grid onChange={() =>
                        {
                            fetch('/api/get_activated', {
                                method: 'POST',
                                body: JSON.stringify({"id": selectedActivity.value}),
                            }).then(r => r.json()).then(data => setActivatedArray(data.message));
                            <div></div>
                        }}
                      item xs={6} sm={2}>
                    <Paper className={classes.paper_ActivityBase}><b>Подключена</b></Paper>
                    {
                        activatedArray[0].map((element,index)=> {
                            return <OwnPaper data={element}
                                             typp="activated"
                                             setArray={setActivatedArray}
                                             key={element.connection_id} index={index}/>
                        })
                    }
                    <div> 
                        <Link style={{alignSelf:'center', textDecoration: 'none'}} to="/connect_act"><Button className={classes.button_ActivityBase}>Добавить</Button></Link>
                    </div>
                </Grid>
                <Grid ref={drop1}
                      item xs={6} sm={2} style={{backgroundColor:backg1}}>
                    <Paper className={classes.paper_ActivityBase}><b>Подведение результатов</b></Paper>
                    {
                        activatedArray[1].map((element,index)=> {
                            return <OwnPaper data={element} typp="verified" key={element.connection_id} index={index}/>
                        })
                    }
                </Grid>
                <Grid item xs={6} sm={2} ref={drop2} style={{backgroundColor:backg2}}>
                    <Paper className={classes.paper_ActivityBase}><b>Ожидание подтверждения</b></Paper>
                    {
                        activatedArray[2].map((element,index)=> {
                            return <OwnPaper data={element} typp="reward" key={element.connection_id} index={index}/>
                        })
                    }
                </Grid>
                <Grid ref={drop3} item xs={6} sm={2} style={{backgroundColor:backg3}}>
                    <Paper className={classes.paper_ActivityBase}><b>Вознаграждение</b></Paper>
                    {
                        activatedArray[3].map((element,index)=> {
                            return <OwnPaper data={element} typp="done" key={element.connection_id} index={index}/>
                        })
                    }
                </Grid>
                <Grid ref={drop4} item xs={6} sm={2} style={{backgroundColor:backg4}}>
                    <Paper className={classes.paper_ActivityBase}><b>Завершено</b></Paper>
                    {
                        activatedArray[4].map((element,index)=> {
                            return <OwnPaper data={element} typp="result" key={element.connection_id} index={index}/>
                        })
                    }
                </Grid>
            </Grid>
        </Container>
    </div>
    )
}