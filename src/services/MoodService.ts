import axios from "axios";
const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
})

async function getMonthlyMood(body: any){
    const response = await instance.post('/sentiment/monthlymood', body)
    // console.log(response)
    return response.data
}

async function getWordCloud(body: any){
    const response = await instance.post('/sentiment/wordcloud', body)
    // console.log(response)
    return response.data
}

async function updateSentiment(body: any){
    const response = await instance.post('/sentiment/justsentiment', body)
    return response.data
}

export {getMonthlyMood, getWordCloud, updateSentiment}


