/**
 * Error Response object from HRP
 */
export interface IHrpErrorResponse {
  error: {
    code: string;
    message: {
      lang: string; // "en",
      value: string; // "No Customizing for status type ARQ, status APPROVED, and transition event REJECT"
    };
    innererror: {
      application: {
        component_id: string; // '';
        service_namespace: string; // '/SAP/';
        service_id: string; // 'ZGELAGS001_SRV';
        service_version: string; // '0001';
      };
      transactionid: string; // 'F2D7C4519C310070E005ED1EBB2BE9DB';
      timestamp: string; // '';
      Error_Resolution: {
        SAP_Transaction: string; // '';
        SAP_Note: string; // 'See SAP Note 1797736 for error analysis (https://service.sap.com/sap/support/notes/1797736)';
      };
      errordetails: IErrorDetails[];
    };
  };
}

export interface IErrorDetails {
  code: string; // 'HRTIM_ABS_REQ/014';
  message: string; // 'No Customizing for status type ARQ, status APPROVED, and transition event REJECT';
  propertyref: string; // '';
  severity: string; // 'error';
  target: string; // '';
}
