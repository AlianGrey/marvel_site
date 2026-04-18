import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import {Helmet} from "react-helmet";

const ComicsPage = () => {
    return(
        <>
            <Helmet>
                <title>Comics page</title>
                <meta name="description" content="Comics page" />
            </Helmet>
            <AppBanner />
            <ComicsList />
        </>
    )
}

export default ComicsPage