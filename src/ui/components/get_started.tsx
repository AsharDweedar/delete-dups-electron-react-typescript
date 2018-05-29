import * as React from 'react';
import GetStartedHTML from './stateless/get_started_HTML'

export default class GetStarted extends React.Component<any, {}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>Welcome To get started Component!</h2>
                <GetStartedHTML files="AsharDweedar" folders={24} time="Amman, Jordan" started={new Date() finished={new Date()} } />
            </div>
        );
    }
}
