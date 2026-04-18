import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Helmet} from "react-helmet";

import './singleComicsPage.scss';

const SingleComicsPage = () => {
    const { comicsId } = useParams();
    const [ comics, setComics ] = useState(null)
    const { error, loading, getComics, clearError } = useMarvelService()

    useEffect( () => {
        updateComics()
    }, [comicsId])

    const updateComics = () => {
        clearError()
        getComics(comicsId)
            .then(onComicsLoaded)
    }
    
    const onComicsLoaded = (comics) => {
        setComics(comics)
    }

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !comics) ? <View comics={comics}/> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ( { comics } ) => {
    const { title, description, pageCount, thumbnail, languages, price } = comics

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

export default SingleComicsPage