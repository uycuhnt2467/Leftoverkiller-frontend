import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter, Redirect} from "react-router-dom";

import Aux from "../../hoc/Auxx/Auxx";

import Spinner from "../../components/UI/Spinner/Spinner";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import PantryIngredientDisplay from "./PantryIngredientDisplay/PantryIngredientDisplay";
import classes from "./Pantry.module.css";
import * as actions from "../../store/actions/index";

class Pantry extends Component {
    state = {
        redirect:false,
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

    redirectHandler = () => {
        this.setState({ redirect: true })
        this.renderRedirect();
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/matching' />
        }
    }
  

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
                cur_ingredient = (
                    <h1 className={classes.noItemTitle}>
                        No ingredient in the pantry, add ingredient{" "}
                        <Link to="/searchbyingredient">here</Link>.
                    </h1>
                );
            } else {
                cur_ingredient = this.props.ingredient_list.map((val) => {
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
                        onChange={this.handleIngredientInputChange}
                        name="curSearch"
                        placeholder="Any Ingredient"
                        value={this.state.currentQuery}
                    ></input>
                    <button type="submit" onClick={this.handleSearchClick}>
                        Search
                    </button>
                    <button type="submit" onClick={this.redirectHandler}>
                        Matching
                    </button>
                    {this.renderRedirect()}
                </div>

                <div className={classes.flex_container}>{cur_ingredient}</div>
            </Aux>
        );
    }
}

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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pantry));
