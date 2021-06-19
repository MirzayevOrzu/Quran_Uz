import axios from 'axios';

export default async function getTranslationOfSura(id: string) {
    let response: object = {};

    axios.get(`https://api.alquran.cloud/v1/surah/${id}/uz.sodik`)
    .then(res => {
        console.log(res.data.data)
        response = res;
    })
    .catch(err => {
        response = {
            success: false,
            message: err.message,
        }
    });

    return response;
}