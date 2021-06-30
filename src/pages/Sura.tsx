import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { scrollIntoView } from 'scroll-js';
import ReactAudioPlayer from 'react-audio-player';
import Ayah from "../components/Ayah";
// mui components
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { selectCurReciter } from '../features/reciterSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';


interface Params {
    id: string
}

const useStyles = makeStyles({
    root: {
        minHeight: "100vh"
    }
})

function Sura() {
    const classes = useStyles();
    const [state, setState] = React.useState({ success: false, msg: "" });
    const [translations, setTranslations] = React.useState<any>({});
    const [audios, setAudios] = React.useState<any>({});
    const currentReciter = useAppSelector(selectCurReciter);
    const params: Params = useParams();

    React.useEffect(() => {
        let relevant = true;

        axios.get(`http://api.alquran.cloud/v1/surah/${params.id}/${currentReciter.identifier}`)
            .then(res => {
                if (relevant) {
                    setAudios(res.data.data);
                }
                axios.get(`https://api.alquran.cloud/v1/surah/${params.id}/uz.sodik`)
                    .then(res => {
                        if (relevant) {
                            setTranslations(res.data.data);
                            setState({ success: true, msg: "" });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setState({
                            success: false,
                            msg: "Tizimda nosozlik sodir bo'ldi. Iltimos qaytadan urinib ko'ring"
                        });
                    });
            })
            .catch(err => {
                console.log(err);
                setState({
                    success: false,
                    msg: "Tizimda nosozlik sodir bo'ldi. Iltimos qaytadan urinib ko'ring"
                });
            });

        return function () {
            // prevent state change on unmounted component
            relevant = false;
        }
    }, []);

    const handlePlay = () => {
        let pointer = 0;
        const audioCount = audios.ayahs.length;
        const audioElement = document.getElementById("sura-auto-play") as HTMLAudioElement;

        function onload() {
            const element: any = document.body.getElementsByClassName('ayah')[pointer];
            // add styles for active sura
            element.classList.add("active-ayah");

            //scroll into element
            scrollIntoView(element, document.body, { behavior: 'smooth' })
                .then(() => { });

            // necessary operations on audioElement
            audioElement.addEventListener('pause', _ => onPause(element), true);
            audioElement.addEventListener('ended', onComplete, false);
            audioElement.src = audios.ayahs[pointer].audio;
            audioElement.play();
        }

        function onPause(element: HTMLElement) {
            // remove active class when paused or ended
            element.classList.remove("active-ayah");
        }

        function onComplete() {
            pointer += 1;
            // stop if reached at the end
            if (pointer > audioCount - 1) {
                pointer = 0;
                return
            }
            // go on if there are ayahs left 
            onload();
        }

        // start from first ayah
        onload();
    }

    // basic error handling
    if (!state.success) {
        return <h1>{state.msg}</h1>
    }

    const { ayahs } = translations;
    return (
        <Container maxWidth="md" className={classes.root}>
            <h1 className='arabic'>Suratul {translations.name ? translations.name : 'no info'}</h1>
            <button onClick={handlePlay}>Start</button>

            <ReactAudioPlayer id='sura-auto-play' controls />

            {
                state.success
                && ayahs.map((ayahTranslation: { number: number, text: string }, i: number) => (
                    <Ayah
                        key={`${new Date().toLocaleDateString()}-${i}`}
                        ayahTranslation={ayahTranslation}
                        ayahArabic={audios.ayahs[i].text}
                    />
                ))
            }

        </Container>
    )
}

export default Sura;
