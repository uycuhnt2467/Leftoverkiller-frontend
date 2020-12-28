import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Aux from "../../hoc/Auxx/Auxx";

// import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import axios from "axios";

class Pantry extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        // ingredient_list: [""],
        ingredients: [
            // {
            //     recipe_id: "",
            //     recipe_name: "",
            //     img_url: "",
            // },
        ],
        currentQuery: "",
        success: false,
    };

    componentDidMount() {
        // const cors = "https://cors-anywhere.herokuapp.com/";
        // console.log(this.props.token_id);
        this.props.onInitializePantry(this.props.token_id);
        // console.log("initilaize favorite");
        // console.log(this.props.ingredient_list);
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

    // handleAddClick = (e) => {
    //     e.preventDefault();
    //     this.props.onIngredientAdded(this.state.currentQuery);
    //     this.setState((prevState) => ({
    //         currentQuery: "",
    //     }));
    // };

    // handleRemoveClick = (e) => {
    //     e.preventDefault();
    //     this.props.onIngredientRemoved(e.target.value);
    // };

    // handleSearchClick = (e) => {
    //     e.preventDefault();
    //     const cors = "https://cors-anywhere.herokuapp.com/";
    //     const url =
    //         "http://18.222.31.30/leftover_killer/get_matching_recipes.php";
    //     axios
    //         .post(`${cors}${url}`, { ingredients: this.props.ingredient_list })
    //         .then((res) => {
    //             // http://18.222.31.30/leftover_killer/get_recipes.php
    //             // http://localhost/leftoverkiller2/get_recipes.php
    //             // console.log(res.data);
    //             const recipes = res.data.recipes;
    //             // console.log(recipes);
    //             if (res.data.success) {
    //                 this.setState({
    //                     success: res.data.success,
    //                     matching_recipe: recipes,
    //                 });
    //             } else {
    //                 console.log("no return");
    //             }

    //             //
    //         });
    // };

    render() {
        let cur_ingredient = <Spinner />;

        if (!this.props.loading) {
            if (this.props.ingredient_list.length === 0) {
                cur_ingredient = <h1>No ingredient</h1>;
            } else {
                cur_ingredient = this.props.ingredient_list.map((val) => {
                    return ingredient_display(val.ingredient_id, val);
                });
            }
        }

        return (
            <Aux>
                <h1>Current Ingredient</h1>
                {cur_ingredient}
            </Aux>
        );
    }
}

const ingredient_display = (key, ingredient) => {
    let link_string = "/ingredient/" + ingredient.ingredient_id;
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (
        <ul key={key}>
            <li>{ingredient.ingredient_id}</li>
            <li>
                {ingredient.ingredient_name
                    .split(" ")
                    .map(capitalize)
                    .join(" ")}
            </li>
            <li>
                <Link to={link_string}>ingredient link</Link>
            </li>
        </ul>
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
        onIngredientAdded: (ingName) =>
            dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) =>
            dispatch(actions.removeIngredient(ingName)),
        onInitializePantry: (token_id) =>
            dispatch(actions.authPantry(token_id)),
    };
};

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(withErrorHandler(BurgerBuilder, axios));
export default connect(mapStateToProps, mapDispatchToProps)(Pantry);
