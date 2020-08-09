import React from 'react'
import styled from 'styled-components';
import { Typography, Grid, AppBar, Tabs, Tab, Box } from '@material-ui/core'

function ApiDocs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Container>
              <Typography variant='subtitle2'
                            color='textPrimary'
                            style={{ fontWeight : '400', fontSize : '1rem' }}>
                Method
             </Typography>
             <samp style={{ marginBottom : '0.7rem' }}>
                 POST - Only post request is supported by our system.
             </samp>
             <Typography variant='subtitle2'
                            color='textPrimary'
                            style={{ fontWeight : '400', fontSize : '1rem' }}>
                 API endpoint
             </Typography>
             <samp style={{ marginBottom : '0.7rem' }}>
                https://sms-nepal-backend.herokuapp.com/sendSMS
             </samp>
             <Typography variant='subtitle2'
                            color='textPrimary'
                            style={{ fontWeight : '400', fontSize : '1rem' }}>
                 Responses
             </Typography>
             <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Response>
                     <samp>
                        Success response <br /> <br />
                        {'{'}<br />
                         &nbsp;&nbsp;&nbsp;&nbsp;data : "Sent Successfully",<br/>
                         &nbsp;&nbsp;&nbsp;&nbsp;status : 200,<br/>
                        {'}'}<br />
                    </samp>
                    </Response>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                     <Response>
                        <samp>
                            Error response <br /> <br />
                            {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;status 400 : "Bad requests",<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;status 402 : "Sms Limit exceeds",<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;status 403 : "Unauthorized access",<br/>
                            {'}'}<br />
                        </samp>
                    </Response>   
                </Grid>
             </Grid>
             <Typography variant='subtitle2'
                            color='textPrimary'
                            style={{ fontWeight : '400', fontSize : '1rem', margin: '1rem 0px' }}>
                 Code samples
             </Typography>
             <div style={{ width : '100%' }}>
                        <AppBar position="static" style={{ boxShadow : 'none' }}>
                            <Tabs value={value} 
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example">
                                <Tab label="Javascript" id={`scrollable-auto-tab-${0}`} aria-controls={`scrollable-auto-tabpanel-${0}`}/>
                                <Tab label="Python" id={`scrollable-auto-tab-${1}`} aria-controls={`scrollable-auto-tabpanel-${1}`}/>
                                <Tab label="Java" id={`scrollable-auto-tab-${2}`} aria-controls={`scrollable-auto-tabpanel-${2}`}/>
                                <Tab label="PHP" id={`scrollable-auto-tab-${3}`} aria-controls={`scrollable-auto-tabpanel-${3}`}/>
                                <Tab label="Node.js" id={`scrollable-auto-tab-${4}`} aria-controls={`scrollable-auto-tabpanel-${4}`}/>
                            </Tabs>
                        </AppBar>
                        <StyledBox value={value} index={0}role="tabpanel"
                                    hidden={value !== 0}
                                    id={`scrollable-auto-tabpanel-${0}`}
                                    aria-labelledby={`scrollable-auto-tab-${0}`}> 
                                <samp>
                                    {'{'}<br />
                                    <div style={{ padding : '0px 30px', boxSizing : "border-box", lineHeight : '1.3rem' }}>
                                        var myHeaders = new Headers();<br/>
                                        myHeaders.append("Authorization", "ApiKey <span className='highlight'>Your_API_key</span>");<br/>
                                        myHeaders.append("Content-Type", "application/json");<br/>
                                        var raw = JSON.stringify({'{'}"sms":"<span className='highlight'>Your_message</span>","phone":[<span className='highlight'>Phone_numbers_list</span>]{'}'});<br/>
                                        var requestOptions = {'{'}<br/>
                                        method: 'POST',<br/>
                                        headers: myHeaders,<br/>
                                        body: raw,<br/>
                                        redirect: 'follow'<br/>
                                        {'}'};<br/>
                                        fetch("https://sms-nepal-backend.herokuapp.com/sendSMS", requestOptions)<br/>
                                        .then(response {"=>"} response.text())<br/>
                                        .then(result {"=>"}  console.log(result))<br/>
                                        .catch(error {"=>"} console.log('error', error));<br/>
                                    </div>
                                    {'}'}<br />
                                </samp>
                        </StyledBox>
                        <StyledBox value={value} index={1} role="tabpanel"
                                hidden={value !== 1}
                                id={`scrollable-auto-tabpanel-${1}`}
                                aria-labelledby={`scrollable-auto-tab-${1}`}>
                                <samp>
                                {'{'}<br />
                                    <div style={{ padding : '0px 30px', lineHeight : '1.3rem' }}>
                                    import requests<br/>
                                    url = "https://sms-nepal-backend.herokuapp.com/sendSMS"<br/>
                                    payload = "{'{'}\r\n    \"sms\": \"<span className='highlight'>Your_message</span>\",\r\n    \"phone\": [<span className='highlight'>Phone_numbers_list</span>]\r\n{'}'}"<br/>
                                    headers = {'{'}<br/>
                                    'Authorization': 'ApiKey <span className='highlight'>Your_API_key</span>',<br/>
                                    'Content-Type': 'application/json'<br/>
                                    {'}'}<br/>
                                    response = requests.request("POST", url, headers=headers, data = payload)<br/>
                                    print(response.text.encode('utf8'))<br/>
                                    </div>
                                {'}'}<br />
                                </samp>
                        </StyledBox>
                        <StyledBox value={value} index={2} role="tabpanel"
                                hidden={value !== 2}
                                id={`scrollable-auto-tabpanel-${2}`}
                                aria-labelledby={`scrollable-auto-tab-${2}`}>
                                <samp>
                                {'{'}<br />
                                <div style={{ padding : '0px 30px', lineHeight : '1.3rem' }}>
                                        OkHttpClient client = new OkHttpClient().newBuilder().build();<br />
                                        MediaType mediaType = MediaType.parse("application/json");<br />
                                        RequestBody body = RequestBody.create(mediaType, "{'{'}\r\n    \"sms\": \"<span className='highlight'>Your_message</span>\",\r\n    \"phone\": [<span className='highlight'>Phone_numbers_list</span>]\r\n{'}'}");<br />
                                        Request request = new Request.Builder()<br />
                                        .url("https://sms-nepal-backend.herokuapp.com/sendSMS")<br />
                                        .method("POST", body)<br />
                                        .addHeader("Authorization", "ApiKey <span className='highlight'>Your_API_key</span>")<br />
                                        .addHeader("Content-Type", "application/json")<br />
                                        .build();<br />
                                        Response response = client.newCall(request).execute();<br />
                                </div>
                                
                                {'}'}<br />
                                </samp>
                        </StyledBox>
                        <StyledBox value={value} index={3} role="tabpanel"
                                hidden={value !== 3}
                                id={`scrollable-auto-tabpanel-${3}`}
                                aria-labelledby={`scrollable-auto-tab-${3}`}>
                                <samp>
                                {'{'}<br />
                                <div style={{ padding : '0px 30px', lineHeight : '1.3rem' }}>
                                        $client = new http\Client;<br/>
                                        $request = new http\Client\Request;<br/>
                                        $request{'->'}setRequestUrl('https://sms-nepal-backend.herokuapp.com/sendSMS');<br/>
                                        $request{'->'}setRequestMethod('POST');<br/>
                                        $body = new http\Message\Body;<br/>
                                        $body{'->'}append('{'{'}<br/>
                                            "sms": "<span className='highlight'>Your_message</span>",<br/>
                                            "phone": [<span className='highlight'>Phone_numbers_list</span>]<br/>
                                        {'}'}');<br/>
                                        $request{'->'}setBody($body);<br/>
                                        $request{'->'}setOptions(array());<br/>
                                        $request{'->'}setHeaders(array(<br/>
                                        'Authorization' {'=>'} 'ApiKey <span className='highlight'>Your_API_key</span>',<br/>
                                        'Content-Type' {'=>'} 'application/json'<br/>
                                        ));<br/>
                                        $client{'->'}enqueue($request){'->'}send();<br/>
                                        $response = $client{'->'}getResponse();<br/>
                                        echo $response{'->'}getBody();<br/>
                                </div>
                                {'}'}<br />
                                </samp>
                        </StyledBox>
                        <StyledBox value={value} index={4} role="tabpanel"
                                hidden={value !== 4}
                                id={`scrollable-auto-tabpanel-${4}`}
                                aria-labelledby={`scrollable-auto-tab-${4}`}>
                                <samp>
                                {'{'}<br />
                                <div style={{ padding : '0px 30px', lineHeight : '1.3rem' }}>
                                        var https = require('follow-redirects').https;<br/>
                                        var fs = require('fs');<br/>
                                        var options = {'{'}<br/>
                                        'method': 'POST',<br/>
                                        'hostname': 'sms-nepal-backend.herokuapp.com',<br/>
                                        'path': '/sendSMS',<br/>
                                        'headers': {'{'}<br/>
                                            'Authorization': 'ApiKey <span className='highlight'>Your_API_key</span>',<br/>
                                            'Content-Type': 'application/json'<br/>
                                        {'}'},<br/>
                                        'maxRedirects': 20<br/>
                                        {'}'};<br/>
                                        var req = https.request(options, function (res) {'{'}<br/>
                                        var chunks = [];<br/>
                                        res.on("data", function (chunk) {'{'}<br/>
                                            chunks.push(chunk);<br/>
                                        {'}'});<br/>
                                        res.on("end", function (chunk) {'{'}<br/>
                                            var body = Buffer.concat(chunks);<br/>
                                            console.log(body.toString());<br/>
                                        {'}'});<br/>
                                        res.on("error", function (error) {'{'}<br/>
                                            console.error(error);<br/>
                                        {'}'});<br/>
                                        {'}'});<br/>
                                        var postData = JSON.stringify({'{'}"sms":"<span className='highlight'>Your_message</span>","phone":[<span className='highlight'>Phone_numbers_list</span>]{'}'});<br/>
                                        req.write(postData);<br/>
                                        req.end();<br/>
                                </div>
                                {'}'}<br />
                                </samp>
                        </StyledBox>
             </div>
           
        </Container>
    )
}

export default ApiDocs

const Container = styled.div`
   box-sizing : border-box;
   padding : 0rem 1rem 1.2rem; 
   samp {
      font-size : 1.1rem;
      display : block;
      .highlight {
          color : #e6db74;
      }
   }
`;

const Response = styled.div`
   margin-top : 10px; 
   box-sizing : border-box;
   background : #272c34;
   padding : 0.7rem;
   color : #fff;
   border-radius : 7px; 
`;
const StyledBox = styled(Box)`
    &&& {
        box-sizing : border-box;
        padding : 0.7rem;  
        background : #272c34;
        color : #fff;
    }
`;
