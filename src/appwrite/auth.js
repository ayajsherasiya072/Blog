import conf from '../conf.js'
import { Client, Account, ID } from "appwrite";

export class Authservice{
    client=new Client();
    account;
    constructor(){
        this.client.setEndpoint(conf.appwriteurl);
        this.client.setProject(conf.appwriteprojectid);
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const useraccount=this.account.create(ID.unique(),email,password,name);
            if(useraccount)
            {
                // call another method
                return this.login({email,password});
            }
            else
            {
                return useraccount;
            }
        }
        catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password);
        }
        catch(error){
            throw error;
        }
    }

    async getcurrentuser(){
        try{
            return await this.account.get();
        }
        catch(error){
            throw error;
        }
        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(error){
            throw error;
        }
    }
}

const authservice=new Authservice();

export default Authservice;