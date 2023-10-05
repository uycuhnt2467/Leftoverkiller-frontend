import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";

import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
import PantryIngredientDisplay from "./PantryIngredientDisplay/PantryIngredientDisplay";
import classes from "./Pantry.module.css";
import * as actions from "../../store/actions/index";

const Pantry = (props) => {
    const [currentQuery, setCurrentQuery] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        props.onInitializePantry(props.token_id);
    }, [props.token_id]);

    const handleIngredientInputChange = (e) => {
        e.preventDefault();
        setCurrentQuery(e.target.value);
    };

    const redirectHandler = () => {
        setRedirect(true);
    };

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to='/matching' />;
        }
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
    };

    let cur_ingredient = <Spinner />;

    if (!props.loading) {
        if (props.ingredient_list.length === 0) {
            cur_ingredient = (
                <h1 className={classes.noItemTitle}>
                    No ingredient in the pantry, add ingredient{" "}
                    <Link to="/searchbyingredient">here</Link>.
                </h1>
            );
        } else {
            cur_ingredient = props.ingredient_list.map((val) => {
                return PantryIngredientDisplay(val);
            });
        }
    }

    return (
        <Aux>
            <div className={classes.inputDiv}>
                <h1>Ingredient in Pantry</h1>
                <input
                    type="text"
                    onChange={handleIngredientInputChange}
                    name="curSearch"
                    placeholder="Any Ingredient"
                    value={currentQuery}
                />
                <button type="submit" onClick={handleSearchClick}>
                    Search
                </button>
                <button type="submit" onClick={redirectHandler}>
                    Matching
                </button>
                {renderRedirect()}
            </div>
            <div className={classes.flex_container}>{cur_ingredient}</div>
        </Aux>
    );
};

const mapStateToProps = (state) => {
    return {
        ingredient_list: state.ingredientsReducer.ingredients,
        token_id: state.authReducer.token,
        loading: state.ingredientsReducer.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInitializePantry: (token_id) =>
            dispatch(actions.authPantry(token_id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pantry));
