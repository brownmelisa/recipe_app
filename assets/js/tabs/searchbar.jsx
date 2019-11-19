

function SearchBar({ dispatch }) {
    function changed(data) {
        dispatch({
            type: 'CHANGE_SEARCH',
            data: data
        });
    }

    return <div>
        <Form.Group controlId="search">
            <Form.Label>Search Recipe</Form.Label>
            <Form.Control type="search" onChange={
                (ev) => changed({ search: ev.target.value })} />
        </Form.Group>
    </div>
}



export default connect(({ search }) => ({ search }))(SearchBar)