import './custom-button.styles.scss';

const CustomButton = ({ children }) => (
    <button className='custom-button'>
        {children}
    </button>
);

export default CustomButton;