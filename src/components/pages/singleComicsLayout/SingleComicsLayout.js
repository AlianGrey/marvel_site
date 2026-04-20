import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

import './singleComicsLayout.scss';

const SingleComicsLayout = ( { data } ) => {
    const { title, description, pageCount, thumbnail, languages, price } = data

    return (
        <div className="single-comic">
            <Helmet>
                <title>{title}</title>
                <meta name={description} content={`${title} comics book `} />
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {languages}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicsLayout