import axios from "axios";
import { LoginDetails, SignUpDetails } from "../interfaces/UserInterface";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
  })


async function loginUser(loginDetails: LoginDetails ){
  const response = await instance.post('/user/login', loginDetails)
  return response.data
}

async function signUp(signUpDetails: SignUpDetails){
  const response = await instance.post('/user/register', signUpDetails)
  return response.data
}

async function getUserName(){
  try{
    const response = await instance.get('/user/getuser')
    return response.data
  }catch(e: any){
    console.error(e);
  }
    
}

export {getUserName, loginUser, signUp}
  