import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
// import { ProgressPlugin } from "webpack";

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
            Pantry
        </NavigationItem>
        {/* {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem>:""}
        {!props.isAuthenticated ? (
            <NavigationItem link="/auth">Authenticate</NavigationItem>
        ) : (
            <NavigationItem link="/logout">Logout</NavigationItem>
        )} */}
        <NavigationItem link="/searchByRecipe" exact>
            Recipe
        </NavigationItem>
        <NavigationItem link="/favorite" exact>
            Favorite
        </NavigationItem>
    </ul>
);

export default navigationItems;
