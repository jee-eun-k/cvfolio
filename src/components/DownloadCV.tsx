import { Download } from 'lucide-react';

export default function DownloadCV() {
  const handleDownloadCV = () => {
    // Convert Google Drive view link to direct download link
    const fileId = '1hYYP5LWxBBnkL7rYP2PiWymSdU-RHe-U';
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'Jee-eun_Kang_CV.pdf'; // Optional: specify filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownloadCV}
      className="hidden md:block h-9 w-13 fixed z-50 top-0 mt-5 mr-27 right-0 p-2 rounded-full bg-muted-foreground/40 hover:bg-muted-foreground/60 text-headings transition-colors cursor-pointer"
      aria-label={`Download CV`}
      title={`Download CV`}
    >
      <div className="flex items-center">
        <span className="text-sm font-sm justify-center flex items-center">
          {'CV '}
        </span>
        <Download className="w-5 h-5" />
      </div>
    </button>
  );
}
