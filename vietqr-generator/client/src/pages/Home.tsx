import { useVietQR } from '@/hooks/useVietQR';
import QRForm from '@/components/QRForm';
import QRPreview from '@/components/QRPreview';
import { Loader2 } from 'lucide-react';

/**
 * VietQR Generator - Home Page
 * Design: Modern Fintech Minimalism
 * - Two-column layout (form on left, preview on right)
 * - Deep blue primary color (#0066CC) for trust
 * - Emerald green accent (#10B981) for success
 * - Clean, professional typography with Poppins for headers
 */
export default function Home() {
  const {
    banks,
    loading,
    error,
    qrCode,
    validationErrors,
    generateQR,
    copyQRLink,
    downloadQR,
    setError,
  } = useVietQR();

  const handleGenerateQR = async (params: any) => {
    const success = await generateQR(params);
    if (!success && !error) {
      setError('Không thể tạo mã QR. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-8 shadow-sm">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">VietQR Generator</h1>
            <p className="text-primary-foreground/90 text-lg">
              Tạo mã QR chuyển khoản ngân hàng trong vài giây
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Loading State */}
          {banks.length === 0 && !error ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-muted-foreground">Đang tải danh sách ngân hàng...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form */}
              <div className="flex flex-col gap-6">
                <div className="vietqr-card p-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">
                    Nhập thông tin tài khoản
                  </h2>

                  {error && (
                    <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  <QRForm
                    banks={banks}
                    loading={loading}
                    validationErrors={validationErrors}
                    onSubmit={handleGenerateQR}
                  />
                </div>

                {/* Info Box */}
                <div className="vietqr-card p-6 bg-blue-50 border-blue-200">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    💡 Hướng dẫn sử dụng
                  </h3>
                  <ul className="text-sm text-foreground/80 space-y-2">
                    <li>
                      • Chọn ngân hàng và nhập số tài khoản nhận tiền
                    </li>
                    <li>
                      • Tên tài khoản phải viết không dấu, chữ hoa
                    </li>
                    <li>
                      • Nhập số tiền (tùy chọn) để khách hàng quét QR sẽ thấy số tiền cần chuyển
                    </li>
                    <li>
                      • Sao chép link hoặc tải ảnh để chia sẻ cho khách hàng
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-6">
                    Xem trước mã QR
                  </h2>
                  <QRPreview
                    qrUrl={qrCode}
                    loading={loading}
                    onCopy={copyQRLink}
                    onDownload={downloadQR}
                  />
                </div>

                {/* Features Box */}
                <div className="vietqr-card p-6 bg-green-50 border-green-200">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    ✨ Tính năng
                  </h3>
                  <ul className="text-sm text-foreground/80 space-y-2">
                    <li>
                      • Hỗ trợ 55+ ngân hàng Việt Nam
                    </li>
                    <li>
                      • Tạo mã QR động với số tiền tùy chỉnh
                    </li>
                    <li>
                      • Sao chép link hoặc tải ảnh dễ dàng
                    </li>
                    <li>
                      • Không cần đăng ký, hoàn toàn miễn phí
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container py-8">
          <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
            <p>
              VietQR Generator - Công cụ tạo mã QR chuyển khoản miễn phí
            </p>
            <p className="mt-2 text-xs">
              Sử dụng VietQR API • Hỗ trợ NAPAS QR Standard
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
