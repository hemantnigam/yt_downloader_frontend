import React, { Component } from "react";
import "./Instructions.css";

export class Instructions extends Component {
  render() {
    return (
      <div className="instructions mt-4 d-flex flex-column justify-content-center align-items-center">
        <h1>How to download YouTube video online?</h1>
        <div className="instructions-content d-flex align-items-start mt-4">
          <div className="copy-text mr-4">
            <div className="d-flex justify-content-center align-items-center mb-2">
              <i className="far fa-copy mr-2" style={{color:'blue'}}></i>
              <h3>Copy YouTube URL</h3>
            </div>
            <p>
              Copy your video or playlist URL from YouTube that you need to
              download.
            </p>
          </div>

          <div className="paste-text mr-4">
            <div className="d-flex justify-content-center align-items-center mb-2">
              <i className="fas fa-mouse-pointer mr-2" style={{color:'orange'}}></i>
              <h3>Paste in search field</h3>
            </div>
            <p>
              Paste YouTube video URL in the search field and click search or
              press Enter.
            </p>
          </div>

          <div className="download-text">
            <div className="d-flex justify-content-center align-items-center mb-2">
              <i className="fas fa-download mr-2" style={{color:'green'}}></i>
              <h3>Download Video</h3>
            </div>
            <p>
              You will get list of files for download video and audio. Click the
              'Download' button to start downloading the file.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Instructions;
