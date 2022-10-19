import axios from "axios";
import { LoginDetails, SignUpDetails } from "../interfaces/UserInterface";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
  })


async function loginUser(loginDetails: any ){
  const response = await instance.post('/user/login', loginDetails)
  return response.data
}

async function signUp(signUpDetails: any){
  const response = await instance.post('/user/register', signUpDetails)
  return response.data
}

async function getUserName(){
    const response = await instance.get('/user/getuser')
    return response.data
}

export {getUserName, loginUser, signUp}
  