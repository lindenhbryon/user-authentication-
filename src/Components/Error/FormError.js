function FormError(props){
    if(props.errors.length === 0){
        return false;
    }
    const listItems = props.errors.map((err, key) => {
        return <li key={key}>{err}</li>
    });
    return(
        <ul>{listItems}</ul> 
    )
}

export default FormError;