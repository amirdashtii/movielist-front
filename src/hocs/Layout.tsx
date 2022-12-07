import React from "react";
import Navbar from '../components/Navbar';

const Layout = (props: any) => (
    <div>
        <Navbar />
        {props.children}
    </div>
);

export default Layout;