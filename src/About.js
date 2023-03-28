import React, { Component } from "react";
import "./Profile.css";

class Profile extends Component {
  render() {
    return (
      <div className="profile-page">
        <div className="author">
          <h2>Cameron Griffin</h2>
          <p>
            My name is Cameron Griffin, and I am a software developer with a focus on architecture. I'm passionate about continuously developing my technical skills and am currently pursuing Code Development at Code Fellows, where I am honing my skills in JavaScript and Java programming. I also have experience in a variety of languages such as HTML, CSS, Python, Kotlin, and SQL. I pride myself on my ability to adapt to new technologies and am proficient in various technical skills such as Agile development, test cases, AWS resources, and more. The portfolio you are currently viewing is a template from Code Fellows, and if you find it useful, I would greatly appreciate it if you could ⭐ the repository to make it more recognizable for other users. Thank you!
          </p>
        </div>
        <div className="author">
          <h2>Chris</h2>
          <p>
            Hey, I'm Chris, a Java software developer with a passion for learning and problem-solving.
          </p>
        </div>
      </div>
    );
  }
}

export default Profile;