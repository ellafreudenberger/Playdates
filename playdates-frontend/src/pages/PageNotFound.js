import '../index.css'

export const PageNotFound = () => {
    return (
    <>
    <h1 className='errorPageTitle'>404: PAGE NOT FOUND</h1> 
    <p className='errorPage'>Sorry, this page does not exist!</p>
    </>
    )
}

export default PageNotFound;
// Wrapped these React elements in React fragments because you can't return multiple top level elements from a React component