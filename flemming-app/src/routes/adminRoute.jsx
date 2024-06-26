import { Navigate } from "react-router-dom"


export default function AdminRouteProtector({ children }) {

    if ( sessionStorage.getItem("isStaff") === "false" ) {
        return <Navigate to="/home"/>
    }

    return children
}