import React from 'react';
import { useParams } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';

interface Params {
    id: string
}

function OneSura() {
    const [suraDataText, setSuraDataText] = React.useState<any>({});
    const [suraDataAudio, setSuraDataAudio] = React.useState<any>({});
    const [state, setState] = React.useState<boolean>(false);
    let params: Params = useParams();

    React.useEffect(() => {
        axios.get(`https://api.alquran.cloud/v1/surah/${params.id}/en.asad`)
        .then(res => {
            axios.get(`http://api.alquran.cloud/v1/surah/${params.id}/ar.alafasy`)
            .then(res => {
                console.log(res.data.data);
                setSuraDataAudio(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })

            console.log(res.data.data);
            setSuraDataText(res.data.data);
            setState(true);
        })
        .catch(err => {
            console.log(err);
        })

    }, []);

    const handlePlay = () => {
        var pointer = 0;
        var audioCount = suraDataAudio.ayahs.length;
        var audioElement = document.getElementById("sura-auto-play") as HTMLAudioElement;
        
        function onload(){
            audioElement.addEventListener('pause', onaudioPaused, true);
            audioElement.addEventListener('ended',onaudioEnded,false);
            audioElement.src = suraDataAudio.ayahs[pointer].audio;
            audioElement.play();
        }
        
        function onaudioPaused(e: any) {
            // console.log('paused');
            // audioElement.removeEventListener('ended', onaudioEnded);
        }

        function onaudioEnded(){  
            // console.log('ended')
            pointer += 1;
            if (pointer > audioCount-1) {
                pointer = 0;
                return
            }
            onload();
        }
        
        onload();
    }

    return (
        <div>
            <h1 className='arabic'>Suratul {suraDataText.name ? suraDataText.name : 'no info'}</h1>
            <button onClick={handlePlay}>Start</button>

            <ReactAudioPlayer id='sura-auto-play' controls />

            { state && suraDataText.ayahs.map((ayahTranslation: {number: number, text: string}, i: number) => {
                    return <div key={new Date().toLocaleDateString() + i} >
                        <p className="arabic">
                            {ayahTranslation.text} 
                        </p>
                    </div>
            })}
        </div>
    )
}

export default OneSura;
