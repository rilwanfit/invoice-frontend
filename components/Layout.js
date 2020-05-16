import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Layout = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
        {props.children}
      <Footer />
    </div>
  )
}

export default Layout;