import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import IngredintDetail from "./IngredientDetail/IngredientDetail";

import classes from "./Ingredient.module.css";

const config = require("../../config/development_config");

const Ingredient = (props) => {
    const [state, setState] = useState({
        success: false,
        ingredient: {},
        error: "",
        loading: true,
        inPantry: false,
    });

    useEffect(() => {
        props.onInitializePantry(props.token_id);
        const { ingredient_id } = props.match.params;
        const inPantryCheck = props.ingredient_list.filter(
            (val) => parseInt(val.ingredient_id) === parseInt(ingredient_id)
        );
        if (inPantryCheck.length === 0) {
            setState((prevState) => ({
                ...prevState,
                inPantry: false,
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                inPantry: true,
            }));
        }

        let url = config.backend_addr + "/ingredient/";
        // TODO: add cache
        axios.get(`${url}${ingredient_id}`).then((res) => {
            if (res.data.result.success) {
                setState((prevState) => ({
                    ...prevState,
                    ingredient: res.data.result,
                    success: res.data.result.success,
                    error: "",
                    loading: false,
                }));
            }
        });
    }, [props.token_id]);

    const handleAddPantry = (e) => {
        e.preventDefault();
        props.onPantryAdded(e.target.value, props.token_id);
        setState((prevState) => ({
            ...prevState,
            inPantry: true,
        }));
    };

    const handleRemovePantry = (e) => {
        e.preventDefault();
        props.onPantryRemoved(e.target.value, props.token_id);
        setState((prevState) => ({
            ...prevState,
            inPantry: false,
        }));
    };

    let curIngredient = <Spinner />;
    if (!state.loading) {
        if (!state.inPantry) {
            curIngredient = (
                <IngredintDetail
                    ingredientInfo={state.ingredient}
                    clickedFunction={handleAddPantry}
                    pantryChecked={state.inPantry}
                />
            );
        } else {
            curIngredient = (
                <IngredintDetail
                    ingredientInfo={state.ingredient}
                    clickedFunction={handleRemovePantry}
                    pantryChecked={state.inPantry}
                />
            );
        }
    }

    return (
        <Aux>
            <div className={classes.flex_container}>{curIngredient}</div>
        </Aux>
    );
};

const mapStateToProps = (state) => {
    return {
        ingredient_list: state.ingredientsReducer.ingredients,
        token_id: state.authReducer.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInitializePantry: (token_id) =>
            dispatch(actions.authPantry(token_id)),
        onPantryAdded: (ingredient_id, token_id) =>
            dispatch(actions.addIngredientCheck(ingredient_id, token_id)),
        onPantryRemoved: (ingredient_id, token_id) =>
            dispatch(actions.removeIngredientCheck(ingredient_id, token_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);
