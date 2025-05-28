import conf from '../conf/conf'

import { Client,Databases,ID,Query,Storage } from 'appwrite'

export class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredimage,status,userId}){
        try{
            console.log("Creating post with data:", {
                title,
                slug,
                content,
                featuredimage,  // Make sure this value is not undefined
                status,
                userID:userId
            });
    
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userID:userId,
                }
            )
        }
        catch(e){
            console.log("Appwrite services :: createPost :: error ",e)
        }
    }

    async updatePost(slug,{title,content,featuredimage,status,userId}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId
                }
            )
        }
        catch(e){
            console.log("Appwrite services :: updatePost :: error ",e)
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        }
        catch(e){
            console.log("Appwrite services :: deletePost :: error ",e);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        }
        catch(e){
            console.log("Appwrite services :: getPost :: error ",e);
            return false;
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){   
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        }
        catch(e){
            console.log("Appwrite services :: getPosts :: error ",e);
            return false;
        }
    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file,
            )
        }
        catch(e){
            console.log("Appwrite services :: updateFile :: error ",e)
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
            return true;
        }
        catch(e){
            console.log("Appwrite services :: updateFile :: error ",e)
            return false;
        }
    }

    async getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId,
        )
    }

}

const service=new Service();
export default service;