import axios from "axios";
const instance = axios.create({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
      withCredentials: true,
      baseURL: 'http://127.0.0.1:5001/onceaday-48fb7/us-central1/api'
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


