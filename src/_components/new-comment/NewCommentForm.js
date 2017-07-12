import React, {PropTypes} from 'react';
import Avatar from '../user/Avatar'
import './new-comment.scss'

class NewCommentForm extends React.PureComponent {
  static propTypes = {
    userInfo: PropTypes.any.isRequired,

    addComment: PropTypes.func.isRequired,
    validateComment: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = this.getInitState()
    this.onValidateCommentDebounced = _.debounce(this.onValidateComment, 500)
  }

  getInitState() {
    return {
      comment: '',
      error: '',
      isValidatingComment: false
    }
  }

  onHandleComment(e) {
    const comment = e.target.value;

    this.setState({ comment, isValidatingComment: true })
    this.onValidateCommentDebounced(comment);
  }

  onAddComment() {
    if (this.state.isValidatingComment) {
      this.setState({ error: 'Validation is going on' })
    } else if (!this.state.error) {
      this.props.addComment(this.props.userInfo, this.state.comment).then(({payload: httpResponse}) => {
        if (httpResponse.error) {
          this.setState({error: httpResponse.error});
          setTimeout(() => {
            this.setState({error: ''});
          }, 1500)
          return;
        }
      })
      this.setState({ ...this.getInitState() })
    }
  }

  onValidateComment(comment) {
    if (!this.state.isValidatingComment) {
      this.setState({ isValidatingComment: true })
    }

    this.props.validateComment(comment).then(({payload: httpResponse}) => {
      this.setState({ error: httpResponse.error, isValidatingComment: false })
    })
  }

  render() {
    const {userInfo} = this.props;
    const {error, comment} = this.state;

    const errorClassName = error ? 'new-comment__input_error' : '';

    return <div className='add-comment'>
      <h2 className='add-comment__title'>Comments</h2>
      <form className='add-comment__wrapper' >
        <Avatar url={userInfo.avatarUrl} className='add-comment__avatar' />
        <input className={`new-comment__input ${errorClassName}`}
          type='text'
          placeholder='Add a comment...'
          value={comment}
          onChange={::this.onHandleComment}
        />
        <button className='new-comment__button' onClick={::this.onAddComment}>Add</button>
      </form>
      <div className='add-comment__error'>
        {error}
      </div>
    </div>
  }
}

export default NewCommentForm;
