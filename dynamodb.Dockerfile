FROM amazon/dynamodb-local:1.18.0
USER root
RUN mkdir -p /home/dynamodblocal/data && chown -R dynamodblocal: /home/dynamodblocal/data
USER dynamodblocal
