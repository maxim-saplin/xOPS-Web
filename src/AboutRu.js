import React from 'react';
import PressableLink from './PressableLink';
import DownloadLinks from './DownloadLinks';

export default function About(props){
    return (
        <>
            {props.inApp && <br/>}
            <PressableLink className={props.linkClass} onClick={props.toggleAbout}>[B] Назад к списку</PressableLink>
            <br/>
            {!props.inApp &&
            <div class="downloadBox">
                <h1>Скачать xOPS Бенчмарк</h1>
                <br/>
                <DownloadLinks />    
            </div>}
        </>
    )
}