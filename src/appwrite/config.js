import conf from '../conf.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwriteurl);
        this.client.setProject(conf.appwriteprojectid);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createpost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )                                             
        }
        catch(error){
            throw error;
        }

    }

    async updatepost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch(error){
            throw error;
        }
    }

    async deletepost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            )
            return true;
        }
        catch(error){
            throw error;
            return false;
        }

    }

    async getpost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            )
        }
        catch(error){
            throw error;
            return false;
        }

    }

    async getposts(queries=[Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                queries
            )
        }
        catch(error){
            throw error;
            return false;
        }
    }

}

const service=new Service();
export default service;