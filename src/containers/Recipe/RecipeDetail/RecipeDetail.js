import { Link } from "react-router-dom";

import classes from "./RecipeDetail.module.css";

const recipeDetailInfo = (props) => {
    const ingredientInfos = props.recipeInfo.ingredients.map((ingredient) => {
        return ingredientInfo(ingredient);
    });
    
    let buttonIng = "";
    if (props.favoriteChecked) {
        buttonIng = (
            <button
                type="submit"
                onClick={props.clickedFunction}
                value={props.recipeInfo.recipe_id}
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
                value={props.recipeInfo.recipe_id}
            >
                Add
            </button>
        );
    }

    return (
        <div className={classes.item} key={props.recipeInfo.recipe_id}>
            <div className={classes.itemName}>
                {props.recipeInfo.recipe_name}
            </div>
            <div className={classes.imgSize}>
                <img
                    src={props.recipeInfo.image_url}
                    className={classes.imgRe}
                    alt="lala"
                />
            </div>

            <div className={classes.itemButtonDiv}>{buttonIng}</div>
            <div className={classes.title}>Used Ingredient</div>
            <div className={classes.displayRecipe}>{ingredientInfos}</div>
            <div className={classes.title}>Instrunction</div>
            <div className={classes.instruction}>
                {props.recipeInfo.instruction}
            </div>
        </div>
    );
};

function ingredientInfo(ingredient) {
    let link_string = "/recipe/" + ingredient.ingredient_id;
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (
        <div className={classes.displayItem} key={ingredient.ingredient_id}>
            <div className={classes.displayItemImgSize}>
                <Link to={link_string}>
                    <img
                        className={classes.displayItemImg}
                        src={ingredient.image_url}
                        alt="lalala"
                    />
                </Link>
            </div>
            <div>
                <p className={classes.displayItemP}>
                    {ingredient.ingredient_name.split(" ").map(capitalize).join(" ")}
                </p>
            </div>
        </div>
    );
}

export default recipeDetailInfo;
