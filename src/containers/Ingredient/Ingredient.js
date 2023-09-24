import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import IngredintDetail from "./IngredientDetail/IngredientDetail";

import classes from "./Ingredient.module.css";

const config = require("../../config/development_config")

class Ingredient extends Component {
    state = {
        success: false,
        ingredient: {},
        // ingredient_id: "",
        // ingredient_name: "",
        // image_url: "",
        // recipe: [],
        error: "",
        loading: true,
        inPantry: false,
    };

    componentDidMount() {
        this.props.onInitializePantry(this.props.token_id);
        const { ingredient_id } = this.props.match.params;
        // console.log(ingredient_id);
        const inPantryCheck = this.props.ingredient_list.filter(
            (val) => parseInt(val.ingredient_id) === parseInt(ingredient_id)
        );
        if (inPantryCheck.length === 0) {
            this.setState({ inPantry: false });
        } else {
            this.setState({ inPantry: true });
        }

        let url = config.backend_addr + "/ingredient/";

        axios.get(`${url}${ingredient_id}`).then((res) => {
            if (res.data.result.success) {
                console.log(res.data.result)
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        ingredient: res.data.result,
                        success: res.data.result.success,
                        error: "",
                        loading: false,
                    };
                });
            }
        });
    }

    handleAddPantry = (e) => {
        // console.log(e.target.value, this.props.token_id);
        e.preventDefault();
        this.props.onPantryAdded(e.target.value, this.props.token_id);
        this.setState({ inPantry: true });
    };

    handleRemovePantry = (e) => {
        e.preventDefault();
        this.props.onPantryRemoved(e.target.value, this.props.token_id);
        this.setState({ inPantry: false });
    };

    render() {
        let curIngredient = <Spinner />;
        if (!this.state.loading) {
            if (!this.state.inPantry) {
                curIngredient = (
                    <IngredintDetail
                        ingredientInfo={this.state.ingredient}
                        clickedFunction={this.handleAddPantry}
                        pantryChecked={this.state.inPantry}
                    />
                );
            } else {
                curIngredient = (
                    <IngredintDetail
                        ingredientInfo={this.state.ingredient}
                        clickedFunction={this.handleRemovePantry}
                        pantryChecked={this.state.inPantry}
                    />
                );
            }
        }
        return (
            <Aux>
                <div className={classes.flex_container}>{curIngredient}</div>
            </Aux>
        );
    }
}

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
// export default Recipe;
