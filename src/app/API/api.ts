import axios, { AxiosError } from 'axios'

export type httpReponse = {
    error: boolean,
    message: string
}

const apiCaller = axios.create({
    baseURL: 'https://faas-ams3-2a2df116.doserverless.co/api/v1/web/fn-360c0c09-22db-4ca5-bde4-3ab3d78db36f/draw',
})

export async function sendGrid({ dayLevels, token, repoUrl, year, email }: any): Promise<httpReponse> {
    console.log("Day Levels:", dayLevels);

    const data = {
        data: dayLevels,
        token,
        repository: repoUrl,
        year,
        email
    };

    try {
        await apiCaller.post('/sendGrid', data);
        return { error: false, message: 'Success' };
    } catch (err: any) {
        console.log('Request failed:', err);
        const errorMessage = err.response?.data?.error || 'Unknown error';
        return { error: true, message: errorMessage };
    }
}


export async function validateInputs({ token, repository, email, year }: any):
    Promise<{ error: boolean, message: string }> {
    try {
        const data = {
            token,
            repository,
            email,
            year,
        };

        console.log("Data:", data);
        await apiCaller.post('/validateToken', data);
        return { error: false, message: 'Inputs validated successfully' };
    } catch (err: any) {
        console.log('Request failed:', err);
        const errorMessage = err.response?.data?.error || 'Unknown error';
        return { error: true, message: errorMessage };
    }
}