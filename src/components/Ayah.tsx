import * as React from 'react';
import { excludeTafsir } from '../utils';

export interface AyahProps {
    ayahTranslation: {
        text: string;
        number: number;
    },
    ayahArabic: any
}

const Ayah = (props: AyahProps) => {
    return (
        <div
            className="ayah"
            key={`${new Date().toLocaleDateString()}-${props.ayahTranslation.number}`}
        >
            <div
                // move this style to mui 
                style={{ padding: "30px 10px", border: "3px solid lightgreen" }}
            >
                <p className="arabic" style={{ textAlign: "right" }}>
                    {props.ayahArabic}
                </p>
                <p>
                    {excludeTafsir(props.ayahTranslation.text)}
                </p>
            </div>
        </div>
    );
}

export default Ayah;
