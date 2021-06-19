import React from 'react';
import { useParams } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios'

interface Params {
    id: string
}

function OneSura() {
    const [suraDataText, setSuraDataText] = React.useState<any>({});
    const [suraDataAudio, setSuraDataAudio] = React.useState<any>({});
    const [state, setState] = React.useState<boolean>(false);
    const [pointer, setPointer] = React.useState<number>(0);
    let params: Params = useParams();

    React.useEffect(() => {
        axios.get(`https://api.alquran.cloud/v1/surah/${params.id}/en.asad`)
        .then(res => {
            console.log(res.data.data);
            setSuraDataText(res.data.data);
            setState(true);
        })
        .catch(err => {
            console.log(err);
        })

        axios.get(`http://api.alquran.cloud/v1/surah/${params.id}/ar.alafasy`)
        .then(res => {
            console.log(res.data.data);
            setSuraDataAudio(res.data.data);
        })
        .catch(err => {
            console.log(err);
        })

    }, []);

    const handlePlay = () => {
        var audioCount = suraDataAudio.ayahs.length;
        var audiosToPlay = document.getElementById("sura-auto-play") as HTMLAudioElement;
        
        function onload(){
            audiosToPlay.addEventListener('ended',onaudioEnded,false);
            let source = suraDataAudio.ayahs[pointer]
            audiosToPlay.src = source.audio;
            audiosToPlay.play();
        }
        
        function onaudioEnded(){    
            setPointer(prev => prev + 1);
            if (pointer > audioCount-1) return
            // audiosToPlay.src = suraDataAudio[audio_index];
            // videosToPlay.play();
            onload();
        }
        
        onload();
    }

    return (
        <div>
            <h1 className='arabic'>Suratul {suraDataText.name ? suraDataText.name : 'no info'}</h1>
            <button onClick={handlePlay}>Start</button>

            <ReactAudioPlayer
                id='sura-auto-play'
                controls
            />

            {/* { audioState && suraDataAudio.ayahs.map((ayah: {
                number: number,
                audio: string,
                audioSecondary: string[],
                hizbQuarter: number,
                juz: number,
                manzil: number,
                numberInSurah: number,
                page: number,
                ruku: number,
                sajda: boolean,
                text: string,
            }) => {
                return <ReactAudioPlayer
                src={ayah.audio!}
                autoPlay
                controls
              />
            })} */}

            { state && suraDataText.ayahs.map((ayah: {number: number, text: string}, index: number) => (
                <div  key={ayah.number}>
                   <p className="arabic">
                    {ayah.number} - {ayah.text} - {suraDataAudio.ayahs[index].text}
                   </p>
                </div>
            ))}
        </div>
    )
}

export default OneSura;
