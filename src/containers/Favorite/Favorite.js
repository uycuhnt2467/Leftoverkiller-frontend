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
        loading: false,
    };

    componentDidMount() {
        // favorite_recipe_id <array>

        const cors = "https://cors-anywhere.herokuapp.com/";
        const url =
            "http://18.222.31.30/leftover_killer/get_recipe_details.php";
        this.props.favorite_recipe_id.map((val) => {
            return this.findRecipeFunction(cors, url, val);
        });
    }

    findRecipeFunction(cors, url, recipeId) {
        var bodyFormData = new FormData();
        bodyFormData.append("recipe_id", recipeId);
        axios.post(`${cors}${url}`, bodyFormData).then((res) => {
            this.setState((prevState) => {
                return {
                    success: res.data.success,
                };
            });
            // const newInfo = {
            //     recipe_id: res.data.recipe_id,
            //     recipe_name: res.data.recipe_name,
            //     img_url: res.data.img_url,
            // }
            console.log(res.data);
            this.setState((prevState) => {
                return {
                    ...prevState,
                    favorite_recipe_info: [
                        ...prevState.favorite_recipe_info,
                        res.data,
                    ],
                    loading: true,
                };
            });
            console.log(res.data);
        });
    }

    render() {
        let favorite_recipe = <Spinner />;
        if (this.state.loading) {
            favorite_recipe = this.state.favorite_recipe_info.map(
                (val, idx) => {
                    return recipe_display(idx, val);
                }
            );
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFavoriteAdded: (recipe_id) =>
            dispatch(actions.addFavorite(recipe_id)),
        onFavoriteRemoved: (recipe_id) =>
            dispatch(actions.removeFavorite(recipe_id)),
    };
};

// export default Recipe;
export default connect(mapStateToProps, mapDispatchToProps)(Favroite);
