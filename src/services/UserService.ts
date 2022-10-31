import axios from "axios";
import { EditProfile, LoginDetails, SignUpDetails } from "../interfaces/UserInterface";

const instance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
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

async function editProfile(editProfile: EditProfile){
  const response = await instance.post('/user/editprofile', editProfile)
  return response.data
}

export {getUserName, loginUser, signUp, editProfile}
  