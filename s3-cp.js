'use strict';
const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

module.exports.handler = (event, context, callback) => {
  const sourceBucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  const destBuckets = process.env.DEST_BUCKETS.split(";");

  var operations = [];

  destBuckets.forEach(function(bucket){
    console.log("Copying to bucket: ", bucket);

    var params = {
      Bucket: bucket, 
      CopySource: sourceBucket + "/" + key, 
      Key: key
    };

    console.log("params", params);

    operations.push(new Promise(
      (resolve, reject) => {
        s3.copyObject(params, (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        })
      }
    ));

  });


  Promise.all(operations)
    .then((responses) => callback(null, {
      statusCode: 200,
      body: JSON.stringify(responses)
    }))
    .catch((error) => {
      console.log(error);
      callback(null, {
          statusCode: 400,
          body: JSON.stringify(error)
        }
      )
    });
};
