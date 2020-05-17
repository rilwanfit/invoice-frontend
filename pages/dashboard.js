import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Dashboard() {
    const classes = useStyles();

    return (
        <Grid container sm={12} spacing={3}>
            <Grid item sm={6}>
                <Paper className={classes.paper}>
                    Right panel
        </Paper>
            </Grid>
            <Grid item sm={6}>
                <Paper className={classes.paper}>
                    Dashboard
        </Paper>
            </Grid>
        </Grid>
    );
}