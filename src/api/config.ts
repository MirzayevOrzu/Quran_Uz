import axios from 'axios';

export const QuranApi = axios.create({
    baseURL: 'https://api.alquran.cloud/v1/surah/',
    timeout: 1000, /* I don't now why I need it */
    headers: {'X-Custom-Header': 'foobar'} /* this one too */
});

