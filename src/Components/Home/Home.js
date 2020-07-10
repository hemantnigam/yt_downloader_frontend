import React from "react";
import axios from "axios";
import "./Home.css";
import List from "../List/List";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoInfo: {},
      url: "",
      gotInfo: false,
      startLoader: false,
      hasError: true,
    };
    this.inputRef = React.createRef();
  }
  componentDidMount(){
    this.inputRef.current.focus();
  }
  getURL = () => {
    if (this.inputRef.current.value === "") {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.setState({
      url: this.inputRef.current.value,
    });
  };

  getVideoInfo = () => {
    this.setState({ getInfo: false, startLoader: true });
    axios
      .get("https://warm-ocean-51847.herokuapp.com/getInfo", {
        params: {
          url: this.inputRef.current.value,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          videoInfo: data,
          gotInfo: true,
          startLoader: false,
        });
      })
      .catch((e) => console.log(e));
  };
  render() {
    return (
      <div className="home">
        <h2>YT Downloader - Download and Save YouTube Videos</h2>
        <div className="actions">
          <input
            onInput={() => this.getURL()}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                this.getVideoInfo();
              }
            }}
            ref={this.inputRef}
            type="text"
            placeholder="Paste your video link here"
          />
          <button className="btn btn-primary" onClick={this.getVideoInfo} disabled={this.state.hasError}>
            Start
          </button>
          <div className="loading">
            {this.state.startLoader && (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
        {this.state.gotInfo && (
          <List key={this.state.url} data={this.state.videoInfo} videoURL={this.state.url} />
        )}
      </div>
    );
  }
}

export default Home;
