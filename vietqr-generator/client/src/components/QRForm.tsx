import { useState } from 'react';
import { Bank, QRGenerationParams, ValidationError } from '@/hooks/useVietQR';
import { ChevronDown, Loader2 } from 'lucide-react';

interface QRFormProps {
  banks: Bank[];
  loading: boolean;
  validationErrors: ValidationError[];
  onSubmit: (params: QRGenerationParams) => Promise<void>;
}

export default function QRForm({ banks, loading, validationErrors, onSubmit }: QRFormProps) {
  const [formData, setFormData] = useState<QRGenerationParams>({
    accountNo: '',
    accountName: '',
    acqId: '',
    amount: undefined,
    addInfo: '',
  });

  const [showBankDropdown, setShowBankDropdown] = useState(false);

  const selectedBank = banks.find(b => b.bin === formData.acqId);

  const getErrorMessage = (field: string): string | undefined => {
    return validationErrors.find(e => e.field === field)?.message;
  };

  const handleChange = (field: keyof QRGenerationParams, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleBankSelect = (bin: string) => {
    handleChange('acqId', bin);
    setShowBankDropdown(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Bank Selection */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Ngân hàng <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowBankDropdown(!showBankDropdown)}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg text-left flex items-center justify-between hover:border-primary transition-colors duration-200"
          >
            {selectedBank ? (
              <div className="flex items-center gap-3">
                <img
                  src={selectedBank.logo}
                  alt={selectedBank.name}
                  className="w-6 h-6 object-contain"
                />
                <span className="text-foreground">{selectedBank.shortName}</span>
              </div>
            ) : (
              <span className="text-muted-foreground">Chọn ngân hàng</span>
            )}
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                showBankDropdown ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {showBankDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {banks.map(bank => (
                <button
                  key={bank.bin}
                  type="button"
                  onClick={() => handleBankSelect(bank.bin)}
                  className="w-full px-4 py-3 hover:bg-secondary text-left flex items-center gap-3 transition-colors duration-150 border-b border-border last:border-b-0"
                >
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="w-6 h-6 object-contain"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{bank.shortName}</p>
                    <p className="text-xs text-muted-foreground">{bank.name}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        {getErrorMessage('acqId') && (
          <p className="text-xs text-destructive">{getErrorMessage('acqId')}</p>
        )}
      </div>

      {/* Account Number */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Số tài khoản <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          value={formData.accountNo}
          onChange={e => handleChange('accountNo', e.target.value)}
          placeholder="Nhập số tài khoản (6-19 ký tự)"
          className={`vietqr-input ${getErrorMessage('accountNo') ? 'border-b-destructive' : ''}`}
        />
        {getErrorMessage('accountNo') && (
          <p className="text-xs text-destructive">{getErrorMessage('accountNo')}</p>
        )}
      </div>

      {/* Account Name */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Tên tài khoản <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          value={formData.accountName}
          onChange={e => handleChange('accountName', e.target.value)}
          placeholder="Nhập tên tài khoản (không dấu, viết hoa)"
          className={`vietqr-input ${getErrorMessage('accountName') ? 'border-b-destructive' : ''}`}
        />
        {getErrorMessage('accountName') && (
          <p className="text-xs text-destructive">{getErrorMessage('accountName')}</p>
        )}
      </div>

      {/* Amount */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Số tiền (tùy chọn)
        </label>
        <input
          type="number"
          value={formData.amount || ''}
          onChange={e => handleChange('amount', e.target.value ? parseInt(e.target.value) : undefined)}
          placeholder="Nhập số tiền (VNĐ)"
          className={`vietqr-input ${getErrorMessage('amount') ? 'border-b-destructive' : ''}`}
        />
        {getErrorMessage('amount') && (
          <p className="text-xs text-destructive">{getErrorMessage('amount')}</p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Nội dung chuyển tiền (tùy chọn)
        </label>
        <input
          type="text"
          value={formData.addInfo}
          onChange={e => handleChange('addInfo', e.target.value)}
          placeholder="Nhập nội dung (tối đa 25 ký tự, không dấu)"
          maxLength={25}
          className={`vietqr-input ${getErrorMessage('addInfo') ? 'border-b-destructive' : ''}`}
        />
        <p className="text-xs text-muted-foreground">
          {(formData.addInfo || '').length}/25 ký tự
        </p>
        {getErrorMessage('addInfo') && (
          <p className="text-xs text-destructive">{getErrorMessage('addInfo')}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Đang tạo mã QR...</span>
          </>
        ) : (
          <span>Tạo mã QR</span>
        )}
      </button>
    </form>
  );
}
