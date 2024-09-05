import React from "react";

export class User {
    constructor(props) {
        this.id = props._id;
        this.firstname = props.firstname;
        this.lastname = props.lastname;
        this.email = props.email;
        this.password = props.password;
        this.cart = []; 
        // this.cart = props.cart.map((item) => ({
        //     id: item.id,
        //     title: item.title,
        //     brand: item.brand,
        //     price: item.price,
        //     quantity: item.quantity,
        //   }));
    }
}

const UserContext = React.createContext({ user: null, setUser: () => {}, cart: [] });
export const UserProvider = UserContext.Provider;
export default UserContext;