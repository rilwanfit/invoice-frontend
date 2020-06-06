import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';

import RegisterForm from '../components/Form/RegisterForm';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '50%',
        marginTop: 20,
        padding: 30
    },
    alignItemsAndJustifyContent: {
        width: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default function Register() {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={12} m="auto" className={classes.alignItemsAndJustifyContent}>
            <Paper className={classes.paper}>
                <RegisterForm />
            </Paper>
        </Grid>
        </Grid>
    );
}