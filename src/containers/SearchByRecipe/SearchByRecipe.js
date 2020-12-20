import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";

import Spinner from "../../components/UI/Spinner/Spinner";
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
    };

    componentDidMount() {
        const cors = "https://cors-anywhere.herokuapp.com/";
        const url = "http://18.222.31.30/leftover_killer/get_recipes.php";
        axios.get(`${cors}${url}`).then((res) => {
            // http://18.222.31.30/leftover_killer/get_recipes.php
            // http://localhost/leftoverkiller2/get_recipes.php
            const recipes = res.data.recipes;
            console.log(recipes);
            this.setState({
                allrecipe: recipes,
                currentRecipe: recipes,
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
            curRecipe = this.state.currentRecipe.map((val, idx) => {
                return recipe_info(idx, val);
            });
        }

        return (
            <Aux>
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
                {curRecipe}
            </Aux>
        );
    }
}
// define components
function recipe_info(key, recipe_data) {
    let link_string = "/recipe/" + recipe_data.recipe_id;
    return (
        <ul key={key}>
            <li>{recipe_data.recipe_id}</li>
            <li>{recipe_data.recipe_name}</li>
            <li>
                <Link to={link_string}>recipe link</Link>
            </li>
        </ul>
    );
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
