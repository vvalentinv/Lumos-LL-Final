import './custom-button.styles.scss';

const CustomButton = ({ children, onClick }) => (
    <button className='custom-button' onClick={onClick}>
        {children}
    </button>
);

export default CustomButton;