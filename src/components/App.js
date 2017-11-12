import React from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import Result from './Result';

class App extends React.Component {

    constructor() {
        super();
        this.startOver = this.startOver.bind(this);
        this.scanPicture = this.scanPicture.bind(this);
        this.state = {
            loading: false,
            loaded: false,
            image: null,
            face: null,
        };
    }

    render() {
        return (
            <div id="main-component">
                <h1>React Face Detector</h1>
                <div className={ `app-component${this.state.loaded === true ? ' loaded' : ''} ` }>
                    <form ref={(input) => this.pictureForm = input} id="picture-form" onSubmit={(e) => this.scanPicture(e)} style={ this.state.loading === false && this.state.loaded === false ? {} : { display: 'none' }}>
                        <input className="effect-7" ref={(input) => this.image = input} type="text" placeholder="Image URL ..." onFocus={this.handleFocus} required="required" defaultValue="https://pbs.twimg.com/profile_images/690965507198029824/3quC3A7L_400x400.jpg" />
                        <button type="submit" className="button-blue">Scan Image</button>
                    </form>
                    { this.state.loading ? <Spinner /> : null }
                    { this.state.loaded ? <Result image={this.state.image} face={this.state.face} startOver={this.startOver} /> : null }
                </div>
            </div>
        );
    }

    startOver(e) {
        this.image.value = '';
        this.setState({
            loaded: false
        });
    }

    scanPicture(e) {
        this.setState({ loading: true });
        e.preventDefault();
        axios.get(`https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?attribute=glass,pose,gender,age,race,smiling&url=${this.image.value}`, {
            headers: { 'X-Mashape-Key': 'API_TOKEN' }
        })
        .then(res => {
            this.setState({
                loading: false,
                loaded: true,
                image: res.data.url,
                face: res.data.face[0]
            });
        });
    }

    handleFocus(event) {
        event.target.select();
    }

}

export default App;
