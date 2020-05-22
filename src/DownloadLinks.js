import React from 'react';
import windows from './img/windows.svg';
import macOS from './img/macos.svg';
import google_play from './img/google-play.svg';
import apk from './img/apk.svg';
import github from './img/github.svg';
import linux from './img/linux.svg';

export default function DownloadLinks(props){
    return (
        <>
            <a href="https://github.com/maxim-saplin/xOPS-App/releases/download/1.1.0/xOPS.exe.zip" 
            target="_blank">
                <img src={windows}/>
                <br/>Windows
            </a>
            <a href="https://github.com/maxim-saplin/xOPS-App/releases/download/1.1.0/xOPS.app.zip" 
            target="_blank">
                <img src={macOS}/>
                <br/>macOS
            </a>
            <a href="https://play.google.com/store/apps/details?id=xcom.saplin.xOPS" 
            target="_blank">
                <img src={google_play}/>
                <br/>Android
            </a>
            <a href="https://github.com/maxim-saplin/xOPS-App/releases/download/1.1.1/xcom.saplin.xOPS.apk" 
            target="_blank">
                <img src={apk}/>
                <br/>.APK
            </a>
            <a href="https://github.com/maxim-saplin/xOPS-App" 
            target="_blank">
                <img src={github}/>
                <br/>GitHub
            </a>
            <a href="https://github.com/maxim-saplin/xOPS-Console/releases/tag/1.0.2" 
            style={{opacity: 0.65}}
            target="_blank">
                <img src={linux}/>
                <br/>Linux
            </a>
        </>
    )
}