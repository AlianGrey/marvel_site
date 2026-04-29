import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
//import { MainPage, ComicsPage, SingleComicsPage } from "../pages"
import Spinner from "../spinner/Spinner";

const Page404 = lazy( ()=> import('../pages/404'))
const MainPage = lazy( ()=> import('../pages/MainPage'))
const ComicsPage = lazy( ()=> import('../pages/ComicsPage'))
const SinglePage = lazy( () => import('../pages/SinglePage'))
const SingleComicsLayout = lazy( () => import('../pages/singleComicsLayout/SingleComicsLayout'))
const SingleCharacterLayout = lazy( () => import('../pages/singleCharacterLayout/SingleCharacterLayout'))

const App = () => {
    return (
        <Router future={{ v7_startTransition: true,  v7_relativeSplatPath: true }} basename="/marvel_site">
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>} />
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:id" element={ <SinglePage Component={SingleComicsLayout} dataType='comics' /> } />
                            <Route path="/characters/:id" element={ <SinglePage Component={SingleCharacterLayout} dataType='character' /> } />
                            <Route path="*" element={<Page404/>} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;