import React from 'react'
import styled from 'styled-components'
import ResetPasswordForm from './ResetPasswordForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import { LinearProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'

function ForgotPassword({ loader }) {

    const { search } = useLocation();
    const { push } = useHistory();
    const [resetToken, setResetToken] = React.useState(false)

    React.useEffect(() => {
        if(search.split('=')[0] === '?code'){
            setResetToken(prev => {
                return {
                    ...prev,
                    resetToken : search.split('=')[1]
                }
            })
            push('/forgot-password');
        }
    }, [search, push])

    return (
        <Wrapper>
            <Container>
                {loader && <LinearProgress />}
                { !resetToken ? 
                    <ForgotPasswordForm/> 
                    : 
                    <ResetPasswordForm resetToken={resetToken}/>}
            </Container>   
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        loader : state.resetPasswordReducer.emailLoader,
    }
}

export default connect(mapStateToProps)(ForgotPassword)

const Wrapper = styled.div`
      width : 100%;
      height : ${window.innerHeight}px;
      display : flex;
      justify-content : center;
      align-items : center;
      background : #fff;
`  
const Container = styled.div`
        height : 80%;
        width : 400px;
        overflow : hidden;
        background : #fff;
        border : 1px solid #ccc;
        border-radius : 5px;
        @media( max-width : 768px ) {
            height : ${window.innerHeight};
            width : 100%;
        }
`
