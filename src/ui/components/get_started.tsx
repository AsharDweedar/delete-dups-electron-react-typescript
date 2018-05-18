import * as React from 'react';

export default class GetStarted extends React.Component<any, {}> {
    constructor(props: any) {
        super(props);
        console.log(props)
    }
    render() {
        return (
            <div>
                <h2>Welcome To get started Component!</h2>
                <div>
                    <h1>GetStarted Component</h1>
                    Hello,
                </div>
            </div>
        );
    }
}
