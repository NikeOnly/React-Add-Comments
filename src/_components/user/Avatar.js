import React, {PropTypes} from 'react';
import './avatar.scss'

class Avatar extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired
  }

  render() {
    const {url, className} = this.props;
    return <img src={url} className={`avatar ${className || ''} `} />
  }
}

export default Avatar;
