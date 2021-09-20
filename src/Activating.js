import React, {Fragment, useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Select from "react-select";
import Paper from "@material-ui/core/Paper";
import useStyles from "./Styles";


export default function ActivityBase(){
    const classes = useStyles();

    const [activitiesArray, setActivitiesArray] = useState('')
    const [storesArray, setStoresArray] = useState('')
    const [chashiersArray, setChashiersArray] = useState([])

    const [selectedActivity, setSelectedActivity] = useState('')
    const [selectedStore, setSelectedStore] = useState('')
    const [selectedChashier, setSelectedChashier] = useState('')
    const [disableCond, setDisableCond] = useState(true)

    useEffect(() => {
        fetch('/api/activities_list', {
            method: 'get',
        }).then(r => r.json()).then(value => setActivitiesArray(value.message))
    }, [])

    useEffect(() => {
        fetch('/api/stores_list', {
            method: 'get',
        }).then(r => r.json()).then(value => setStoresArray(value.message))
    }, [])

    // if (selectedStore !== ''){
    //     fetch('/api/chashiers_list', {
    //         method: 'POST',
    //         body: JSON.stringify({"store_id": selectedStore})
    //     }).then(r => r.json()).then(value1 => setChashiersArray(value1.message));
    //     setDisableCond(false);
    // }



    return (
            <Container className={classes.container_Activating} maxWidth="lg">
                <Grid container spacing={2}>
                        <Grid item xs={6} sm={4}>
                            <Paper className={classes.paper_Activating}><b>Активность</b></Paper>
                            <Fragment>
                                <Select
                                    onChange={value => setSelectedActivity(value.value)}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={"Activity"}
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={true}
                                    isRtl={false}
                                    isSearchable={true}
                                    name="color"
                                    options={activitiesArray}
                                />
                            </Fragment>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Paper className={classes.paper_Activating}><b>Точка</b></Paper>
                            <Fragment>
                                <Select
                                    onChange={value => {
                                        setSelectedStore(value.value); setDisableCond(false);
                                    }}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={"Activity"}
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={true}
                                    isRtl={false}
                                    isSearchable={true}
                                    name="color"
                                    options={storesArray}
                                />
                            </Fragment>
                            <Button onClick={() => {
                                if(selectedActivity!=="" && selectedStore!=="" && selectedChashier!=="")
                                {
                                    fetch('/api/activate', {
                                        method: 'POST',
                                        body: JSON.stringify({"actId": selectedActivity, "storeId": selectedStore, "cashId": selectedChashier})
                                    }).then(r => {})
                                        .catch(e => {console.log(e)})
                                }
                                else{
                                    console.log("Null fields")
                                }

                            }
                            }
                                    className={clsx(classes.button_Activating)}>Добавить</Button>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Paper className={classes.paper_Activating}><b>Кассир</b></Paper>
                            <Fragment>
                                <Select
                                    onInputChange={() =>{
                                        fetch('/api/chashiers_list', {
                                            method: 'POST',
                                            body: JSON.stringify({"store_id": selectedStore})
                                        }).then(r => r.json()).then(value1 => setChashiersArray(value1.message));
                                    }}
                                    onChange={value => {
                                        let array = [];
                                            value.forEach(element => array.push(element.value));
                                        setSelectedChashier(array);
                                    }}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={"Activity"}
                                    isLoading={false}
                                    isMulti
                                    isDisabled={disableCond}
                                    isClearable={true}
                                    isRtl={false}
                                    isSearchable={true}
                                    name="color"
                                    options={chashiersArray}
                                />
                            </Fragment>
                        </Grid>
                    <Grid container item xs={12} spacing={3}>
                    </Grid>
                </Grid>
            </Container>
    )
}