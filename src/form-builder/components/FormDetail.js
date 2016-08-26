import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Canvas from './canvas';

const FormDetail = ({ formData }) =>
  <div>
    <Link to="form-builder">My Forms</Link>
    <div className="name">{formData.name}</div>
    <div className="version">{formData.version}</div>
    <Canvas />
  </div>;

FormDetail.propTypes = {
  formData: PropTypes.object,
};

export default FormDetail;
