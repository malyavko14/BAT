import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import { useDrop } from 'react-dnd'
import useStyles from "./Styles";


export default function DropVerified() {
    const classes = useStyles();

    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: "Activity",
            drop: (object, monitor) => {console.log(monitor.getItem())},
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            })
        }),
    )

    const isActive = canDrop && isOver;
    let backg = '#3F51B5';
    if (isActive) {
        backg = '#667292';
    }
    else if (canDrop) {
        backg = '#FCCA00';
    }

    return (
            <Grid ref={drop} item xs={6} sm={3} style={{backgroundColor:backg }}>
                    <p className={classes.p_DropVerified}>Результаты</p>
                    <Paper className={classes.paper_DropVerified}>Результаты</Paper>
                    {isOver}
            </Grid>
    );
}
