import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
// import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
// import Logout from "./containers/Auth/Logout/Logout";
import SearchByReicipe from "./containers/SearchByRecipe/SearchByRecipe";
import SearchByIngredient from "./containers/SearchByIngredient/SearchByIngredient";
import Recipe from "./containers/Recipe/Recipe";
import Favorite from "./containers/Favorite/Favorite";
import classes from "./App.module.css";

import * as actions from "./store/actions/index";

class App extends Component {
    componentDidMount() {
        // this.props.onTryAutoSignup();
    }
    render() {
        // let routes = (
        //     <Switch>
        //         <Route path="/" component={SearchReicipe} />
        //         <Route path="/auth" component={Auth} />
        //         <Route path="/" exact component={BurgerBuilder} />
        //         <Redirect to="/" />
        //     </Switch>
        // );

        // if (this.props.isAuthenticated) {
        //     routes = (
        //         <Switch>
        //             <Route path="/test" component={SearchReicipe} />
        //             <Route path="/checkout" component={Checkout} />
        //             <Route path="/orders" component={Orders} />
        //             <Route path="/logout" component={Logout} />
        //             <Route path="/" exact component={BurgerBuilder} />
        //             <Redirect to="/" />
        //         </Switch>
        //     );
        // }
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={SearchByIngredient} />
                        <Route
                            path="/searchByRecipe"
                            component={SearchByReicipe}
                        />
                        <Route path="/recipe/:recipeId" component={Recipe} />
                        <Route path="/favorite" component={Favorite} />
                        <Redirect to="/" />
                    </Switch>
                </Layout>
                <h5 className={classes.warning}>
                    This project is only for practicing. The recipe data are
                    collected from{" "}
                    <a href="https://www.allrecipes.com/">all recipe</a>. If the
                    data should be removed, please don't hesitate to email to
                    uycuhnt2467@gmail.com.
                </h5>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         isAuthenticated: state.auth.token !== null,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onTryAutoSignup: () => dispatch(actions.authCheckState()),
//     };
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
export default withRouter(App);
