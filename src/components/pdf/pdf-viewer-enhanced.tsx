"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  FileText, 
  Calendar, 
  HardDrive,
  ExternalLink,
  Eye
} from "lucide-react";

interface PdfViewerEnhancedProps {
  fileUrl: string;
  title: string;
  fileSize?: string;
  pageCount?: string | number;
  uploadDate?: string;
  category?: string;
}

export function PdfViewerEnhanced({ 
  fileUrl, 
  title, 
  fileSize = "Unknown", 
  pageCount = "Unknown", 
  uploadDate = "Unknown",
  category = "General"
}: PdfViewerEnhancedProps) {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const viewerUrl = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
  const embedUrl = `${fileUrl}#toolbar=1&navpanes=1&scrollbar=1`;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const handleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="space-y-4">
      {/* PDF Metadata */}
      <div className="rounded-2xl border border-border/60 bg-white/90 p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <Badge variant="secondary" className="text-xs">
            <FileText className="w-3 h-3 mr-1" />
            PDF Document
          </Badge>
          {category && category !== "General" && (
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {fileSize && fileSize !== "Unknown" && (
              <span className="flex items-center gap-1">
                <HardDrive className="w-4 h-4" />
                {fileSize}
              </span>
            )}
            {pageCount && pageCount !== "Unknown" && (
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {pageCount} pages
              </span>
            )}
                      </div>
        </div>
      </div>

      {/* PDF Viewer Controls */}
      <div className="rounded-2xl border border-border/60 bg-white/90 p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[50px] text-center">{zoom}%</span>
            <Button size="sm" variant="outline" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleResetZoom}>
              Reset
            </Button>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Action Buttons */}
          <Button size="sm" variant="outline" onClick={handleFullscreen}>
            <Maximize2 className="w-4 h-4 mr-1" />
            Fullscreen
          </Button>
          <Button size="sm" asChild>
            <a href={fileUrl} target="_blank" rel="noreferrer">
              <Download className="w-4 h-4 mr-1" />
              Download
            </a>
          </Button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl border border-border/60 bg-white/90 shadow-sm"
        style={{ height: isFullscreen ? '100vh' : '85vh' }}
      >
        <iframe
          ref={iframeRef}
          src={viewerUrl}
          title={title}
          className="w-full h-full"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease'
          }}
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" size="sm" asChild>
          <a href={fileUrl} target="_blank" rel="noreferrer">
            <ExternalLink className="w-4 h-4 mr-1" />
            Open in New Tab
          </a>
        </Button>
      </div>
    </div>
  );
}
