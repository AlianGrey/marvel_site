import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import defaultUserImg from '../../resources/img/default_user.jpg'

import './charList.scss';

const CharList = (props) => {
    const [ charList, setCharList] = useState([])
    const [ loading, setLoading] = useState(true)
    const [ error, setError] = useState(false)
    const [ newItemLoading, setNewItemLoading] = useState(false)
    const [ offset, setOffset] = useState(0)
    const [ charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect( () => {
        onRequest()
    }, [])

    const onRequest = (offset) => {
        onCharListLoading()
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9 ) {
            ended = true
        }

        setCharList( (charList) => [...charList, ...newCharList])
        setLoading(false)
        setNewItemLoading(false)
        setOffset( (offset) => offset + 9)
        setCharEnded(ended)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const itemRefs = useRef([])

    const focusOnItem = (id) => {
        itemRefs.current.map(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }


    function renderItems(arr) {
        return (
            arr.map((item, i) => {
                let imgStyle = {'objectFit': 'cover'}
                if (item.thumbnail === 'https://www.wallpaperflare.com/static/264/707/824/iron-man-the-avengers-robert-downey-junior-tony-wallpaper.jpg') 
                {
                    imgStyle = {'objectFit': 'unset'}
                    item.thumbnail=`${defaultUserImg}` //'https://cdnn21.img.ria.ru/images/07e4/0b/17/1585982208_0:0:1400:788_768x0_80_0_0_32b7ed91bc6331898009e86f8eecb870.jpg'
                }
                return (
                    <li 
                    className="char__item" 
                    tabIndex={0}
                    key={item.id}
                    ref = {el => itemRefs.current[i] = el}
                    onClick={ ()=> { 
                        props.onCharSelected(item.id);
                        focusOnItem(i) }
                     }
                    onKeyDown = { (e) => {
                        if ( e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id);
                            focusOnItem(i)
                        }
                    }}
                    >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                )        
            })
        )
    }

    const items = renderItems(charList)
    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(error || loading) ? items : null

    return (
        <div className="char__list">
                {errorMessage}
                {spinner}
            <ul className="char__grid">
                {content}
            </ul>
            <button 
                className="button button__main button__long"
                style = {{'display': charEnded ? 'none' : 'block'}}
                disabled = {newItemLoading}
                onClick= { () => onRequest(offset)}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;