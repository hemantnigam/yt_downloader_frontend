import React from "react";
import axios from "axios";
import ytpl from "ytpl";
import "./Home.css";
import List from "../List/List";
import Playlist from "../Playlist/Playlist";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoInfo: {},
      url: "",
      gotVideoInfo: false,
      startLoader: false,
      hasError: true,
      isVideoTypeLink: false,
      playListInfo: {},
      gotPlayListInfo: false,
    };
    this.inputRef = React.createRef();
  }
  componentDidMount() {
    this.inputRef.current.focus();
  }

  getPlInfo() {
    
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

  checkLinkType = () => {
    this.setState({ isVideoTypeLink: false, playlistInfo: {}, videoInfo: {} });
    const url = this.inputRef.current.value;
    if (ytpl.validateURL(url)) {
      this.setState({ isVideoTypeLink: false });
      this.getPlaylistInfo();
    } else {
      this.setState({ isVideoTypeLink: true });
      this.getVideoInfo();
    }
  };

  adjustClipHeight = (height) => {
    document.getElementsByClassName("home")[0].style.height = `${height}px`;
  };

  getPlaylistInfo = async () => {
    this.setState({ gotPlayListInfo: false, startLoader: true });
    const playListID = await ytpl.getPlaylistID(this.inputRef.current.value);

    axios
      .get("https://warm-ocean-51847.herokuapp.com/playlistInfo", {
        params: {
          playListID,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        this.setState({
          playListInfo: data,
          gotPlayListInfo: true,
          startLoader: false,
        });
        if (window.screen.availWidth > 600) this.adjustClipHeight(600);
        else this.adjustClipHeight(750);
      })
      .catch((e) => {
        this.setState({ gotPlayListInfo: false, startLoader: false });
        if (window.screen.availWidth > 600) this.adjustClipHeight(400);
        else this.adjustClipHeight(350);
        console.log(e);
      });
  };

  getVideoInfo = () => {
    this.setState({ gotVideoInfo: false, startLoader: true });
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
          gotVideoInfo: true,
          startLoader: false,
        });
        if (window.screen.availWidth > 600) this.adjustClipHeight(600);
        else this.adjustClipHeight(850);
      })
      .catch((e) => {
        this.setState({ gotVideoInfo: false, startLoader: false });
        if (window.screen.availWidth > 600) this.adjustClipHeight(400);
        else this.adjustClipHeight(350);
        console.log(e);
      });
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
                this.checkLinkType();
              }
            }}
            ref={this.inputRef}
            type="text"
            placeholder="Paste your video link here"
          />
          <button
            className="btn btn-primary"
            onClick={this.checkLinkType}
            disabled={this.state.hasError}
          >
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
        {this.state.isVideoTypeLink && this.state.gotVideoInfo ? (
          <List
            key={this.state.url}
            data={this.state.videoInfo}
            videoURL={this.state.url}
          />
        ) : (
          this.state.gotPlayListInfo && (
            <Playlist playlistInfo={this.state.playListInfo} />
          )
        )}
      </div>
    );
  }
}

export default Home;
