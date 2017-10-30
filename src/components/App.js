import React from 'react';
import axios from 'axios';
import Result from './Result';

class App extends React.Component {

    constructor() {
        super();
        this.scanPicture = this.scanPicture.bind(this);
        this.state = {
            loaded: false,
            image: null,
            face: null,
        };
    }

    render() {

        return (
            <div>
                <form ref={(input) => this.pictureForm = input} id="picture-form" onSubmit={(e) => this.scanPicture(e)}>
                    <input ref={(input) => this.image = input} type="text" placeholder="Image to scan ..." required="required" defaultValue="https://pbs.twimg.com/profile_images/690965507198029824/3quC3A7L_400x400.jpg" />
                    <button type="submit">Scan Image</button>
                </form>
                { this.state.loaded ? <Result image={this.state.image} face={this.state.face} /> : null }
            </div>
        );
    }

    scanPicture(e) {
        e.preventDefault();
        axios.get(`https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?attribute=glass,pose,gender,age,race,smiling&url=${this.image.value}`, {
            headers: { 'X-Mashape-Key': 'exRLoEEFC3mshi4C68ImeWGudLOzp1PpltTjsn3wDJewAflyDt' }
        })
        .then(res => {
            this.setState({
                loaded: true,
                image:res.data.url,
                face: res.data.face[0]
            });
        });
    }

}

export default App;