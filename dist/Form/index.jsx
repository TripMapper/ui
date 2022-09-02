import formToObj from '../util/formToObj';
export default function Form({ onSubmit, children, ...props }) {
    const _onSubmit = async (e) => {
        e.preventDefault();
        e.persist();
        onSubmit && onSubmit(formToObj(new FormData(e.target), e.target), e);
    };
    return (<form {...props} onSubmit={_onSubmit}>
			{children}
		</form>);
}
