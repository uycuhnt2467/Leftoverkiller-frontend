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
        // loading: false,
    };

    componentDidMount() {
        // favorite_recipe_id <array>
        const url = "http://3.12.253.9:3000/recipe/";

        this.props.onInitializeFavorite(this.props.token_id).then(()=>{
            console.log("lala");
        });
        console.log(this.props.favorite_recipe_id);

        let promiseArray = this.props.favorite_recipe_id.map((val) =>
            axios.get(`${url}${val}`)
        );
        // TODO: reloading problem
        axios.all(promiseArray).then((result) => {
            result.map((val) => {
                return this.setState((prevState) => {
                    return {
                        ...prevState,
                        favorite_recipe_info: [
                            ...prevState.favorite_recipe_info,
                            val.data.result,
                        ],
                    };
                });
            });
        });
        // this.setState({ loading: true });
    }

    render() {
        let favorite_recipe = <Spinner />;
        if (!this.props.loading) {
            favorite_recipe = this.state.favorite_recipe_info.map(
                (val, idx) => {
                    return recipe_display(idx, val);
                }
            );
        } else if (this.state.favorite_recipe_info.length===0) {
            favorite_recipe = <h1>No recipe</h1>
        }
        return (
            <Aux>
                <h1>Favorite Recipe</h1>
                {favorite_recipe}
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
        favorite_recipe_id: state.favoriteReducer.favorite_recipe_id,
        token_id: state.authReducer.token,
        loading: state.favoriteReducer.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFavoriteAdded: (recipe_id) =>
            dispatch(actions.addFavorite(recipe_id)),
        onFavoriteRemoved: (recipe_id) =>
            dispatch(actions.removeFavorite(recipe_id)),
        onInitializeFavorite: (token_id) => {
            dispatch(actions.authFavorite(token_id));
        },
    };
};

// export default Recipe;
export default connect(mapStateToProps, mapDispatchToProps)(Favroite);
