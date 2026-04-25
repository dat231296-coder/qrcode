import { Copy, Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface QRPreviewProps {
  qrUrl: string | null;
  loading: boolean;
  onCopy: (url: string) => Promise<boolean>;
  onDownload: (url: string) => Promise<void>;
}

export default function QRPreview({ qrUrl, loading, onCopy, onDownload }: QRPreviewProps) {
  const [copying, setCopying] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = async () => {
    if (!qrUrl) return;
    setCopying(true);
    const success = await onCopy(qrUrl);
    setCopying(false);
    if (success) {
      toast.success('Đã sao chép link mã QR');
    } else {
      toast.error('Lỗi sao chép link');
    }
  };

  const handleDownload = async () => {
    if (!qrUrl) return;
    setDownloading(true);
    try {
      await onDownload(qrUrl);
      toast.success('Đã tải mã QR thành công');
    } catch (err) {
      toast.error('Lỗi tải mã QR');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-white rounded-lg border border-border shadow-sm">
      {/* QR Code Display */}
      <div className="w-full max-w-sm aspect-square flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-border overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Đang tạo mã QR...</p>
          </div>
        ) : qrUrl ? (
          <img
            src={qrUrl}
            alt="VietQR Code"
            className="w-full h-full object-cover animate-fade-in-scale"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m0 0h6m0-6v6m0 0v6m0-6h-6m0 0h-6"
                />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              Nhập thông tin và nhấn "Tạo mã QR"
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {qrUrl && (
        <div className="flex gap-3 w-full">
          <button
            onClick={handleCopy}
            disabled={copying}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-opacity-90 transition-all duration-200 active:scale-95 disabled:opacity-50"
          >
            {copying ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span className="font-medium">Sao chép Link</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-opacity-80 transition-all duration-200 active:scale-95 disabled:opacity-50"
          >
            {downloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span className="font-medium">Tải về</span>
          </button>
        </div>
      )}

      {/* QR Link Display */}
      {qrUrl && (
        <div className="w-full p-4 bg-gray-50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-2">Link mã QR:</p>
          <p className="text-xs text-foreground break-all font-mono bg-white p-2 rounded border border-border">
            {qrUrl}
          </p>
        </div>
      )}
    </div>
  );
}
