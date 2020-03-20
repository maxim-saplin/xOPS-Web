import React from 'react';
import PressableLink from './PressableLink';
import DownloadLinks from './DownloadLinks';

export default function About(props){
    return (
        <>
            {props.inApp && <br/>}
            <PressableLink className={props.linkClass} onClick={props.toggleAbout}>[R]etour aux résultats</PressableLink>
            <br/>
            {!props.inApp &&
            <div class="downloadBox">
                <h1>Télécharger xOPS CPU Benchmark</h1>
                <br/>
                <DownloadLinks />    
            </div>}

        </>
    )
}