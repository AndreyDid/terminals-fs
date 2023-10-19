import React from 'react';
const App = () => {
    let date = new Date();
    date.toISOString()
    console.log(date)
const value = "273244/2023/09/03/ru-1/s3/aws4_request"
    return (
        <div>
            <form action="https://terminals-task.s3.storage.selcloud.ru/" method="post" enctype="multipart/form-data">
                Key to upload:
                <input type="input" name="key" value="PATH/${FILENAME}"/><br/>
                <input type="hidden" name="success_action_redirect" value="REDIRECT_URL"/>
                Content-Type:
                <input type="input" name="Content-Type" value="Content type"/><br/>
                <input type="text" name="X-Amz-Credential" value={value}/>
                <input type="text" name="X-Amz-Algorithm" value="AWS4-HMAC-SHA256"/>
                <input type="text" name="X-Amz-Date" value={date}/>
                <input type="hidden" name="Policy" value='Base64-encoded policy string'/>
                <input type="hidden" name="X-Amz-Signature" value="SIGNATURE_VALUE"/>
                File:
                <input type="file" name="file"/> <br/>
                <input type="submit" name="submit" value="Upload to S3"/>
            </form>

        </div>
    )
};

export default App;