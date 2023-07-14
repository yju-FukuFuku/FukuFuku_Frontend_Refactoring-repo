import styled from 'styled-components';

const Center = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 30px;
`

const Spinner = styled.div`
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top-color: ${props => props.theme.textColor1};
    border-radius: 50%;
    animation: spin 1s infinite linear;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

function BasicExample() {
    return (
    <Center>
        <Spinner/>
    </Center>
    
  );
}

export default BasicExample;