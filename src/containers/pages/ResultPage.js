import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';

class ResultPage extends React.Component {
  constructor(props) {
    console.log(props);
    super();
    let grade;
    if (props.val.descriptionScore >= 50 || props.val.titleScore >= 50) {
      grade = 'A';
    } else if (props.val.descriptionScore >= 25 || props.val.titleScore >= 25) {
      grade = 'B';
    } else {
      grade = 'C';
    }

    this.state = {
      descriptionScore: props.val.descriptionScore,
      titleScore: props.val.titleScore,
      grade: grade
    };

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  render() {
    if (this.state.grade === 'A') {
      return (
        <div>
          <h4>
            Congrats! You have successfully completed the challenge. You seem
            like a pro!
          </h4>
          <p>You earned {this.state.titleScore} for your title</p>
          <p>You earned {this.state.descriptionScore} for your description</p>

          <h4>Go spread the SEO knowledge to all the corners of the world!</h4>

          <h4>Have a great day ahead!</h4>
          <Button className="button" onClick={this.goBack}>
            Back to Survey
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Congrats! You have successfully completed the challenge</h4>
          <p>You earned {this.state.titleScore} for your title</p>
          <p>You earned {this.state.descriptionScore} for your description</p>

          <h4>Things you can do to improve your score</h4>
          <p>The title should be close to 60 characters long</p>
          <p>The description should be between 135 to 165 characters long</p>

          <p>This includes all the spaces as well</p>
          <p>
            Of course, this is not a comprehensive SEO guide by any means. But
            we hope you enjoyed.
          </p>
          <h4>Have a great day ahead!</h4>

          <h3>
            Did you know MOVE Team increased the SEO ranking of their client by
            33%? Talk to our correspondent to know more
          </h3>
          <Button className="button" onClick={this.goBack}>
            Back to Survey
          </Button>
        </div>
      );
    }
  }
}

export default ResultPage;
