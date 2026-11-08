import { useEffect, useRef, useState } from 'react';

/**
 * Camera QR scanning using the browser's BarcodeDetector (Chrome, Edge and Android browsers).
 * Where it is missing, status becomes 'unsupported' and QRScanner falls back to typed and demo codes.
 * status: 'idle' | 'starting' | 'scanning' | 'denied' | 'unsupported'
 */
export function useQRScanner({ enabled, onScan }) {
  const videoRef = useRef(null);
  const onScanRef = useRef(onScan);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  useEffect(() => {
    if (!enabled) {
      setStatus('idle');
      return undefined;
    }
    if (!('BarcodeDetector' in window) || !navigator.mediaDevices?.getUserMedia) {
      setStatus('unsupported');
      return undefined;
    }

    let stream;
    let frame;
    let stopped = false;
    let lastValue = '';
    let lastAt = 0;
    const detector = new window.BarcodeDetector({ formats: ['qr_code'] });

    (async () => {
      try {
        setStatus('starting');
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (stopped) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        const video = videoRef.current;
        video.srcObject = stream;
        await video.play();
        setStatus('scanning');

        const tick = async () => {
          if (stopped) return;
          try {
            const [hit] = await detector.detect(video);
            const now = Date.now();
            // Ignore the same code for 2.5 s so one scan is one action
            if (hit && (hit.rawValue !== lastValue || now - lastAt > 2500)) {
              lastValue = hit.rawValue;
              lastAt = now;
              onScanRef.current?.(hit.rawValue);
            }
          } catch {
            /* a failed frame is not worth surfacing */
          }
          frame = requestAnimationFrame(tick);
        };
        tick();
      } catch (err) {
        setStatus(err?.name === 'NotAllowedError' ? 'denied' : 'unsupported');
      }
    })();

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [enabled]);

  return { videoRef, status };
}
