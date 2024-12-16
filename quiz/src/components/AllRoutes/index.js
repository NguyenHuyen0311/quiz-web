import { useRoutes } from "react-router-dom";
import { routes } from "../../routes";

function AllRoutes() {
    const elements = useRoutes(routes);

    return (
        <>
            {elements}
        </>
    );
}

export default AllRoutes;