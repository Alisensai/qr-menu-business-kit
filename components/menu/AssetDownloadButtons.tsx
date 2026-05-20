"use client";

import { Download, FileImage } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useRef, useSyncExternalStore } from "react";

interface AssetDownloadButtonsProps {
  menuUrl: string;
  restaurantName: string;
  restaurantSlug: string;
  className?: string;
}

export function resolveMenuUrl(menuUrl: string) {
  if (typeof window === "undefined") {
    return menuUrl;
  }

  return menuUrl.startsWith("http") ? menuUrl : `${window.location.origin}${menuUrl}`;
}

function subscribeOrigin() {
  return () => undefined;
}

function getClientOrigin() {
  return window.location.origin;
}

function getServerOrigin() {
  return "";
}

export function useResolvedMenuUrl(menuUrl: string) {
  const origin = useSyncExternalStore(subscribeOrigin, getClientOrigin, getServerOrigin);
  return menuUrl.startsWith("http") || !origin ? menuUrl : `${origin}${menuUrl}`;
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

export function AssetDownloadButtons({
  menuUrl,
  restaurantName,
  restaurantSlug,
  className = ""
}: AssetDownloadButtonsProps) {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const resolvedMenuUrl = useResolvedMenuUrl(menuUrl);

  function handleQrDownload() {
    const sourceCanvas = qrCanvasRef.current;
    if (!sourceCanvas) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sourceCanvas, 120, 120, 960, 960);
    downloadCanvas(canvas, `${restaurantSlug}-qr.png`);
  }

  function handleTableCardDownload() {
    const sourceCanvas = qrCanvasRef.current;
    if (!sourceCanvas) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1700;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.fillStyle = "#1c2430";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, 1200, 1700);
    gradient.addColorStop(0, "#f7f4ee");
    gradient.addColorStop(0.58, "#ffffff");
    gradient.addColorStop(1, "#e8dac7");
    ctx.fillStyle = gradient;
    roundedRect(ctx, 80, 80, 1040, 1540, 52);
    ctx.fill();

    ctx.strokeStyle = "#d99b2b";
    ctx.lineWidth = 10;
    roundedRect(ctx, 115, 115, 970, 1470, 38);
    ctx.stroke();

    ctx.fillStyle = "#1c2430";
    ctx.textAlign = "center";
    ctx.font = "700 60px Georgia, serif";
    ctx.fillText(restaurantName, 600, 260);

    ctx.fillStyle = "#b86b2b";
    ctx.font = "800 34px Arial, sans-serif";
    ctx.fillText("QR MENÜ", 600, 330);

    ctx.fillStyle = "#ffffff";
    roundedRect(ctx, 250, 410, 700, 700, 32);
    ctx.fill();
    ctx.drawImage(sourceCanvas, 310, 470, 580, 580);

    ctx.fillStyle = "#1c2430";
    ctx.font = "800 44px Arial, sans-serif";
    ctx.fillText("Menümüzü görmek için QR kodu okutun", 600, 1225);

    ctx.fillStyle = "#b86b2b";
    ctx.font = "800 40px Arial, sans-serif";
    ctx.fillText("Scan for menu", 600, 1300);

    ctx.fillStyle = "#2e3338";
    ctx.font = "700 34px Arial, sans-serif";
    ctx.fillText("Türkçe / English / العربية / Русский", 600, 1390);

    ctx.fillStyle = "#4d7c59";
    ctx.font = "700 24px Arial, sans-serif";
    ctx.fillText(resolvedMenuUrl, 600, 1485);

    downloadCanvas(canvas, `${restaurantSlug}-masa-karti.png`);
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <div className="pointer-events-none fixed -left-[9999px] top-0 opacity-0" aria-hidden="true">
        <QRCodeCanvas value={resolvedMenuUrl} size={900} marginSize={4} ref={qrCanvasRef} />
      </div>
      <button
        type="button"
        onClick={handleQrDownload}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-saffron hover:text-ember"
      >
        <Download className="h-4 w-4" />
        QR indir
      </button>
      <button
        type="button"
        onClick={handleTableCardDownload}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-saffron hover:text-ember"
      >
        <FileImage className="h-4 w-4" />
        Masa kartı indir
      </button>
    </div>
  );
}
