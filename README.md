# S3-copy lambda function

Copies new files in an S3 bucket to one or several other buckets. Based on the Serverless framework and this neat little [plugin](https://github.com/matt-filion/serverless-external-s3-event).

Copying is automatically triggered using the S3-Lambda integration. Currently only works if you define a *prefix*, but no *suffix*.

## Prerequisites
* [Node.js / NPM](https://nodejs.org)
* [Serverless](https://serverless.com/): `npm i -g serverless`
* AWS credentials
* Source bucket (needs to be in same account as lambda function)
* One or more destination buckets (if not in the same account, you need to manually grant S3:PutObject permissions to the lambda function, after the function has been created)

## Set up

Install plugin:
```
npm install
```

Set arguments:
```
args="--aws-profile <PROFILE> --region <REGION> --sourcebucket <SOURCEBUCKET NAME> --prefix <SOURCEBUCKET_PREFIX> --destbuckets <DESTINATIONBUCKET1>;<DESTINATIONBUCKET2>"
```

Set up function:
```
sls deploy $args
```

Set up S3 trigger:
```
sls s3deploy $args
```
