import useUser from '../../../hooks/useUser'
import { React } from 'react'

 function Progresso(){

    const { signUpState } = useUser();
    
    return (
        <div className='progresso'>
        <div className='fundo1'
            style={{ backgroundColor: signUpState.setlevel === 'fundo1' ? '#0E8750' : '#DEDEE9' }}
        ></div>
        <div className='fundo2'
            style={{ backgroundColor: signUpState.setlevel === 'fundo2' ? '#0E8750' : '#DEDEE9' }}
        ></div>
        <div className='fundo3'
            style={{ backgroundColor: signUpState.setlevel === 'fundo3' ? '#0E8750' : '#DEDEE9' }}
        ></div>
    </div>
    )
}
export default Progresso