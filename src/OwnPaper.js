import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useDrag } from 'react-dnd'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    p:{
        textAlign: "center",
        color: 'white',
    },
}));

export default function OwnPaper({data, typp, setArray}){
        const classes = useStyles();
        const [{isDragging}, drag] = useDrag(() => ({
            type: typp,
            item: {data},
            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
            }),
        }))
        return (<div ref={drag}>
                    <Paper className={classes.paper}>
                        <p>Store code : {data.store_code}</p>
                        <p>Store name : {data.store_name}</p>
                        <p>Cashier : {data.full_name}</p>
                        <p>Phone could be confidential</p>
                        <p>Phone : {data.phone}</p>
                    </Paper>
                </div>
        );
}