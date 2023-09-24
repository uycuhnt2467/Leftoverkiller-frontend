import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
// import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import SearchByReicipe from "./containers/SearchByRecipe/SearchByRecipe";
import SearchByIngredient from "./containers/SearchByIngredient/SearchByIngredient";
import Recipe from "./containers/Recipe/Recipe";
import Ingredient from "./containers/Ingredient/Ingredient";
import Favorite from "./containers/Favorite/Favorite";
import Pantry from "./containers/Pantry/Pantry";
import MatchingRecipe from "./containers/MatchingRecipe/MatchingRecipe";
import Clear from "./containers/Auth/Clear/Clear";
import classes from "./App.module.css";

import * as actions from "./store/actions/index";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignIn();
        this.props.onInitializeFavorite(this.props.token_id);
        this.props.onInitializaPantry(this.props.token_id);
    }
    render() {
        let routes = (
            <Switch>
                <Route
                    path="/searchByIngredient"
                    component={SearchByIngredient}
                />
                <Route path="/" exact component={SearchByReicipe} />
                <Route path="/pantry" component={Pantry} />
                <Route path="/recipe/:recipeId" component={Recipe} />
                <Route
                    path="/ingredient/:ingredient_id"
                    component={Ingredient}
                />
                <Route path="/matching" component={MatchingRecipe} />
                <Route path="/favorite" component={Favorite} />
                <Route path="/clear" component={Clear} />
                <Route path="/auth" component={Auth} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route
                        path="/searchByIngredient"
                        component={SearchByIngredient}
                    />
                    <Route path="/" exact component={SearchByReicipe} />
                    <Route path="/pantry" component={Pantry} />
                    <Route path="/recipe/:recipeId" component={Recipe} />
                    <Route
                        path="/ingredient/:ingredient_id"
                        component={Ingredient}
                    />
                    <Route path="/matching" component={MatchingRecipe} />
                    <Route path="/favorite" component={Favorite} />
                    <Route path="/logout" component={Logout} />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <Layout>
                <h3 className={classes.warning}>
                    This project is only for practicing. The recipe data are
                    collected from {" "}
                    <a href="https://www.allrecipes.com/">all recipe</a>. If the
                    data should be removed, please don't hesitate to email to
                    uycuhnt2467@gmail.com.
                </h3>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        token_id: state.authReducer.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignIn: () => dispatch(actions.authCheckState()),
        onInitializeFavorite: (token_id) => dispatch(actions.authFavorite(token_id)),
        onInitializaPantry: (token_id) => dispatch(actions.authPantry(token_id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
// export default withRouter(App);
