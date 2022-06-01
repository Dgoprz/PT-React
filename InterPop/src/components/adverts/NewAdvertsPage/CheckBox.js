function CheckBox(props) {
    const tags = props.arg.tgs;
    const list = tags.map((tag) =>
    <label key={tag}>
        <input
            name={tag}
            type="checkbox"
            variant="primary"
            onChange={props.arg.handleCheckTag}
        /> 
       {tag}
     </label>
    );

    return (
       list
    );
  }

  export default CheckBox;