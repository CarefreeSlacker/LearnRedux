var React = require('react');
var { Link, IndexLink } = require('react-router');

var Navigation = () => {
    return (
        <div className="top-bar">
            <div className="top-tar-left">
                <ul className="menu">
                    <li className="menu-text">
                        <span>React timer App</span>
                    </li>

                    <li>
                        <IndexLink to="/" activeClassName="active-link">Timer</IndexLink>
                    </li>

                    <li>
                        <Link to="/countdown" activeClassName="active-link">Countdown</Link>
                    </li>
                </ul>
            </div>

            <div className="top-bar-right">
                <ul className="menu">
                    <li className="menu-text">
                        Created by <a href="http://www.mead.io" target="_blank">CowexCortex</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

module.exports = Navigation;
