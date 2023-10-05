import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
import ingredientDisplay from "./IngredientDisplay/IngredientDisplay";
import classes from "./SearchByIngredient.module.css";

const config = require("../../config/development_config");

const SearchIngredient = () => {
    const [allIngredients, setAllIngredients] = useState([]);
    const [currentIngredients, setCurrentIngredients] = useState([]);
    // {
    //     ingredient_id: "",
    //     ingredient_name: "",
    //     img_url: "",
    // },
    const [currentQuery, setCurrentQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = config.backend_addr + "/ingredient";

        axios.get(url).then((res) => {
            if (res.data.result.success) {
                setAllIngredients(res.data.result.ingredients);
                setCurrentIngredients(res.data.result.ingredients);
                setLoading(false);
            } else {
                setAllIngredients([]);
                setCurrentIngredients([]);
                setLoading(false);
            }
        });
    }, []);

    const handleIngredientInputChange = (e) => {
        e.preventDefault();
        setCurrentQuery(e.target.value);
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
        let newIngredientsResult = allIngredients.filter((ing) => {
            return ing.ingredient_name.toLowerCase().includes(currentQuery);
        });

        setCurrentIngredients(newIngredientsResult);
    };

    let curIngredient = <Spinner />;
    if (!loading) {
        curIngredient = currentIngredients.map((val) => {
            return ingredientDisplay(val);
        });
    }

    return (
        <Aux>
            <div className={classes.inputDiv}>
                <h1>Find ingredients and add them into pantry</h1>
                <input
                    type="text"
                    onChange={handleIngredientInputChange}
                    name="curSearch"
                    placeholder="Any Ingredient"
                    value={currentQuery}
                ></input>
                <button type="submit" onClick={handleSearchClick}>
                    Search
                </button>
            </div>
            <div className={classes.flex_container}>{curIngredient}</div>
        </Aux>
    );
};

const mapStateToProps = (state) => {
    return {
        ingredient_list: state.ingredientsReducer.ingredients,
    };
};

export default connect(mapStateToProps, null)(SearchIngredient);
