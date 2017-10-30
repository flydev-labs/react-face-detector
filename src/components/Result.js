import React from 'react';

class Result extends React.Component {

    render() {
        const { image, face } = this.props;
        return (
          <div>
            <img src={image} alt="Selected" />
            <h4>Age: {face.attribute.age.value} (± {face.attribute.age.range})</h4>
            <h4>Gender: {face.attribute.gender.value} ({face.attribute.gender.confidence}%)</h4>
            <h4>Glass: {face.attribute.glass.value} ({face.attribute.glass.confidence}%)</h4>
            <h4>Race: {face.attribute.race.value} ({face.attribute.race.confidence}%)</h4>
            <h4>Smiling: {face.attribute.smiling.value} ({face.attribute.smiling.confidence}%)</h4>
          </div>
        );
    }

}

export default Result;