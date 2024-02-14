const generateDynamicEmail=( link,companyName)=> {
  
    return `
  

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
        <center style="width: 100%; background-color: #f1f1f1;">
        <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <div style="max-width: 600px; margin: 0 auto;">
            <!-- BEGIN BODY -->
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
              <td valign="top" style="padding: 1em 2.5em 0 2.5em; background-color: #ffffff;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                          <!-- <td style="text-align: center;">
                            <h1 style="margin: 0;"><a href="#" style="color: #30e3ca; font-size: 24px; font-weight: 700; font-family: 'Lato', sans-serif;">THE CURVE COHORT3</a></h1>
                          </td> -->
                      </tr>
                  </table>
              </td>
              </tr><!-- end tr -->
              <tr>
              <td valign="middle" style="padding: 3em 0 2em 0;">
                <img src="https://www.the-curve.africa/static/media/curve2.b90648ddd7482f82d25a.png" alt="" style="width: 300px; max-width: 600px; height: auto; margin: auto; display: block;">
              </td>
              </tr><!-- end tr -->
                    <tr>
              <td valign="middle" style="padding: 2em 0 4em 0;">
                <table>
                    <tr>
                        <td>
                            <div style="padding: 0 2.5em; text-align: center;">
                                <h2 style="font-family: 'Lato', sans-serif; color: rgba(0,0,0,.3); font-size: 40px; margin-bottom: 0; font-weight: 400;">Please verify your email</h2>
                                <h3 style="font-family: 'Lato', sans-serif; font-size: 24px; font-weight: 300;">Welcome On Board , ${companyName},<br/>Click the button below to verify your account.</h3>
                                <p><a href=${link} class="btn btn-primary" style="padding: 15px 35px; display: inline-block; border-radius: 3px; background: #7e2e00; color: #ffffff; text-decoration: none;">Verify</a></p>
                                <h6 style="font-family: 'Lato', sans-serif; font-size: 18px; font-weight: 300;">This email expires in 5minutes</h6>
                            </div>
                        </td>
                    </tr>
                </table>
              </td>
              </tr><!-- end tr -->
          <!-- 1 Column Text + Button : END -->
          </table>
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
              <td valign="middle" style="padding:2.5em; background-color: #fafafa;">
                <table>
                    <tr>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-right: 10px;">
                              <h3 style="color: #000; font-size: 20px; margin-top: 0; font-weight: 400;">About</h3>
                             
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                              <h3 style="color: #000; font-size: 20px; margin-top: 0; font-weight: 400;">Contact Info</h3>
                              <ul>
                                        <li><span style="color: rgba(0,0,0,.5);">161/163 Muyibi street,Olodi Apapa</span></li>
                                        <li><span style="color: rgba(0,0,0,.5);">081372586756</span></li>
                                      </ul>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 10px;">
                              <h3 style="color: #000; font-size: 20px; margin-top: 0; font-weight: 400;">Useful Links</h3>
                           
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr><!-- end: tr -->
            <tr>
              <td style="text-align: center; background-color: #fafafa;">
                  © Copyright 2023. All rights reserved.<br/>
              </td>
            </tr>
          </table>
    
        </div>
      </center>
    </body>
    </html>
  
    `
  }
  
  module.exports= generateDynamicEmail 