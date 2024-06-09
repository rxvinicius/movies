import Ionicons from '@expo/vector-icons/Ionicons';
import COLORS from '../../styles/colors';
import PropTypes from 'prop-types';

/**
 * @param {{
 *  variant: 'outline' | 'half'
 *  size: 'small' | 'large',
 * }} props
 */

const getName = variant => 'star' + (variant && `-${variant}`);
const getSize = { small: 12, large: 24 };

const Star = ({ variant = '', size = 'small' }) => (
  <Ionicons name={getName(variant)} size={getSize[size]} color={COLORS.YELLOW} />
);

Star.propTypes = {
  variant: PropTypes.oneOf(['outline', 'half']),
  size: PropTypes.oneOf(['small', 'large']),
};

export default Star;
