import React  from 'react';
import { Link } from "react-router-dom";

import classes from "./IngredientDetail.module.css";

const ingredientDetailInfo = (props) => {
    const recipe_infos = props.ingredientInfo.recipes.map((recipe) => {
        return recipe_info(recipe.recipe_name, recipe);
    });
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    let buttonIng = "";
    if (props.pantryChecked) {
        buttonIng = (
            <button
                type="submit"
                onClick={props.clickedFunction}
                value={props.ingredientInfo.ingredient_id}
            >
                Remove
            </button>
        );
    } else {
        buttonIng = (
            <button
                className={classes.itemButton}
                type="submit"
                onClick={props.clickedFunction}
                value={props.ingredientInfo.ingredient_id}
            >
                Add
            </button>
        );
    }

    return (
        <div className={classes.item} key={props.ingredientInfo.ingredient_id}>
            <div className={classes.itemName}>
                {props.ingredientInfo.ingredient_name
                    .split(" ")
                    .map(capitalize)
                    .join(" ")}
            </div>
            <div className={classes.imgSize}>
                <img
                    src={props.ingredientInfo.image_url}
                    className={classes.imgRe}
                    alt="lala"
                />
            </div>

            <div className={classes.itemButtonDiv}>{buttonIng}</div>
            <div className={classes.topRecipeTitle}>Top Recipe</div>
            <div className={classes.displayRecipe}>{recipe_infos}</div>
        </div>
    );
};

function recipe_info(key, recipe) {
    let link_string = "/recipe/" + recipe.recipe_id;
    return (
        <div className={classes.displayItem} key={recipe.recipe_id}>
            <div className={classes.displayItemImgSize}>
                <Link to={link_string}>
                    <img
                        className={classes.displayItemImg}
                        src={recipe.img_url}
                        alt="lalala"
                    />
                </Link>
            </div>
            <div>
                <p className={classes.displayItemP}>{recipe.recipe_name}</p>
            </div>
        </div>
    );
}

export default ingredientDetailInfo;
