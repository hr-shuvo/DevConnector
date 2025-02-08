const FormRow = ({type, name, labelText, defaultValue, placeholder, required, onChange}) => {
    if(required){
        required = 'required';
    }
    else {
        required = '';
    }

    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">{labelText || name}</label>
            <input type={type} id={name} name={name} className="form-input" placeholder={placeholder}
                   defaultValue={defaultValue} required={required} onChange={onChange}/>
        </div>
    )

}

export default FormRow;