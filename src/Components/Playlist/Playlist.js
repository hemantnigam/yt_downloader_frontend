import React, { Component } from "react";
import axios from "axios";
import "./Playlist.css";

export class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFormat: "",
      selectedITag: "",
      selectedVideo: "",
      playlistVideo: {},
      gotVideoDetails: false,
      selectedIndex: 0,
      videoURLPrefix: "https://www.youtube.com/watch?v=",
    };
  }
  getVideoInfo = async (index) => {
    this.setState({ gotVideoDetails: false, selectedIndex: index }, () => {
      axios
        .get("https://warm-ocean-51847.herokuapp.com/getInfo", {
          params: {
            url: this.state.videoURLPrefix+this.props.playlistInfo.videos[this.state.selectedIndex].id,
          },
        })
        .then((response) => response.data)
        .then((data) => {
          if (data.video.length > 0) {
            let format = data.video.sort((a, b) => {
              if (a.height > b.height) return 1;
              return -1;
            })[0];

            this.setState({
              playlistVideo: data,
              gotVideoDetails: true,
              selectedVideo: format.url,
              selectedITag: format.itag,
              selectedFormat: format.qualityLabel,
            });
          } else {
            this.setState({
              playlistVideo: data,
              gotVideoDetails: true,
              selectedVideo: "",
              selectedITag: "",
              selectedFormat: "",
            });
          }
        })
        .catch((e) => {
          this.setState({ gotVideoDetails: false });
          console.log(e);
        });
    });
  };

  componentDidMount() {
    this.getVideoInfo(0);
    document.getElementsByClassName("tablinks")[0].click();
  }

  formatTitle = (title) => {
    if (title.length > 16) {
      return title.substring(0, 13) + "...";
    }
    return title;
  };
  openCity = (evt, cityName) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  };

  selectFormat = (video) => {
    this.setState({
      selectedVideo: video.url,
      selectedFormat: video.qualityLabel,
      selectedITag: video.itag,
    });
  };

  downloadVideo = () => {
    window.location.href = `https://warm-ocean-51847.herokuapp.com/downloadVideo?url=${
      this.state.videoURLPrefix+this.props.playlistInfo.videos[this.state.selectedIndex].id
    }&itag=${this.state.selectedITag}`;
  };

  selectVideoFromPlayList = (index) => {
    this.getVideoInfo(index);
  };

  downloadAudio = () => {
    window.location.href = `https://warm-ocean-51847.herokuapp.com/downloadAudio?url=${
      this.state.videoURLPrefix+this.props.playlistInfo.videos[this.state.selectedIndex].id
    }`;
  };

  render() {
    return (
      <div className="list-comp">
        <div className="pl-3">
          <div className="tab">
            <button
              className="tablinks"
              onClick={(event) => this.openCity(event, "Video")}
            >
              PlayList Videos
            </button>
          </div>
          <div id="Video" className="tabcontent">
            <div>
              <span className="pr-2">Title:</span>
              <span>{this.props.playlistInfo.title}</span>
            </div>
            <div className="video-container pt-2 d-flex justify-content-between">
              <div className="img d-flex justify-content-center align-items-center">
                {this.state.gotVideoDetails &&
                this.state.playlistVideo.thumbnail ? (
                  <img
                    className="mr-4"
                    alt="thumbnail not available"
                    src={this.state.playlistVideo.thumbnail.url}
                  />
                ) : (
                  <div className="img playlist-loader d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-light" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
              {this.state.gotVideoDetails && (
                <div className="playlist-buttons-content d-flex justify-content-evenly">
                  <div className="d-flex flex-column justify-content-evenly">
                    <div className="d-flex justify-content-center align-items-center">
                      <label className="mb-0 select-label"> Select Video:</label>
                    </div>
                    {this.state.selectedVideo && (
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary btn-sm dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Format: {this.state.selectedFormat}
                        </button>
                        <div className="dropdown-menu">
                          {this.state.playlistVideo.video
                            .sort((a, b) => {
                              if (a.height > b.height) return 1;
                              return -1;
                            })
                            .map((video, index) => {
                              return (
                                <a
                                  onClick={() => this.selectFormat(video)}
                                  key={index}
                                  className="dropdown-item d-flex justify-content-between align-items-center"
                                  href={() => false}
                                >
                                  {video.qualityLabel} - {video.container}
                                  {!video.audioCodec && (
                                    <i
                                      className="fas fa-volume-mute"
                                      style={{ color: "red" }}
                                    ></i>
                                  )}
                                </a>
                              );
                            })}
                        </div>
                      </div>
                    )}
                    <button
                      onClick={this.downloadAudio}
                      className="btn btn-secondary btn-sm"
                    >
                      Download Mp3
                    </button>
                  </div>

                  <div className="d-flex flex-column justify-content-evenly">
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {this.formatTitle(
                          this.props.playlistInfo.videos[
                            this.state.selectedIndex
                          ].title
                        )}
                      </button>
                      <div className="dropdown-menu">
                        {this.props.playlistInfo.videos.map((video, index) => {
                          return (
                            <a
                              onClick={() =>
                                this.selectVideoFromPlayList(index)
                              }
                              key={index}
                              className="dropdown-item d-flex justify-content-between align-items-center"
                              href={() => false}
                            >
                              {this.formatTitle(video.title)}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                    {this.state.selectedVideo && (
                      <a
                        href={this.state.selectedVideo}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="btn btn-secondary btn-sm"
                      >
                        Play Video
                      </a>
                    )}
                    {this.state.selectedVideo && (
                      <button
                        onClick={this.downloadVideo}
                        className="btn btn-secondary btn-sm"
                      >
                        Download
                      </button>
                    )}
                    {!this.state.selectedVideo && (
                      <div className="d-flex justify-content-center align-items-center">
                        <label className="no-codec">
                          No Video Codec Available
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div id="Audio" className="tabcontent"></div>
        </div>
      </div>
    );
  }
}

export default Playlist;
