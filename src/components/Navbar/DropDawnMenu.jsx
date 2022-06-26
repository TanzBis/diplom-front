import {useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import styles from './Navbar.module.sass';
import {NavLink} from "react-router-dom";

const DropDownMenu = ({logout, roles}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = e => setAnchorEl(e.currentTarget)
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        logout();
        handleClose();
    };

    return (
        <>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={styles.menu}
            >
                Меню
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose} >
                    <NavLink to='/' className={styles.menuItem}>Главная</NavLink>
                </MenuItem>
                {roles.includes('ADMIN') && <MenuItem onClick={handleClose}><NavLink to='/themes/add-theme' className={styles.menuItem}>Добавить Тему</NavLink></MenuItem>}
                <MenuItem onClick={handleClose}><NavLink to='/themes' className={styles.menuItem}>Темы</NavLink></MenuItem>
                <MenuItem onClick={handleLogout}>
                   <NavLink to='/' className={styles.menuItem}>
                    Выйти
                   </NavLink>
                </MenuItem>
            </Menu>
        </>
    );
};
export default DropDownMenu