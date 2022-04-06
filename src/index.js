import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import 'antd/dist/antd.css';
import './App.css'
import {store} from './Redux/store'
import {Provider} from 'react-redux'
import {App} from './App'

ReactDOM.render(
    <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);