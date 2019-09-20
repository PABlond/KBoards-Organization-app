import React, { useState } from 'react'
import queryString from 'query-string'
import HandleResend from './../../components/Auth/HandleResend'
import { Button } from 'react-bootstrap'

export default ({ location }: any) => {
    const { email = '' } = queryString.parse(location.search)
    const [response, setResponse] = useState<Boolean>(false)
    
    return (
        <>
            <h3>Your account is not active yet</h3>
            <p>
                When you create an account, a confirmation email is sent to the
                email address that you used to create the account. You need to
                click the link in the email to confirm your account.
            </p>
            <p>If you cannot locate the confirmation email click on "Resend"</p>
            <Button variant={'primary'} onClick={() => setResponse(true)}>
                Resend
            </Button>
            {response && <HandleResend email={email} />}
        </>
    )
}
