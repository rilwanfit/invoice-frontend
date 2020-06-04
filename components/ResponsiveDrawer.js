import { useContext } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router'

import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import CategoryIcon from '@material-ui/icons/Category';
import SettingsIcon from '@material-ui/icons/Settings';
import DraftsIcon from '@material-ui/icons/Drafts';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ViewListIcon from '@material-ui/icons/ViewList';
import ClassIcon from '@material-ui/icons/Class';
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

    const [openSettingsMenu, setOpenSettingsMenu] = React.useState(false);
    const [openProductsMenu, setOpenProductssMenu] = React.useState(false);
    const [openInvoiceMenu, setOpenInvoiceMenu] = React.useState(false);
    const [openCategoryMenu, setOpenCategoryMenu] = React.useState(false);
    const [openCustomerMenu, setOpenCustomerMenu] = React.useState(false);

    const handleSettingsMenuClick = () => {
        setOpenSettingsMenu(!openSettingsMenu);
    };

    const handleInvoiceMenuClick = () => {
        setOpenInvoiceMenu(!openInvoiceMenu);
    };

    const handleProductsMenuClick = () => {
        setOpenProductssMenu(!openProductsMenu);
    };

    const handleCategoryMenuClick = () => {
        setOpenCategoryMenu(!openCategoryMenu);
    };

    const handleCustomerMenuClick = () => {
        setOpenCustomerMenu(!openCustomerMenu);
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
            <List>
                <Link href="/dashboard" passHref>
                    <ListItem button selected={router.pathname === "/dashboard"}>
                        <ListItemIcon>
                            <DashboardIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" className={classes} />
                    </ListItem>
                </Link>

                <ListItem button onClick={handleInvoiceMenuClick}>
                    <ListItemIcon>
                        <DraftsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Verzonden" />
                    {openInvoiceMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openInvoiceMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link href="/create-invoice" passHref>
                            <ListItem button selected={router.pathname === "/create-invoice"} className={classes.nested}>
                                <ListItemIcon>
                                    <InboxIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Create Invoice" />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>

                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Ontvangen facturen" />
                    {openInvoiceMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openInvoiceMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link href="/outgoing-invoice" passHref>
                            <ListItem button selected={router.pathname === "/outgoing-invoice"} className={classes.nested}>
                                <ListItemIcon>
                                    <InboxIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Create Invoice" />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>

                <ListItem button onClick={handleCustomerMenuClick}>
                    <ListItemIcon>
                        <PeopleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Customer" />
                    {openCustomerMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openCustomerMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link href="/customer-overview" passHref>
                            <ListItem button selected={router.pathname === "/customer-overview"} className={classes.nested}>
                                <ListItemIcon>
                                    <ViewListIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Customeroverzicht" />
                            </ListItem>
                        </Link>
                        <Link href="/customer-overview" passHref>
                            <ListItem button selected={router.pathname === "/customer-overview"} className={classes.nested}>
                                <ListItemIcon>
                                    <PersonAddIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Add customer" />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>

                <ListItem button onClick={handleProductsMenuClick}>
                    <ListItemIcon>
                        <ClassIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Producten" />
                    {openProductsMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openProductsMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link href="/product-overview" passHref>
                            <ListItem button selected={router.pathname === "/product-overview"} className={classes.nested}>
                                <ListItemIcon>
                                    <ViewListIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Productoverzicht" />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>

                <ListItem button onClick={handleCategoryMenuClick}>
                    <ListItemIcon>
                        <CategoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Categorie" />
                    {openCategoryMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openCategoryMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link href="/category-overview" passHref>
                            <ListItem button selected={router.pathname === "/category-overview"} className={classes.nested}>
                                <ListItemIcon>
                                    <ViewListIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Categorieoverzicht" />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>

                <ListItem button onClick={handleSettingsMenuClick}>
                    <ListItemIcon>
                        <SettingsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Instellingen" />
                    {openSettingsMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSettingsMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link href="/company-info" passHref>
                            <ListItem button selected={router.pathname === "/company-info"} className={classes.nested}>
                                <ListItemIcon>
                                    <CategoryIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Company Info" />
                            </ListItem>
                        </Link>
                        <Link href="/vat-tariffs" passHref>
                            <ListItem button selected={router.pathname === "/company-info"} className={classes.nested}>
                                <ListItemIcon>
                                    <CategoryIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Vat tariffs" />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>
            </List>
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