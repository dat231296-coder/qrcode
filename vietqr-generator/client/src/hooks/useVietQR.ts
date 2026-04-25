import { useState, useEffect } from 'react';

export interface Bank {
  id: number;
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
  transferSupported: number;
  lookupSupported: number;
}

export interface QRGenerationParams {
  accountNo: string;
  accountName: string;
  acqId: string;
  amount?: number;
  addInfo?: string;
  format?: string;
  template?: string;
}

export interface QRResponse {
  code: string;
  desc: string;
  data: {
    qrDataURL?: string;
    qrUrl?: string;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

export const useVietQR = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  // Fetch danh sách ngân hàng
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.vietqr.io/v2/banks');
        const data = await response.json();
        if (data.code === '00' && data.data) {
          setBanks(data.data);
        } else {
          setError('Không thể tải danh sách ngân hàng');
        }
      } catch (err) {
        setError('Lỗi kết nối tới VietQR API');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  // Validate input
  const validateInput = (params: QRGenerationParams): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!params.accountNo || params.accountNo.length < 6 || params.accountNo.length > 19) {
      errors.push({
        field: 'accountNo',
        message: 'Số tài khoản phải từ 6 đến 19 ký tự',
      });
    }

    if (!params.accountName || params.accountName.length < 5 || params.accountName.length > 50) {
      errors.push({
        field: 'accountName',
        message: 'Tên tài khoản phải từ 5 đến 50 ký tự',
      });
    }

    if (!params.acqId) {
      errors.push({
        field: 'acqId',
        message: 'Vui lòng chọn ngân hàng',
      });
    }

    if (params.amount && params.amount <= 0) {
      errors.push({
        field: 'amount',
        message: 'Số tiền phải lớn hơn 0',
      });
    }

    if (params.addInfo && params.addInfo.length > 25) {
      errors.push({
        field: 'addInfo',
        message: 'Nội dung chuyển tiền tối đa 25 ký tự',
      });
    }

    return errors;
  };

  // Generate QR code
  const generateQR = async (params: QRGenerationParams): Promise<boolean> => {
    // Validate input
    const errors = validateInput(params);
    if (errors.length > 0) {
      setValidationErrors(errors);
      setQrCode(null);
      return false;
    }

    setValidationErrors([]);
    setLoading(true);
    setError(null);

    try {
      // Sử dụng Quick Link API thay vì v2/generate vì không cần API key
      const bankData = banks.find(b => b.bin === params.acqId);
      if (!bankData) {
        setError('Ngân hàng không tìm thấy');
        return false;
      }

      // Build Quick Link URL
      let quickLinkUrl = `https://img.vietqr.io/image/${bankData.bin}-${params.accountNo}-compact.jpg`;
      
      const queryParams = new URLSearchParams();
      if (params.amount) {
        queryParams.append('amount', params.amount.toString());
      }
      if (params.addInfo) {
        queryParams.append('addInfo', params.addInfo);
      }
      if (params.accountName) {
        queryParams.append('accountName', params.accountName);
      }

      if (queryParams.toString()) {
        quickLinkUrl += `?${queryParams.toString()}`;
      }

      setQrCode(quickLinkUrl);
      return true;
    } catch (err) {
      setError('Lỗi khi tạo mã QR');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Copy QR link to clipboard
  const copyQRLink = async (link: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(link);
      return true;
    } catch (err) {
      console.error('Lỗi sao chép:', err);
      return false;
    }
  };

  // Download QR code
  const downloadQR = async (url: string, filename: string = 'vietqr.jpg') => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      setError('Lỗi khi tải mã QR');
      console.error(err);
    }
  };

  return {
    banks,
    loading,
    error,
    qrCode,
    validationErrors,
    generateQR,
    copyQRLink,
    downloadQR,
    setError,
    setValidationErrors,
  };
};
