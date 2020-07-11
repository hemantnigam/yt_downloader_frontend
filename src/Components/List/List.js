import React from "react";
import "./List.css";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFormat: "",
      selectedITag: "",
      selectedVideo: {},
    };
  }
  componentDidMount() {
    let videoArr = this.props.data.video.sort((a, b) => {
      if (a.height > b.height) return 1;
      return -1;
    });
    this.setState({
      selectedVideo: videoArr[0].url,
      selectedFormat: videoArr[0].qualityLabel,
      selectedITag: videoArr[0].itag,
    });

    document.getElementsByClassName("tablinks")[0].click();
  }

  downloadAudio = () => {
    window.location.href = `https://warm-ocean-51847.herokuapp.com/downloadAudio?url=${this.props.videoURL}`;
  };

  formatTitle = (title) => {
    if (title.length > 25) {
      return title.substring(0, 25) + "...";
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
    window.location.href = `https://warm-ocean-51847.herokuapp.com/downloadVideo?url=${this.props.videoURL}&itag=${this.state.selectedITag}`;
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
              Video
            </button>
            {/* <button
              className="tablinks"
              onClick={(event) => this.openCity(event, "Audio")}
            >
              Audio
            </button> */}
          </div>
          <div id="Video" className="tabcontent">
            <div>
              <span>Title:</span>
              <span>{this.props.data.title}</span>
            </div>
            <div className="video-container pt-2 d-flex justify-content-between">
              <img
                className="mr-4"
                alt="thumbnail not available"
                src={this.props.data.thumbnail.url}
              />
              <div className="mr-4 video-content d-flex flex-column justify-content-around">
                <div className="d-flex justify-content-evenly">
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
                      {this.props.data.video
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
                  <a
                    href={this.state.selectedVideo}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="btn btn-secondary btn-sm"
                  >
                    Play Video
                  </a>
                </div>
                <div className="d-flex justify-content-evenly">
                  <button
                    onClick={this.downloadAudio}
                    className="btn btn-secondary btn-sm"
                  >
                    Download Mp3
                  </button>
                  <button
                    onClick={this.downloadVideo}
                    className="btn btn-secondary btn-sm"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div id="Audio" className="tabcontent"></div>
        </div>
      </div>
    );
  }
}

export default List;
