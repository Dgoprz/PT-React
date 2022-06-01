import T from 'prop-types';
import classNames from 'classnames';

import './Textarea.css';

const Textarea = ({ className, ...props }) => {
  return (
    <div className={classNames('textarea', className)}>
      <textarea {...props} className="textarea-input" />
    </div>
  );
};

Textarea.propTypes = {
  className: T.string,
};

export default Textarea;
