import conf from '../conf/conf'

import { Client,Account,ID } from 'appwrite'

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account=new Account(this.client)
        console.log(this.account)
    }

    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            return this.login({email,password})

        }
        catch(err){
            throw err;
        }
    }

    async login({email,password}){
        try{
          const session=  await this.account.createEmailPasswordSession(email,password)
          console.log("Session created:", session);
          return session;
        }
        catch(err){
            throw err;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(e){
            console.log("Appwrite services :: getCurrentUser :: error ",e)
            throw e;
        }
        
    }

    async logout(){
        try{
            return await this.account.deleteSessions();
        }
        catch(e){
            console.log("Appwrite services :: logout :: error ",e)
        }
    }
}

const authService=new AuthService();

export default authService;