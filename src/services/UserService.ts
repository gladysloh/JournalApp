import axios from "axios";
import Cookies from "js-cookie"
import { EditProfile, LoginDetails, SignUpDetails } from "../interfaces/UserInterface";

let authToken = null;

const instance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5001/onceaday-48fb7/us-central1/api'
  })


async function loginUser(loginDetails: LoginDetails ){
  const response = await instance.post('/user/login', loginDetails)
  authToken = response.data.idToken;
  console.log(response)

  Cookies.set('auth_token', authToken);
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
  