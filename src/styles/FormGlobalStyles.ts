import { createGlobalStyle } from 'styled-components';

export const FormGlobalStyles = createGlobalStyle`
  /* Base form container styles */
  .form-container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  /* Section styles */
  .form-section {
    background: #f7f7f7;
    padding: 20px 30px;
    margin: 20px 0;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    width: 100%;
  }

  /* Form legend */
  .form-legend {
    font-size: 28px;
    font-weight: 800;
    color: rgb(31, 31, 35);
    margin-bottom: 25px;
    width: 100%;
    display: block;
  }

  /* Section title */
  .section-title {
    font-size: 22px;
    font-weight: 600;
    color: rgb(31, 31, 35);
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
  }

  /* Form field row layout */
  .form-field-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 15px;
    gap: 20px;
  }

  /* Label column */
  .label-column {
    width: 25%;
    min-width: 200px;
    padding-top: 10px;
  }

  /* Input column */
  .input-column {
    flex: 1;
  }

  /* Label styles */
  .field-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
    color: rgb(31, 31, 35);
  }

  /* Required field indicator */
  .required-field {
    color: red;
    margin-left: 5px;
  }

  /* Checkbox grid */
  .checkbox-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 10px;
  }

  /* Media queries for responsive layout */
  @media (max-width: 768px) {
    .form-field-row {
      flex-direction: column;
    }

    .label-column {
      width: 100%;
      padding-top: 0;
    }

    .checkbox-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default FormGlobalStyles;