import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import defaultUser from '../../resources/img/default_user.jpg'

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
    }

    componentDidMount() {
      this.updateChar()
     /*  const timerId = setInterval(this.updateChar, 3000); */
    }

    componentWillUnmount() {
      /*   clearInterval(this.timerId) */
    }

    marvelService = new MarvelService()

    onCharLoaded = (char) => {
        this.setState ({
            char, 
            loading: false,
            error: false,
        })
    }

    onError = () => {
        this.setState({ 
            loading: false,
            error: true })
    }

    onCharLoading = () => {
        this.setState( {
            loading: true,
        })
    }

    updateChar = () => {
        const id = Math.floor( Math.random() * 21)
        this.onCharLoading()
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    render() {
        const { char, loading, error } = this.state
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
                        onClick={this.updateChar}
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
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