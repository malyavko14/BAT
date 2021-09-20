import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    //------------------Login------------------------------------------------------------------------------------------
    //------------------Login------------------------------------------------------------------------------------------
    button_Login: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: "auto",
        marginRight: "auto",
        background: '#e9963e',
        borderRadius: 3,
        border: 0,
        color: 'white',
        width: 170,
        height: 48, 
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },
    root_Login: {
        background: "white",
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin_Login: {
        margin: theme.spacing(1),
    },
    textField_Login: {
        width: '50ch',
    },
    //------------------Login------------------------------------------------------------------------------------------
    //------------------Login------------------------------------------------------------------------------------------

    //------------------MainPage---------------------------------------------------------------------------------------
    //------------------MainPage---------------------------------------------------------------------------------------
    button_Header:{
        margin: theme.spacing(3,2,3,0),
        padding: theme.spacing(1,2,1,2),
        borderRadius: 3,
        color: '#e9963e',
        border: 'black',
    },
    
    root_MainPage: {
        flexGrow: 1,
        textColor: "white"
    },
    menuButton_MainPage: {
        marginRight: theme.spacing(2),
    },
    title_MainPage: {
        flexGrow: 1,
    },
    buttonLogout_MainPage: {
        marginLeft: 'auto',
    },
    buttonsLeft_MainPage: {
        color: 'white',
    },
    //------------------MainPage---------------------------------------------------------------------------------------
    //------------------MainPage---------------------------------------------------------------------------------------

    //------------------PopUpDone--------------------------------------------------------------------------------------
    //------------------PopUpDone--------------------------------------------------------------------------------------
    button_PopUpDone: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        background: 'gray',
        borderRadius: 3,
        border: 0,
        color: 'white',
        width: 170,
        height: 48,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },

    container_PopUpDone:{
        position:"fixed",
        height:"80vh",
        backgroundColor:"white",
        left:"50%",
        border: "solid",
        transform: "translate(-50%, 0)",
        display: "block",
        zIndex: 999999,
        marginTop:"5%"
    },

    gridItem_PopUpDone:{
        display: "flex",
        justifyContent: "center",
        alignItems:"flex-start",
    },
    signPadDiv_PopUpDone:{
        position:"block",
        width:"300",
        height:"300",
        border:"solid",
        borderRadius:"5px",
        borderColor:"#2B2B2B"
    },
    signPadProps_PopUpDone:{
        position:"relative",
        width:"300",
        height:"300",
        className: "signatureCanvas"
    },
    p_PopUpDone:{
        borderBottom: "solid",
        paddingBottom: "3px",
    },
    //------------------PopUpDone--------------------------------------------------------------------------------------
    //------------------PopUpDone--------------------------------------------------------------------------------------

    //------------------ActivityBase-----------------------------------------------------------------------------------
    //------------------ActivityBase-----------------------------------------------------------------------------------

    root_ActivityBase: {
        flexGrow: 1,
    },
    paper_ActivityBase: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        textAlign: 'center',
        color: 'black',
    },
    button_ActivityBase: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        background: '#e9963e',
        borderRadius: 3,
        position: "relative",
        border: 0,
        color: 'black',
        width: 170,
        height: 48,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },
    div_ActivityBase:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    p_ActivityBase:{
        textAlign: "center",
        color: 'white',
    },
    search_ActivityBase:{
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },

    container_ActivityBase:{
        display: "flex",
        height: "100%",
        borderTop:"solid",
        background:"#3F51B5",
        paddingLeft: theme.spacing(30),
    },

    //------------------ActivityBase-----------------------------------------------------------------------------------
    //------------------ActivityBase-----------------------------------------------------------------------------------

    //------------------Activating-------------------------------------------------------------------------------------
    //------------------Activating-------------------------------------------------------------------------------------
    root_Activating:{
        flexGrow: 1,
    },
    paper_Activating:{
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        textAlign: 'center',
        color: 'black',
    },

    //------------------UserBase-------------------------------------------------------------------------------------
    //------------------UserBase-------------------------------------------------------------------------------------

    container_UserBase:{
        backgroundColor:"#3F51B5",
        display: "flex",
        height: "100%",
        borderTop:"solid",
        borderColor:"gray"
    },

    table_UserBase:{
        minWidth: '340px',
    },

    tableHead_UserBase:{
        padding: '10px 8px',
        background: "#3F51B5"
    },

    tableCell_UserBase:{
        width: '200px',
        overflow: "hidden",
        paddingRight: 4,
        paddingLeft: 5,
    },


    button_Activating:{
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        background: '#e9963e',
        alignSelf: 'center',
        borderRadius: 3,
        border: 0,
        color: 'white',
        width: "100%",
        height: 48,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },
    div_Activating:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    p_Activating:{
        textAlign: "center",
        color: 'white',
    },
    search_Activating:{
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    container_Activating:{
        height:"83vh",
        backgroundColor:"#3F51B5",
        display: "flex",
    },
    //------------------Activating-------------------------------------------------------------------------------------
    //------------------Activating-------------------------------------------------------------------------------------

    //------------------DropVerified-----------------------------------------------------------------------------------
    //------------------DropVerified-----------------------------------------------------------------------------------
    paper_DropVerified:{
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    p_DropVerified:{
        textAlign: "center",
        color: 'white',
    },
    //------------------DropVerified-----------------------------------------------------------------------------------
    //------------------DropVerified-----------------------------------------------------------------------------------

    //------------------PopUp-----------------------------------------------------------------------------------------
    //------------------PopUp-----------------------------------------------------------------------------------------
    button_PopUp: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        background: 'gray',
        borderRadius: 3,
        border: 0,
        color: 'white',
        width: 170,
        height: 48,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },
    container_PopUp:{
        position:"fixed",
        height:"50vh",
        backgroundColor:"white",
        border:"solid",
        left:"50%",
        transform: "translate(-50%, 0)",
        display: "flex",
        zIndex: 999999,
        marginTop:"10%"
    },
    p_PopUp:{
        borderBottom: "solid",
        paddingBottom: "3px",
    },

    //------------------PopUp-----------------------------------------------------------------------------------------
    //------------------PopUp-----------------------------------------------------------------------------------------

    //------------------OwnPaper-----------------------------------------------------------------------------------------
    //------------------OwnPaper-----------------------------------------------------------------------------------------

    paper_OwnPaper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    p_OwnPaper:{
        textAlign: "center",
        color: 'white',
    },

    //------------------OwnPaper-----------------------------------------------------------------------------------------
    //------------------OwnPaper-----------------------------------------------------------------------------------------



    //------------------StoreBase-----------------------------------------------------------------------------------------
    //------------------StoreBase-----------------------------------------------------------------------------------------

    StoreBase_button:{
        height: 30,
        width: 70,

    }


    //------------------StoreBase-----------------------------------------------------------------------------------------
    //------------------StoreBase-----------------------------------------------------------------------------------------

}));

export default useStyles;