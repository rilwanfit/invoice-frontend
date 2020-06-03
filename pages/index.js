import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from '../components/LoginForm';

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

export default function Index() {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12} m="auto" className={classes.alignItemsAndJustifyContent}>
                <Paper className={classes.paper}>
                    <LoginForm />
                </Paper>
            </Grid>
        </Grid>
    )
}