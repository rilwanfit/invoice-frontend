import { useContext } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router'

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuList from '@material-ui/core/List';
import MenuItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import DashboardIcon from '@material-ui/icons/Dashboard';
import CategoryIcon from '@material-ui/icons/Category';
import SettingsIcon from '@material-ui/icons/Settings';
import DraftsIcon from '@material-ui/icons/Drafts';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { ApplicationContext } from './ApplicationContext'

import Header from '../components/Header'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: 40,
        marginTop: 20
    },
}));

function ResponsiveDrawer(props) {
    const router = useRouter()
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const {
        authenticated
    } = useContext(ApplicationContext)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    console.log(authenticated);
    

    const drawer = (
        <div>
            <Hidden xsDown implementation="css">
                <div className={classes.toolbar} />
            </Hidden>
            <Divider />
            <MenuList>
                <Link href="/dashboard" passHref>
                    <MenuItem button selected={router.pathname === "/dashboard"} >
                        <Button variant="text" color="secondary" startIcon={<DashboardIcon />}>Dashboard</Button>
                    </MenuItem>
                </Link>
                <Link href="/invoice" passHref>
                    <MenuItem button selected={((router.pathname === "/invoice") ? true : false)} >
                        <Button variant="text" color="secondary" startIcon={<DraftsIcon />}>Verzonden</Button>
                    </MenuItem>
                </Link>
                <Link href="/outgoing-invoice" passHref>
                    <MenuItem button selected={((router.pathname === "/outgoing-invoice") ? true : false)} >
                        <Button variant="text" component="a" startIcon={<InboxIcon />}> Ontvangen facturen </Button>
                    </MenuItem>
                </Link>
                <Link href="/product" passHref>
                    <MenuItem button selected={((router.pathname === "/product") ? true : false)} >
                        <Button variant="text" component="a" startIcon={<DashboardIcon />}>Product</Button>
                    </MenuItem>
                </Link>
                <Link href="/category" passHref>
                    <MenuItem button selected={((router.pathname === "/category") ? true : false)} >
                        <Button variant="text" component="a" startIcon={<CategoryIcon />}>Category </Button>
                    </MenuItem>
                </Link>
                <Link href="/settings" passHref>
                    <MenuItem button selected={((router.pathname === "/settings") ? true : false)} >
                        <Button variant="text" component="a" startIcon={<SettingsIcon />}> Instellingen</Button>
                    </MenuItem>
                </Link>
            </MenuList >
            <Divider />
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <Header mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            {authenticated &&
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
            }
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;