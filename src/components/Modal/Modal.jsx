import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './style';
import Button from '../Button';

function setCookie(cookie, cookieKey, days, value) {
  const expiresInDays = days * 24 * 60 * 60;
  document.cookie = `${cookieKey}=${value}; max-age=${expiresInDays}; ${cookie}`;
}

export function hasDismissedCookie(cookie, cookieKey) {
  const match = cookie.match(new RegExp(`${cookieKey}=dismissed;*`));
  if (match) {
    return true;
  }
  return false;
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    if (props.cookie) {
      this.state = {
        dismissed: hasDismissedCookie(props.cookie.store, props.cookie.store),
      };
    }
  }

  componentDidMount() {
    if (this.ctaButton) {
      this.ctaButton.focus();
    }
    if (this.modal) {
      this.modal.addEventListener('keydown', this.onKeyDown);
    }
  }

  componentWillUnmount() {
    if (this.modal) {
      this.modal.removeEventListener('keydown', this.onKeyDown);
    }
  }

  onKeyDown = event => {
      // ESC
      if (event.which === 27) {
        event.preventDefault();
        event.stopPropagation();
        this.dismiss();
      }
  }

  /** this must be invoked to properly dismiss the modal */
  dismiss() {
    const { cookie } = this.props;
    this.setState({ dismissed: true });
    if (cookie) {
      setCookie(cookie.store, cookie.key, cookie.days, 'dismissed');
    }

    if (this.props.previousFocus) {
      this.props.previousFocus.current.focus();
    }
  }

  handleAction(action) {
    if(action.callback) {
      action.callback();
    }
    this.dismiss();
  }

  render() {
    const {
      children,
      background,
      action,
      secondaryAction,
      footer,
      wide,
    } = this.props;

    if (this.state && this.state.dismissed) {
      return null;
    }
    return (
      <Styles.Container>
        <Styles.Modal
          background={background}
          innerRef={modal => (this.modal = modal)}
          wide={wide}
        >
          {children}
          <Styles.Footer>
            {footer}
            {secondaryAction && (
              <Button
                type="text"
                onClick={() => {this.handleAction(secondaryAction); }}
                disabled={secondaryAction.disabled}
                label={secondaryAction.label}
              />
            )}
            <Button
              innerRef={ctaButton => (this.ctaButton = ctaButton)}
              type="primary"
              onClick={() => {this.handleAction(action); }}
              disabled={action.disabled}
              label={action.label}
            />
          </Styles.Footer>
        </Styles.Modal>
      </Styles.Container>
    );
  }
}

Modal.propTypes = {
  /** The style attribute to apply a background to the modal */
  background: PropTypes.string,
  /** The content of the modal */
  children: PropTypes.node.isRequired,
    /** The main action settings {**label**: the label of the button,  **disabled** to disable the button, **callback** a callback to invoke on action click, before dismiss */
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    callback: PropTypes.func,
  }).isRequired,
    /** The secondary action settings {**label**: the label of the button, **disabled** to disable the button, **callback** a callback to invoke on action click, before dismiss */
  secondaryAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    callback: PropTypes.func,
  }),
  /** The cookie settings if it's omitted the modal won't use cookies {**days**: expire time of the cookie in days, **store**, usually document.cookie, **key**: the key of the cookie} */
  cookie: PropTypes.shape({
    days: PropTypes.number,
    store: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  }),
  footer: PropTypes.node,
  /** set modal width to 73px */
  wide: PropTypes.bool,
  /** this element will regain focus on modal close */
  previousFocus: PropTypes.node,
};

Modal.defaultProps = {
  background: null,
  cookie: null,
  secondaryAction: null,
  footer: null,
  wide: false,
  previousFocus: null,
}

export default Modal;
