import React  from 'react';
import { Link } from "react-router-dom";
import classes from "./PantryIngredientDisplay.module.css";

const pantryIngredientDisplay = (props) => {
    let link_string = "/ingredient/" + props.ingredient_id;
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (
        // <ul key={props.ingredient_id}>
        //     <li>{props.ingredient_id}</li>
        //     <li>
        //         {props.ingredient_name
        //             .split(" ")
        //             .map(capitalize)
        //             .join(" ")}
        //     </li>
        //     <li>
        //         <Link to={link_string}>ingredient link</Link>
        //     </li>
        // </ul>
        <div className={classes.item} key={props.ingredient_id}>
            <span className={classes.imgSize}>
                <Link to={link_string}>
                    <img
                        className={classes.imgRe}
                        src={props.image_url}
                        alt="lalala"
                    />
                </Link>
            </span>
            <div>
                <p className={classes.p}>
                    {props.ingredient_name.split(" ").map(capitalize).join(" ")}
                </p>
            </div>
        </div>
    );
};

export default pantryIngredientDisplay;
