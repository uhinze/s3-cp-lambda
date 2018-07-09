# S3-copy lambda function

Copies new files in an S3 bucket to one or several other buckets. Based on the Serverless framework and this neat little [plugin](https://github.com/matt-filion/serverless-external-s3-event).

Copying is automatically triggered using the S3-Lambda integration. Currently only works if you define a *prefix*, but no *suffix*.

## Prerequisites
* [Node.js / NPM](https://nodejs.org)
* [Serverless](https://serverless.com/): `npm i -g serverless`
* AWS credentials
* Source bucket (needs to be in same account as lambda function)
* One or more destination buckets (if not in the same account, you need to grant cross-account permissions, see bottom)

## Set up

Install plugin:
```
npm install
```

Set up function and S3 trigger:
```
args="--aws-profile <PROFILE> --region <REGION> --sourcebucket <SOURCEBUCKET NAME> --prefix <SOURCEBUCKET_PREFIX> --destbuckets <DESTINATIONBUCKET1>;<DESTINATIONBUCKET2>"
sls deploy $args
sls s3deploy $args
```

## Grant cross-account permissions if destination bucket is in another account

Either you take assets/cross-account-dest-bucket.yml or you manually apply the following bucket policy:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowS3CpLambdaAccess",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<SOURCEACCOUNT_ID>:root"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::<DESTINATIONBUCKET_NAME>/*"
        }
    ]
}
```
