import axios from "axios";
const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
})

async function getMonthlyMood(body: any){
    const response = await instance.post('/monthlymood', body)
    // console.log(response)
    return response.data
}

async function getWordCloud(body: any){
    const response = await instance.post('/wordcloud', body)
    // console.log(response)
    return response.data
}

export {getMonthlyMood, getWordCloud}


