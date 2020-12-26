import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Auxx/Auxx";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class Favroite extends Component {
    state = {
        success: false,
        favorite_recipe_info: [
            // {
            //     recipe_id: "",
            //     recipe_name: "",
            //     img_url: "",
            // }
        ],
        error: "",
    };

    componentDidMount() {
        console.log(this.props.token_id);
        this.props.onInitializeFavorite(this.props.token_id);
        console.log("initilaize favorite");
        console.log(this.props.favorite_recipe);
    }

    render() {
        let favorite_recipe_info = <Spinner />;
        if (!this.props.loading) {
            if (this.props.favorite_recipe.length === 0) {
                favorite_recipe_info = <h1>No recipe</h1>;
            } else {
                favorite_recipe_info = this.props.favorite_recipe.map(
                    (val, idx) => {
                        return recipe_display(idx, val);
                    }
                );
            }
        }
        return (
            <Aux>
                <h1>Favorite Recipe</h1>
                {favorite_recipe_info}
            </Aux>
        );
    }
}

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
