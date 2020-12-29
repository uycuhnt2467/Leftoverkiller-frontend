import { Link } from "react-router-dom";

import classes from "./IngredientDisplay.module.css"

const ingredientDisplay = (props) => {
    let link_string = "/ingredient/" + props.ingredient_id;
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (
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

export default ingredientDisplay;
