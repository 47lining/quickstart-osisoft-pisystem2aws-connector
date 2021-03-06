import React, { Component } from 'react'
import {
    Col, FormGroup, Checkbox, Tooltip, OverlayTrigger
} from 'react-bootstrap'


import Query from './Query.js'
import Datepicker from './Datepicker.js'


export function QueryOrDatepickerCheckbox(props) {

    const tooltip = (
        <Tooltip id="tooltip">
            Check if you want to input <strong>Query</strong> manually, otherwise use <strong>From</strong> and <strong>To</strong> datepickers
        </Tooltip>
    );

    return (
        <FormGroup
            controlId="queryOrDatepickerCheckbox"
        >
            <Col sm={10} smOffset={2}>
                <OverlayTrigger placement="left" overlay={tooltip}>
                    <div>
                        <Checkbox
                            checked={props.checked}
                            onChange={(event) => props.onChange(event)}
                        >
                            Use query syntax
                        </Checkbox>
                    </div>
                </OverlayTrigger>
            </Col>
        </FormGroup>
    )
}

export class QueryOrDatepickers extends Component {

    static validator(form) {
        if (form.syntax) {
            return Query.validator(form.query);
        } else if (Datepicker.validator(form.from) === 'success' & Datepicker.validator(form.to) === 'success') {
            return 'success';
        } else {
            return 'error';
        }
    }

    renderQuery() {
        return (
            <Query
                key="query"
                query={this.props.query}
                onChange={(event) => this.props.onChange(event, 'query')}
            />
        )
    }

    renderDatePickers() {
        return (
            <FormGroup
                key="datepickers"
            >
                <Col sm={6}>
                    <Datepicker
                        label="From"
                        value={this.props.from}
                        onChange={(value) => this.props.onDatepickerChange('from', value)}
                        datetimeProps={this.props.datetimeProps}
                    />

                </Col>
                <Col sm={6}>
                    <Datepicker
                        label="To"
                        value={this.props.to}
                        onChange={(value) => this.props.onDatepickerChange('to', value)}
                        datetimeProps={this.props.datetimeProps}
                    />
                </Col>
            </FormGroup>
        )
    }

    render() {
        return ([
            <QueryOrDatepickerCheckbox
                key="checkbox"
                checked={this.props.syntax}
                onChange={(event) => (
                    this.props.onChange(event, 'syntax', 'checked')
                )}
            />,
            this.props.syntax ? this.renderQuery() : this.renderDatePickers()
        ])
    }
}

export default QueryOrDatepickers
