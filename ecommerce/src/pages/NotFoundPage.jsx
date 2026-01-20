import { Header } from "../components/Header"
import './NotFoundPage.css';

export function NotFoundPage({cart}) {
    return (
        <div className="my-page" >
            <link rel="icon" type="image/svg+xml" href="../assets/images/icons/checkmark.png" />
            <title>Oops!</title>
            <div>
                <Header cart={cart}/>
            </div>
            <div className="my-container">
                <h2 className="h2" >What?</h2>            
                <p>404 Page Not Found</p>
            </div>
        </div>
    )
}