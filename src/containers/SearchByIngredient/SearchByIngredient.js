import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Aux from "../../hoc/Auxx/Auxx";

// import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import axios from "axios";

class SearchIngredient extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        // ingredient_list: [""],
        matching_recipe: [
            // {
            //     recipe_id: "",
            //     recipe_name: "",
            //     img_url: "",
            // },
        ],
        currentQuery: "",
        success: false,
        loading: false,
    };

    componentDidMount() {
        // const cors = "https://cors-anywhere.herokuapp.com/";
        const url =
            "http://3.12.253.9:3000/search";
        axios
            .post(url, { ingredients: this.props.ingredient_list })
            .then((res) => {
                // http://18.222.31.30/leftover_killer/get_recipes.php
                // http://localhost/leftoverkiller2/get_recipes.php
                // console.log(res.data);
                const recipes = res.data.result.recipes;
                // console.log(recipes);
                if (res.data.result.success) {
                    this.setState({
                        success: res.data.result.success,
                        matching_recipe: recipes,
                        loading: true,
                    });
                } else {
                    console.log("no return");
                }

                //
            });
    }

    handleIngredientInputChange = (e) => {
        e.preventDefault();
        this.setState((prevState) => {
            return {
                ...prevState,
                currentQuery: e.target.value,
            };
        });
    };

    handleAddClick = (e) => {
        e.preventDefault();
        this.props.onIngredientAdded(this.state.currentQuery);
        this.setState((prevState) => ({
            currentQuery: "",
        }));
    };

    handleRemoveClick = (e) => {
        e.preventDefault();
        this.props.onIngredientRemoved(e.target.value);
    };

    handleSearchClick = (e) => {
        e.preventDefault();
        const cors = "https://cors-anywhere.herokuapp.com/";
        const url =
            "http://18.222.31.30/leftover_killer/get_matching_recipes.php";
        axios
            .post(`${cors}${url}`, { ingredients: this.props.ingredient_list })
            .then((res) => {
                // http://18.222.31.30/leftover_killer/get_recipes.php
                // http://localhost/leftoverkiller2/get_recipes.php
                // console.log(res.data);
                const recipes = res.data.recipes;
                // console.log(recipes);
                if (res.data.success) {
                    this.setState({
                        success: res.data.success,
                        matching_recipe: recipes,
                    });
                } else {
                    console.log("no return");
                }

                //
            });
    };

    render() {
        let cur_ingredient = this.props.ingredient_list.map((val, idx) => {
            return ingredient_display(idx, val, this.handleRemoveClick);
        });

        let found_recipe = this.state.matching_recipe.map((val, idx) => {
            return recipe_display(idx, val);
        });

        return (
            <Aux>
                <input
                    type="text"
                    onChange={this.handleIngredientInputChange}
                    name="curSearch"
                    placeholder="Any Ingredient"
                    value={this.state.currentQuery}
                ></input>
                <button type="submit" onClick={this.handleAddClick}>
                    Add
                </button>
                <button type="submit" onClick={this.handleSearchClick}>
                    Search
                </button>

                <h1>Current Ingredient</h1>
                {cur_ingredient ? cur_ingredient : null}

                <h1>Found Recipe</h1>

                {found_recipe.length > 0 ? found_recipe : null}
            </Aux>
        );
    }
}

const ingredient_display = (key, ingredient_value, fun) => {
    return (
        <ul key={key}>
            <li>{ingredient_value}</li>
            <li>
                <button type="submit" onClick={fun} value={ingredient_value}>
                    Remove
                </button>
            </li>
        </ul>
    );
};

const recipe_display = (key, recipe) => {
    let link_string = "/recipe/" + recipe.recipe_id;
    return (
        <ul key={key}>
            <li>{recipe.recipe_name}</li>
            <li>
                <Link to={link_string}>recipe link</Link>
            </li>
        </ul>
    );
};

const mapStateToProps = (state) => {
    return {
        ingredient_list: state.ingredientsReducer.ingredients,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) =>
            dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) =>
            dispatch(actions.removeIngredient(ingName)),
    };
};

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(withErrorHandler(BurgerBuilder, axios));
export default connect(mapStateToProps, mapDispatchToProps)(SearchIngredient);
