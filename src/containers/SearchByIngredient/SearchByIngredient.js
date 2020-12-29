import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import ingredientDisplay from "./IngredientDisplay/IngredientDisplay";
import classes from "./SearchByIngredient.module.css";

class SearchIngredient extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        allIngredients: [
            // {
            //     ingredient_id: "",
            //     ingredient_name: "",
            //     img_url: "",
            // },
        ],
        currentIngredients: [
            // {
            //     ingredient_id: "",
            //     ingredient_name: "",
            //     img_url: "",
            // },
        ],
        currentQuery: "",
        loading: true,
        success: false,
        // err: "",
    };

    componentDidMount() {
        // const cors = "https://cors-anywhere.herokuapp.com/";
        const url = "http://3.12.253.9:3000/ingredient";
        axios.get(url).then((res) => {
            if (res.data.result.success) {
                this.setState({
                    success: true,
                    allIngredients: res.data.result.ingredients,
                    currentIngredients: res.data.result.ingredients,
                    loading: false,
                });
            } else {
                this.setState({
                    success: false,
                    allIngredients: [],
                    currentIngredients: [],
                    loading: false,
                });
                console.log("no return");
            }
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

    handleSearchClick = (e) => {
        e.preventDefault();
        let newIngredientsResult = this.state.allIngredients.filter((ing) => {
            return ing.ingredient_name
                .toLowerCase()
                .includes(this.state.currentQuery);
        });

        this.setState((prevState) => {
            return {
                ...prevState,
                currentIngredients: newIngredientsResult,
            };
        });
    };

    render() {
        let curIngredient = <Spinner />;
        if (!this.state.loading) {
            curIngredient = this.state.currentIngredients.map((val) => {
                return ingredientDisplay(val);
            });
        }

        return (
            <Aux>
                <div className={classes.inputDiv}>
                    <h1>Find Ingredient and Add into Pantry</h1>
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
                </div>
                <div className={classes.flex_container}>{curIngredient}</div>
            </Aux>
        );
    }
}
// define components

const mapStateToProps = (state) => {
    return {
        ingredient_list: state.ingredientsReducer.ingredients,
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onIngredientAdded: (ingName) =>
//             dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) =>
//             dispatch(actions.removeIngredient(ingName)),
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(withErrorHandler(BurgerBuilder, axios));
export default connect(mapStateToProps, null)(SearchIngredient);
