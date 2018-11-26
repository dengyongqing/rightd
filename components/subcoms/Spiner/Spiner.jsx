import React from 'react';
import PropTypes from 'prop-types';

require('./index.css');

const spinkitSpinner = {
		circle: {
				className: 'sk-circle',
				divCount: 12
		}
}
export default class Select extends React.Component {
		static PropTypes = {
				noFadeIn: PropTypes.bool,
				fadeIn: PropTypes.oneOf(['full', 'half', 'quarter', 'none']),
				color: PropTypes.string,
		}
		static defaultPropTypes = {
				noFadeIn: false,
				fadeIn: 'full',
		}
		constructor(props) {
				super(props);
		}
		render() {
				const spinnerInfo = spinkitSpinner.circle;
				const props = Object.assign({}, this.props)
				if (this.props.color) {
						props.style = props.style
								? {
										...props.style,
										color: this.props.color
								}
								: {
										color: this.props.color
								};
				}
				return (
						<div {...props} className="z-circle">
								{[...Array(spinnerInfo.divCount)].map((_, idx) => <div key={idx}/>)}
						</div>

				)
		}
}
