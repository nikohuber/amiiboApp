import PropTypes from 'prop-types';

const Footer = ({name, year}) => {
    return <Footer 
    name="Niko Huber"
    year={new Date().getFullYear()}
  />
};

Footer.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
}

export default Footer;