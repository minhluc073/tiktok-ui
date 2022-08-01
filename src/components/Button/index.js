import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    ClassName,
    children,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    Button.propTypes = {
        to: PropTypes.string,
        href: PropTypes.string,
        primary: PropTypes.bool,
        outline: PropTypes.bool,
        text: PropTypes.bool,
        rounded: PropTypes.bool,
        disabled: PropTypes.bool,
        small: PropTypes.bool,
        large: PropTypes.bool,
        ClassName: PropTypes.string,
        children: PropTypes.node.isRequired,
        leftIcon: PropTypes.node,
        rightIcon: PropTypes.node,
        onClick: PropTypes.func,
    };

    let Comp = 'button'; //mnac đinh la the button
    const props = {
        onClick,
        ...passProps,
    };
    // remove event listeners when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    if (to) {
        props.to = to;
        Comp = Link; //link noi bo dung react-router-dom
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', { primary, outline, text, rounded, disabled, small, large, [ClassName]: ClassName });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
