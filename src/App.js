import React, { Component } from "react";
import ImageNames from "./imageNames";
import Navbar from "./components/navbar";
import ImageListing from "./components/ImageListing";

class App extends Component {
  state = {
    imageNames: ImageNames,
    clickedImages: [],
    score: 0,
    topScore: 0,
    feedback: "Click an image to start!",
    gameStatus: 0
  };

  componentDidMount() {
    this.setState(
      {
        imageNames: this.shuffle(this.state.imageNames)
      },
      () => {
        console.log("Shuffled the images on game start");
      }
    );
  }

  handleClick(e) {
    const clickedImageName = e.target.alt;

    const wasImageClickedBefore = this.imageClickedBefore(clickedImageName);
    if (wasImageClickedBefore) {
      this.setState(
        {
          imageNames: this.shuffle(this.state.imageNames),

          clickedImages: [],
          score: 0,
          feedback: "Game Over! You Guessed The Same Image Twice!",
          gameStatus: 2
        },
        () => {}
      );
    } else {
      let newScore = this.state.score + 1;
      if (newScore === this.state.imageNames.length) {
        this.setState({
          imageNames: this.shuffle(this.state.imageNames),

          clickedImages: [],
          score: 0,
          topScore: newScore,
          feedback: "Cowabunga! You Have Guessed All Of The Images Correctly!",
          gameStatus: 1
        });
      } else {
        const clickedImagesCopy = this.state.clickedImages.slice();
        clickedImagesCopy.push(clickedImageName);
        const newTopScore =
          newScore > this.state.topScore ? newScore : this.state.topScore;
        this.setState(
          {
            ImageNames: this.shuffle(this.state.imageNames),

            clickedImages: clickedImagesCopy,
            score: newScore,
            topScore: newTopScore,
            feedback: "Yes! You Guessed The Image Correctly!",
            gameStatus: 0
          },
          () => {}
        );
      }
    }
  }

  imageClickedBefore(clickedImageName) {
    for (let index = 0; index < this.state.clickedImages.length; index++) {
      if (this.state.clickedImages[index] === clickedImageName) {
        return true;
      }
    }
    return false;
  }

  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  render() {
    return (
      <div>
        <Navbar
          score={this.state.score}
          topScore={this.state.topScore}
          feedback={this.state.feedback}
          gameStatus={this.state.gameStatus}
        />
        {/* <Banner /> */}
        <ImageListing
          ImageNames={this.state.imageNames}
          clickHandler={(e) => this.handleClick(e)}
          gameStatus={this.state.gameStatus}
        />
        {/* <Footer /> */}
      </div>
    );
  }
}
export default App;
