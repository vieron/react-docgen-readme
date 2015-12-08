import React, { Component } from 'react';


/**
 * TabsNav
 */
export class TabsNav extends Component {

    static propTypes = {
        items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    }

    render() {
        var links = this.props.items.map(function(title) {
            return <a key={title}>{title}</a>;
        });

        return (<nav>{links}</nav>)
    }
}


/**
 * Tabs
 */
export default class Tabs extends Component {

    static propTypes = {
        /** The index of the active pane */
        current: React.PropTypes.number,
        /** An array containing all the panes */
        panes: React.PropTypes.arrayOf(React.PropTypes.object)
    }

    static defaultProps = {
        current: 0,
        panes: [
            {
                title: 'Pane 1',
                content: (<strong>{'Pane 1 content'}</strong>)
            },
            {
                title: 'Pane 2',
                content: (<strong>{'Pane 2 content'}</strong>)
            }
        ]
    }

    render() {
        var titles = this.props.panes.map(function(d) { return d.title; });
        var current = this.props.panes[this.props.current];
        var content = current ? current.content : '';

        return (<div>
                    <TabsNav items={titles} />
                    {content}
                </div>);
    }
}