import { useState } from "react";
import ErrorBaundary from "../errorBaundary/ErrorBaundary"
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [ selectedChar, setChar ] = useState(null)

    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <>
            <ErrorBaundary>
                <RandomChar/>
            </ErrorBaundary>

            <div className="char__content">
                <ErrorBaundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBaundary>
                <div>
                    <ErrorBaundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBaundary> 
                    <ErrorBaundary>
                        <CharSearchForm/>
                    </ErrorBaundary>
                </div>

            </div> 
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage