const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})
const S3_BUCKET = process.env.AWS_S3_BUCKET

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: process.env.AWS_REGION
})

class S3BucketFunctions {

    uploadFile = (path) => {
        const params = {
            Bucket: S3_BUCKET,
            Key: path,
        };
        // myBucket.putObject(params)
        //     .send((err) => {
        //         if (err) console.log(err)
        //     })

        return{
            message:"File hase been uploaded"
        }
    }

    async getFile(path) {

        //For listing the files within a folder 
        /*const response = await myBucket.listObjectsV2({
            Bucket: S3_BUCKET,
            Prefix: 'ChrisDev'
        }).promise();*/

        //let files = response.Contents.map(item => item.Key)
        const params = {
            Bucket: S3_BUCKET,
            Key: path
        };
        try {
            const value = await myBucket.getObject(params).promise();
            return {
                message: "Report retrieved Succesfully",
                data: value.Body
            }
        }
        catch (err) {
            return {
                message: err,
                data: []
            }
        }
    }

    async deleteFile(path) {
        const myBucket = new AWS.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });

        const params = {
            Bucket: S3_BUCKET,
            Key: path,
        };

        myBucket.deleteObject(params, function (err, data) {
            if (err) {
                return{
                    message: err
                };
            }
            else {
                return{
                    message:"File has been deleted successfully"
                };
            }
        });
    }

}

module.exports = {
    S3BucketFunctions
}
