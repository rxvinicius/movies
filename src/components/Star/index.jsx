import Ionicons from '@expo/vector-icons/Ionicons';
import COLORS from '../../styles/colors';
import PropTypes from 'prop-types';

/**
 * @param {{
 *  variant: 'outline' | 'half'
 *  size: 'small' | 'large',
 * }} props
 */

const Star = props => {
  const { variant, size } = props;
  const defaultName = 'md-star';
  const small = 12;
  const large = 24;

  const getName = () => (variant ? `${defaultName}-${variant}` : defaultName);
  const getSize = () => (size === 'small' ? small : large);

  return <Ionicons name={getName()} size={getSize()} color={COLORS.YELLOW} />;
};

Star.defaultProps = {
  variant: null,
  size: 'small',
};

Star.propTypes = {
  variant: PropTypes.oneOf(['outline', 'half']),
  size: PropTypes.oneOf(['small', 'large']),
};

export default Star;
