import React from 'react';
import PressableLink from './PressableLink';
import DownloadLinks from './DownloadLinks';

export default function About(props){
    return (
        <>
            {props.inApp && <br/>}
            <PressableLink className={props.linkClass} onClick={props.toggleAbout}>[B]ack to Chart</PressableLink>
            <br/>
            {!props.inApp &&
            <div class="downloadBox">
                <h1>Download CPDT Benchmark</h1>
                <br/>
                <DownloadLinks />    
            </div>}

            {!props.download &&
            <> 
            <h1>How are the Chart Results Obtained</h1>
            <br/>
            <div className="text">
                <p>
                <em>xOPS</em> application is used to measure storage performance. 
                {!props.inApp && <> See download links above.</>}
                </p>
                <p>
                At least 3 test runs are done, avergaes used.
                </p>
 
                <p>
                To avoid intereferences and side effects all running apps are closed, network activity is disabled (e.g. updates, downloads).
                </p>
            </div>
            <br/>
            </>}
            <h1>How does the App Work</h1>
            <br/>
            <div className="text">
                <p>
                Bla, bla, bla
                </p>
            </div>
        </>
    )
}