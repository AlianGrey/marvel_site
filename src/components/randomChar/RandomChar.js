import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import defaultUser from '../../resources/img/default_user.jpg'

const RandomChar = () => {
    const [ char, setChar ] = useState({})
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(false)

    useEffect( () => {
        updateChar()

        const timerId = setInterval(updateChar, 10000);
        return () => clearInterval(timerId)
    }, [])

    const marvelService = new MarvelService()

    const onCharLoaded = (char) => {
        setChar(char)
        setLoading(false)
        setError(false)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const onCharLoading = () => {
        setLoading(true)
    }

    const updateChar = () => {
        const id = Math.floor( Math.random() * 21)
        onCharLoading()
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? <View char= {char} /> : null

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}                
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button 
                    className="button button__main"
                    onClick={updateChar}
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ( { char } ) => {
    const { name, description, thumbnail, homepage, wiki } = char
    let clazz = ''
    
    const checkDescription = (description) => {
        let res = description ? description : 'We have no information about this character';
        if ( res.length > 150 ) { res = res.slice(0, 150) + '...' }
        return res
    }

    const checkThumbnail = (thumbnail) => {
        if (thumbnail) { 
            clazz = 'randomchar__img'
            return thumbnail 
        }
        clazz += 'randomchar__img notfound'
        return  defaultUser
    }

    return (
        <div className="randomchar__block">
            <img src={ checkThumbnail(thumbnail) } alt="Random character" className={clazz}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr"> {checkDescription(description) } </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main" target="_blank" rel="noreferrer">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target="_blank" rel="noreferrer">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}
 
export default RandomChar;