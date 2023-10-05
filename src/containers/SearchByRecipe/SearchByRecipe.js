import React, { useState, useEffect } from "react";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import RecipeDisplay from "./RecipeDisplay/RecipeDisplay";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./SearchByRecipe.module.css";
const config = require("../../config/development_config");

const SearchByRecipe = () => {
    const [allrecipe, setAllRecipe] = useState([]);
    const [currentRecipe, setCurrentRecipe] = useState([]);
    const [currentQuery, setCurrentQuery] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const url = config.backend_addr + "/recipe";

        axios.get(url).then((res) => {
            const recipes = res.data.result.recipes;
            setAllRecipe(recipes);
            setCurrentRecipe(recipes);
            setLoading(true);
        });
    }, []);

    const handleSearchChange = (e) => {
        e.preventDefault();
        setCurrentQuery(e.target.value);
    };

    const handleSearchClick = (e) => {
        e.preventDefault();

        let newRecipeResult = allrecipe.filter((rec) => {
            return rec.recipe_name.toLowerCase().includes(currentQuery);
        });

        setCurrentRecipe(newRecipeResult);
    };

    let curRecipe = <Spinner />;

    if (loading) {
        curRecipe = currentRecipe.map((val) => {
            return RecipeDisplay(val);
        });
    }

    return (
        <Aux>
            <div>
                <div className={classes.inputDiv}>
                    <h1>Find recipes and add them into favorite recipes</h1>
                    <input
                        type="text"
                        onChange={handleSearchChange}
                        name="curSearch"
                        placeholder="Any Recipe"
                        value={currentQuery}
                    ></input>
                    <button type="submit" onClick={handleSearchClick}>
                        Search
                    </button>
                </div>
                <div className={classes.flex_container}>{curRecipe}</div>
            </div>
        </Aux>
    );
};

export default SearchByRecipe;