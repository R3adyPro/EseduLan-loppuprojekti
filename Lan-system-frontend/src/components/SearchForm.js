import { Form } from "react-bootstrap"

const SearchForm = ({value, handleChange}) =>{
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
        }
      }

    return(
        <Form>
        <div>
          <Form.Control
          type='text'
          placeholder='Hae Käyttäjiä'
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ></Form.Control>
        </div>
   </Form>
    )
}

export default SearchForm