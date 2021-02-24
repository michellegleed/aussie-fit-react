// Tutorial: https://www.codebeast.dev/react-forms-then-and-now/

const useForm = ({ initialValues, onSubmit, validate }) => {

    const [values, setValues] = React.useState(initialValues || {});
    const [updatedValues, setUpdatedValues] = React.useState({});
    const [validationErrors, setValidationErrors] = React.useState({});

    const handleChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setValues({
            ...values,
            [name]: value
        });
    };

    // handleBlur listens to when the user touches a field and leaves that field. When that happens, we want to update the touchedValues. We also call the validate method to see if any of our fields have failed validation and we update the errors state too.
    const handleBlur = event => {
        const target = event.target;
        const name = target.name;
        setTouchedValues({
            ...touchedValues,
            [name]: true
        });
        const e = validate(values);
        setErrors({
            ...errors,
            ...e
        })
    };

    // Lastly, we use handleSubmit to call the onSubmit function we received from the hook passing it the values, touchedValues and errors. With this, you can also access these values before handling submission.
    const handleSubmit = event => {
        event.preventDefault();
        const e = validate(values);
        setErrors({
            ...errors,
            ...e
        });
        onSubmit({ values, e });
    };

    return {
        values,
        updatedValues,
        errors,
        handleChange,
        handleSubmit,
        handleBlur
    };
}