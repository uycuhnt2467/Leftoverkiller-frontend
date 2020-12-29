import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import RecipeDisplay from "./RecipeDisplay/RecipeDisplay";

import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./SearchByRecipe.module.css";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import * as actions from "../../store/actions/index";

class SearchIngredient extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        allrecipe: [
            {
                recipe_id: "",
                recipe_name: "",
                img_url: "",
            },
        ],
        currentRecipe: [
            {
                recipe_id: "",
                recipe_name: "",
                img_url: "",
            },
        ],
        currentQuery: "",
        loading: false,
        success: false,
        // err: "",
    };

    componentDidMount() {
        // const cors = "https://cors-anywhere.herokuapp.com/";
        const url = "http://3.12.253.9:3000/recipe";

        // `${cors}${url}`
        axios.get(url).then((res) => {
            // http://18.222.31.30/leftover_killer/get_recipes.php
            // http://localhost/leftoverkiller2/get_recipes.php
            // console.log(res);
            // console.log("here");

            const recipes = res.data.result.recipes;

            this.setState({
                allrecipe: recipes,
                currentRecipe: recipes,
                success: true,
                loading: true,
            });
        });
    }

    handleSearchChange = (e) => {
        e.preventDefault();
        this.setState((prevState) => {
            return {
                ...prevState,
                currentQuery: e.target.value,
            };
        });
        // let newRecipeResult = this.state.allrecipe.filter((rec) => {
        //     return rec.recipe_name
        //         .toLowerCase()
        //         .includes(this.state.currentQuery);
        // });

        // this.setState((prevState) => {
        //     return {
        //         ...prevState,
        //         currentRecipe: newRecipeResult,
        //     };
        // });
    };

    handleSearchClick = (e) => {
        e.preventDefault();

        let newRecipeResult = this.state.allrecipe.filter((rec) => {
            return rec.recipe_name
                .toLowerCase()
                .includes(this.state.currentQuery);
        });

        this.setState((prevState) => {
            return {
                ...prevState,
                currentRecipe: newRecipeResult,
            };
        });
    };

    render() {
        let curRecipe = <Spinner />;
        if (this.state.loading) {
            // if (this.state.success) {
            curRecipe = this.state.currentRecipe.map((val) => {
                return RecipeDisplay(val);
            });
        }

        return (
            <Aux>
                <div>
                    <div className={classes.inputDiv}>
                        <h1>Find Recipe and Add into Favorite</h1>
                        <input
                            type="text"
                            onChange={this.handleSearchChange}
                            name="curSearch"
                            placeholder="Any Recipe"
                            value={this.state.currentQuery}
                        ></input>
                        <button type="submit" onClick={this.handleSearchClick}>
                            Search
                        </button>
                    </div>
                    <div className={classes.flex_container}>{curRecipe}</div>
                </div>
            </Aux>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onIngredientAdded: (ingName) =>
//             dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) =>
//             dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) =>
//             dispatch(actions.setAuthRedirectPath(path)),
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(withErrorHandler(SearchIngredient, axios));

export default SearchIngredient;
