import { useContext } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router'

import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuList from '@material-ui/core/List';
import MenuItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import DashboardIcon from '@material-ui/icons/Dashboard';
import CategoryIcon from '@material-ui/icons/Category';
import SettingsIcon from '@material-ui/icons/Settings';
import DraftsIcon from '@material-ui/icons/Drafts';
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
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function ResponsiveDrawer(props) {
    const router = useRouter()
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [openSettingsMenu, setOpenSettingsMenu] = React.useState(true);
    const [openInvoiceMenu, setOpenInvoiceMenu] = React.useState(true);

    const handleSettingsMenuClick = () => {
        setOpenSettingsMenu(!openSettingsMenu);
    };

    const handleInvoiceMenuClick = () => {
        setOpenInvoiceMenu(!openInvoiceMenu);
    };

    const {
        authenticated
    } = useContext(ApplicationContext)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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
                    <MenuItem button onClick={handleInvoiceMenuClick} selected={((router.pathname === "/invoice") ? true : false)} >
                        <Button variant="text" color="secondary" startIcon={<DraftsIcon />}>Verzonden</Button>
                        {openInvoiceMenu ? <ExpandLess /> : <ExpandMore />}
                    </MenuItem>
                </Link>
                <Collapse in={openInvoiceMenu} timeout="auto" unmountOnExit>
                    <MenuList className={classes.nested}>
                        <Link href="/create-invoice" passHref>
                            <MenuItem selected={((router.pathname === "/create-invoice") ? true : false)} >
                                <Button variant="text" component="a" startIcon={<SettingsIcon />}> Create Invoice</Button>
                            </MenuItem>
                        </Link>
                    </MenuList>
                </Collapse>
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
                    <MenuItem onClick={handleSettingsMenuClick} button selected={((router.pathname === "/settings") ? true : false)} >
                        <Button variant="text" component="a" startIcon={<SettingsIcon />}> Instellingen</Button>
                        {openSettingsMenu ? <ExpandLess /> : <ExpandMore />}
                    </MenuItem>
                </Link>
                <Collapse in={openSettingsMenu} timeout="auto" unmountOnExit>
                    <MenuList className={classes.nested}>
                        <Link href="/company-info" passHref>
                            <MenuItem selected={((router.pathname === "/company-info") ? true : false)} >
                                <Button variant="text" component="a" startIcon={<SettingsIcon />}> Company Info</Button>
                            </MenuItem>
                        </Link>
                        <Link href="/vat-tariffs" passHref>
                            <MenuItem selected={((router.pathname === "/vat-tariffs") ? true : false)} >
                                <Button variant="text" component="a" startIcon={<SettingsIcon />}> Vat tariffs</Button>
                            </MenuItem>
                        </Link>
                    </MenuList>
                </Collapse>
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