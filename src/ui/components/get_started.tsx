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
                <GetStartedHTML name="AsharDweedar" age={24} address="Amman, Jordan" dob={new Date()} />
            </div>
        );
    }
}
