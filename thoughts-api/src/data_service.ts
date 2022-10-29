import AWS from "aws-sdk"
import { Thought } from "./models";

var credentials = new AWS.SharedIniFileCredentials({ profile: 'redpanda' });
AWS.config.credentials = credentials;
AWS.config.update({ region: 'ap-southeast-2' });

var client = new AWS.DynamoDB.DocumentClient();

interface ThoughtResult {
    success: boolean
    thought?: Thought
}

const getThought = async (thought_id: string, user_id: string): Promise<ThoughtResult> => {
    var params = {
        TableName: 'thoughts',
        Key: { thought_id: thought_id, user_id: user_id }
    };

    const response = await client.get(params).promise();

    console.log(response.Item);

    try {
        return {
            success: true,
            thought: response.Item as Thought
        }
    } catch (error) {
        return {
            success: false
        }
    }

}

export { getThought }