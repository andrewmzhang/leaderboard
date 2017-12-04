/* global _ */

import React, {Component} from 'react';

export default (props) => {
    return (
        <ul>
            {
                _.map(props.sections, (section) => <li onClick={props.onClick.bind(this, section.id)}>{section.name}</li>)
            }

        </ul>
    )
}