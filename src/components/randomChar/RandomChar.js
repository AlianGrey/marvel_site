import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent'; 

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import defaultUser from '../../resources/img/default_user.jpg'

const RandomChar = () => {
    const [ char, setChar ] = useState({})
    const { getCharacter, clearError, process, setProcess } = useMarvelService()
  
    useEffect( () => {
        updateChar()

       //const timerId = setInterval(updateChar, 10000);
       //return () => clearInterval(timerId)
        //eslint-disable-next-line
    }, [])

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => { 
        clearError()
        const id = Math.floor( Math.random() * 21)
  
        getCharacter(id)
            .then(onCharLoaded)
            .then(()=> setProcess('confirmed'))
    }

    return (
        <div className="randomchar">
            {setContent(process, View , char)}            
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

const View = ( { data } ) => {
    const { name, description, thumbnail, homepage, wiki } = data
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