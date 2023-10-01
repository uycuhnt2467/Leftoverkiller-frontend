import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
import FavoriteRecipeDisplay from "./FavoriteRecipeDisplay/FavoriteRecipeDisplay";
import classes from "./Favorite.module.css";
import * as actions from "../../store/actions/index";

class Favroite extends Component {
    state = {
        success: false,
        filter_favorite_recipe_info: [
            // {
            //     recipe_id: "",
            //     recipe_name: "",
            //     img_url: "",
            // }
        ],
        all_favorite_recipe_info : [],
        currentQuery: "",
        error: "",
    };

    componentDidMount() {
        this.props.onInitializeFavorite(this.props.token_id);
        this.setState((prevState) => {
            return {
                ...prevState,
                all_favorite_recipe_info: this.props.favorite_recipe,
                filter_favorite_recipe_info: this.props.favorite_recipe,
            }
        })

    }

    componentDidUpdate(prevProps) {
        if (this.props.favorite_recipe !== prevProps.favorite_recipe) {
            this.setState({
                filter_favorite_recipe_info: this.props.favorite_recipe,
            });
        }
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

        let newRecipeResult = this.state.all_favorite_recipe_info.filter((rec) => {
            return rec.recipe_name
                .toLowerCase()
                .includes(this.state.currentQuery);
        });

        this.setState((prevState) => {
            return {
                ...prevState,
                filter_favorite_recipe_info: newRecipeResult,
            };
        });
    };

    render() {
        let filter_favorite_recipe = <Spinner />;
        if (!this.props.loading) {
            if (this.props.favorite_recipe.length === 0) {
                filter_favorite_recipe = (
                    <h1 className={classes.noItemTitle}>
                        No recipe in the favorite list, add recipe{" "}
                        <Link to="/">here</Link>.
                    </h1>
                );
            } else {
                filter_favorite_recipe = this.state.filter_favorite_recipe_info.map((val) => {
                    return FavoriteRecipeDisplay(val);
                });
            }
        }
        return (
            <Aux>
                <div className={classes.inputDiv}>
                    <h1 className={classes.title}>Favorite Recipe</h1>
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
                <div className={classes.flex_container}>
                    {filter_favorite_recipe}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        favorite_recipe: state.favoriteReducer.favorite_recipe,
        token_id: state.authReducer.token,
        loading: state.favoriteReducer.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInitializeFavorite: (token_id) => {
            dispatch(actions.authFavorite(token_id));
        },
    };
};

// export default Recipe;
export default connect(mapStateToProps, mapDispatchToProps)(Favroite);
